import {
  HttpRequest, HttpResponseInit, InvocationContext
} from "@azure/functions";
import {
  APICourseRoundList
} from "../interface";
import { Database } from "../utils";

export default async function handler<T extends APICourseRoundList>(request: HttpRequest, context: InvocationContext, db: Database): Promise<HttpResponseInit> {
  // TODO: Fix proper query date selection
  const DAY = 1000 * 3600 * 24;
  const selectionStartDate = new Date(Date.now() - DAY).toISOString().slice(0,10);
  const selectionEndDate = new Date(Date.now() + 100 * DAY).toISOString().slice(0,10);
  const outp: APICourseRoundList = await db.queryByProperty('endDate', { $lt: selectionEndDate, $gt: selectionStartDate},'CourseRound');
  await db.close();

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