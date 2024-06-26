import {
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import {
  APICourseRoundList,
  TCourseRoundEntity,
  TProgramRound,
  TProgramRoundEntity,
} from "../interface";
import { Database } from "../db";
import { startTermFromArchivingCode } from "../ladok-events/utils";
import { transformProgramRoundForApi } from "./getCourseRound";

export default async function handler<T extends APICourseRoundList>(
  request: HttpRequest,
  context: InvocationContext,
  db: Database,
): Promise<HttpResponseInit> {
  // TODO: Fix proper query date selection
  const DAY = 1000 * 3600 * 24;
  const selectionStartDate = new Date(Date.now() - DAY * 270)
    .toISOString()
    .slice(0, 10);
  const selectionEndDate = new Date(Date.now() + 100 * DAY)
    .toISOString()
    .slice(0, 10);

  let offset = parseInt(request.query.get("offset") ?? "0");
  if (offset < 0) offset = 0;
  let limit = parseInt(request.query.get("limit") ?? "30");
  if (limit < 1) limit = 1;
  if (limit > 100) limit = 100;

  let outp: APICourseRoundList = [];
  let total;
  try {
    total = await db.countByPropertyQuery(
      "endDate",
      { $lt: selectionEndDate, $gt: selectionStartDate },
      "CourseRound",
    );

    // TODO: Make sure we have a stable sort order
    // NOTE: If you call on different dates you will get different results
    const courseRounds: TCourseRoundEntity[] = await db.queryByProperty(
      "endDate",
      { $lt: selectionEndDate, $gt: selectionStartDate },
      "CourseRound",
      // Paging requires stable sort order, otherwise we may
      // skip or duplicate items
      { offset, limit, sortBy: "_id", sortOrder: "asc"},
    );

    // Add programmes to list of course rounds
    const programAssociations: Record<string, TProgramRound[]> = {};
    for (const courseRound of courseRounds) {
      // TODO: I believe this is causing a massive amount of RU usage.
      // Consider removing program property from CourseRound listing
      const { ladokCourseRoundId } = courseRound;
      const studentParticipations = await db.queryByProperty(
        "ladokCourseRoundId",
        ladokCourseRoundId,
        "StudentParticipation",
      );

      const programs = studentParticipations.reduce(
        // The stored program objects have a full i18n name object because we might
        // not know what language the CourseRound is held in at time of storing
        // StudentParticipation object.
        (acc: Record<string, TProgramRound>, res: any) => {
          if (res.program) {
            acc[res.program.code] ??= transformProgramRoundForApi(res.program, courseRound, courseRound.language);
          }
          return acc;
        },
        {},
      );

      // Store list of program values so they can be added to list of course rounds
      programAssociations[ladokCourseRoundId] = Object.values(programs);
    }

    // TODO: Fix this
    outp = courseRounds.map(({
      id,
      ladokCourseId,
      ladokCourseRoundId,
      canvasSisId,
      name,
      courseCode,
      courseInstanceCode,
      courseInstanceArchivingCode,
      language,
      canceled,
      endDate,
      displayYear,
      organization,
      institution,
      courseGoal,
      periods,
      credits,
      courseExaminers,
      courseResponsible,
      courseTeachers,
    }) => { return {
      id,
      ladokCourseId,
      ladokCourseRoundId,
      canvasSisId,
      name,
      courseCode,
      courseInstanceCode,
      courseInstanceArchivingCode,
      courseInstanceArchivingStartTerm: startTermFromArchivingCode(courseInstanceArchivingCode),
      language,
      canceled,
      endDate,
      displayYear,
      organization,
      institution,
      courseGoal,
      periods,
      programs: programAssociations[ladokCourseRoundId],
      credits,
      courseExaminers,
      courseResponsible,
      courseTeachers,
    } });
  } finally {
    await db.close();
  }

  return {
    status: 200,
    jsonBody: outp,
    headers: {
      "Pagination-Total-Count": total.toString(),
      "Pagination-Offset": offset.toString(),
      "Pagination-Limit": limit.toString(),
    },
  };
}
