import {
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { APICourseRound, APICourseRoundParams, TCourseModule, TCourseRoundModuleEntity, TProgramRound, TReportedResultEntity } from "../interface";
import { Database } from "../utils";

export default async function handler<T extends APICourseRound>(
  request: HttpRequest,
  context: InvocationContext,
  db: Database,
): Promise<HttpResponseInit> {
  const { id } = request.params as APICourseRoundParams["path"];
  let outp: APICourseRound;
  
  try {
    const courseRound = await db.fetchById(id, "CourseRound");

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
      db.queryByProperty(
        "parentId",
        ladokCourseId,
        "ReportedResult",
      ),
      db.queryByProperty(
        "ladokCourseRoundId",
        ladokCourseRoundId,
        "StudentParticipation",
      ),
    ]);

    const totalRegisteredStudents = studentParticipations?.length ?? 0;
    const totalReportedResults = reportedResults?.length ?? 0;

    const gradingDistribution = reportedResults.reduce(
      (acc: Record<string, number>, res: any) => {
        acc[res.result] = (acc[res.result] ?? 0) + 1;
        return acc;
      },
      Object.fromEntries(courseRound._gradingScheme.map((key: string) => [key, 0])),
    );

    const programs = studentParticipations.reduce(
      (acc: Record<string, TProgramRound>, res: any) => {
        acc[res.program.code] ??= res.program;
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
      modules: outpModules,
      totalRegisteredStudents,
      totalReportedResults,
      gradingDistribution,
      programs,
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
