import {
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { APICourseRound } from "../interface";
import { Database } from "../utils";

export default async function handler<T extends APICourseRound>(
  request: HttpRequest,
  context: InvocationContext,
  db: Database,
): Promise<HttpResponseInit> {
  const { id } = request.params;
  let outp: APICourseRound;
  try {
    const courseRound = await db.fetchById(id, "CourseRound");
    const { ladokCourseRoundId } = courseRound;

    const [
      nrofRegisteredStudents,
      nrofReportedResults,
      reportedResults,
      studentParticipations,
    ] = await Promise.all([
      db.countByPropertyQuery(
        "ladokCourseRoundId",
        ladokCourseRoundId,
        "StudentParticipation",
      ),
      db.countByPropertyQuery(
        "ladokCourseRoundId",
        ladokCourseRoundId,
        "ReportedResult",
      ),
      db.queryByProperty(
        "ladokCourseRoundId",
        ladokCourseRoundId,
        "ReportedResult",
      ),
      db.queryByProperty(
        "ladokCourseRoundId",
        ladokCourseRoundId,
        "StudentParticipation",
      ),
    ]);

    const gradingDistribution = reportedResults.reduce(
      (acc: Record<string, number>, res: any) => {
        acc[res.result] = (acc[res.result] ?? 0) + 1;
        return acc;
      },
      {},
    );

    const programs = studentParticipations.reduce(
      (acc: Record<string, number>, res: any) => {
        acc[res.program.code] ??= res.program;
        return acc;
      },
      {},
    );

    // Pick all public props except private
    const { _id, _gradingScheme, ...props } = courseRound;

    outp = {
      ...props,
      nrofRegisteredStudents,
      nrofReportedResults,
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
