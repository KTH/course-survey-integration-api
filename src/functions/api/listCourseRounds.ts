import {
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import {
  APICourseRoundList,
  TCourseRound,
  TCourseRoundEntity,
} from "../interface";
import { Database } from "../utils";

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
  if (limit > 30) limit = 30;

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
      { offset, limit },
    );

    // TODO: Fix this
    outp = courseRounds;
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
