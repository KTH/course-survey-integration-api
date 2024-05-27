import {
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { APICourseRound, APICourseRoundParams, TCourseModule, TCourseRoundEntity, TCourseRoundModuleEntity, TProgramRound, TProgramRoundEntity, TReportedResultEntity, TStudentParticipation, TStudentParticipationEntity } from "../interface";
import { Database } from "../db";
import { startTermFromArchivingCode } from "../ladok-events/utils";
import { CourseRequiredForProgram } from "ladok-integration";

export default async function handler<T extends APICourseRound>(
  request: HttpRequest,
  context: InvocationContext,
  db: Database,
): Promise<HttpResponseInit> {
  const { id } = request.params as APICourseRoundParams["path"];
  let outp: APICourseRound;
  
  try {
    const courseRound = await db.fetchById<TCourseRoundEntity>(id, "CourseRound");

    if (!courseRound) {
      return {
        status: 404,
        jsonBody: {
          error: "Not found",
          description: `CourseRound with id ${id} not found`,
        },
      };
    }

    const { ladokCourseId, ladokCourseRoundId } = courseRound;

    const [
      reportedResults,
      studentParticipations,
    ] = await Promise.all([
      db.queryByProperty<TReportedResultEntity>(
        "parentId",
        ladokCourseId,
        "ReportedResult",
      ),
      db.queryByProperty<TStudentParticipationEntity>(
        "ladokCourseRoundId",
        ladokCourseRoundId,
        "StudentParticipation",
      ),
    ]);

    const totalRegisteredStudents = studentParticipations?.length ?? 0;
    const totalReportedResults = reportedResults?.length ?? 0;

    const gradingDistribution = reportedResults.reduce(
      (acc: Record<string, number>, res: TReportedResultEntity) => {
        if (res.result === undefined) return acc;
        acc[res.result] = (acc[res.result] ?? 0) + 1;
        return acc;
      },
      Object.fromEntries(courseRound._gradingScheme.map((key: string) => [key, 0])),
    );

    const programs = studentParticipations.reduce(
      (acc: Record<string, TProgramRound>, res: TStudentParticipationEntity) => {
        if (res.program) {
          acc[res.program.code] ??= transformProgramRoundForApi(res.program, courseRound.language);
        }
        return acc;
      },
      {},
    );

    // Pick all public props except private
    const { _id, _gradingScheme, modules, ...props } = courseRound;

    const outpModules = await Promise.all(modules.map(async (module: TCourseRoundModuleEntity) => {
      const totalReportedResults = await db.countByPropertyQuery(
        "parentId",
        module.moduleRoundId,
        "ReportedResult",
      );

      const reportedResults = await db.queryByProperty<TReportedResultEntity>(
        "parentId",
        module.moduleRoundId,
        "ReportedResult",
      );

      const gradingDistribution = reportedResults.reduce((acc: Record<string, number>, res: any) => {
        acc[res.result] = (acc[res.result] ?? 0) + 1;
        return acc;
      }, Object.fromEntries(module.gradingScheme.map((key) => [key, 0])));

      const outp: TCourseModule = {
        ...module,
        totalReportedResults,
        gradingDistribution,
      }

      return outp;
    }));

    outp = {
      ...props,
      courseInstanceArchivingStartTerm: startTermFromArchivingCode(props.courseInstanceArchivingCode),
      modules: outpModules,
      totalRegisteredStudents,
      totalReportedResults,
      gradingDistribution,
      programs: Object.values(programs),
    };
  } finally {
    await db.close();
  }

  if (!outp) {
    return {
      status: 404,
      jsonBody: { error: "Not found" },
    };
  }

  return {
    status: 200,
    jsonBody: outp,
  };
}

const requiredStrings = {
  "sv": {
    ALL: "Alla", // Oklart vad detta betyder
    O: "Obligatorisk",
    VV: "Villkorligt valfri",
    R: "Rekommenderad",
    V: "Valfri",


  },
  "en": {
    ALL: "All", // Oklart vad detta betyder
    O: "Mandatory",
    VV: "Conditionally Elective",
    R: "Recommended",
    V: "Elective",
  }
}

function transformProgramRoundForApi(prog: TProgramRoundEntity, lang: "sv" | "en"): TProgramRound {
  const {
    code,
    startTerm,
    name,
    studyYear,
    specialization,
    required,
  } = prog;

  return {
    code,
    startTerm,
    name: name[lang],
    studyYear,
    specialization: specialization && {
        code: specialization.code,
        name: specialization.name?.[lang],
    },
    required: requiredStrings[lang][required],
  };
}
