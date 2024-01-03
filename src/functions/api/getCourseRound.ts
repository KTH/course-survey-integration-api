import { HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { APICourseRound } from "../interface";
import { Database } from "../utils";

export default async function handler<T extends APICourseRound>(request: HttpRequest, context: InvocationContext, db: Database): Promise<HttpResponseInit> {
  const { id } = request.params;
  const outp: APICourseRound = await db.fetchById(id, 'CourseRound');
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