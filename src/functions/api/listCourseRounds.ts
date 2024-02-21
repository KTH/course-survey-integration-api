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
  const selectionStartDate = new Date(Date.now() - DAY)
    .toISOString()
    .slice(0, 10);
  const selectionEndDate = new Date(Date.now() + 100 * DAY)
    .toISOString()
    .slice(0, 10);

  let outp = [];
  try {
    const courseRounds: TCourseRoundEntity[] = await db.queryByProperty(
      "endDate",
      { $lt: selectionEndDate, $gt: selectionStartDate },
      "CourseRound",
    );

    outp = courseRounds;
  } finally {
    await db.close();
  }

  if (outp.length === 0) {
    return {
      status: 404,
      body: JSON.stringify({ error: "Not found" }),
    };
  }

  return {
    status: 200,
    body: JSON.stringify(outp),
  };
}
