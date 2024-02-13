import { HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { APICourseRound } from "../interface";
import { Database } from "../utils";

export default async function handler<T extends APICourseRound>(request: HttpRequest, context: InvocationContext, db: Database): Promise<HttpResponseInit> {
  const { id } = request.params;
  let outp: APICourseRound;
  try {
    const courseRound = await db.fetchById(id, 'CourseRound');

    const [
      nrofRegisteredStudents,
      nrofReportedResults,
      reportedResults,
      studentParticipations,
    ] = await Promise.all([
      db.countByPropertyQuery("courseRoundId", courseRound.id, "StudentParticipation"),
      db.countByPropertyQuery("courseRoundId", courseRound.id, "ReportedResult"),
      db.queryByProperty("courseRoundId", courseRound.id, "ReportedResult"),
      db.queryByProperty("courseRoundId", courseRound.id, "StudentParticipation"),
    ]);

    const gradingDistribution = reportedResults.reduce((acc: Record<string, number>, res: any) => {
      acc[res.result] = (acc[res.result] ?? 0) + 1;
      return acc;
    }, {});

    const programs = studentParticipations.reduce((acc: Record<string, number>, res: any) => {
      acc[res.program.code] ??= res.program;
      return acc;
    }, {});

    outp = {
      ...courseRound,
      nrofRegisteredStudents,
      nrofReportedResults,
      gradingDistribution,
      programs,
    }
  } finally {
    await db.close();
  }

  if (!outp) {
    return {
      status: 404,
      body: JSON.stringify({ error: 'Not found' })
    }
  }

  return {
    status: 200,
    body: JSON.stringify(outp)
  }
};