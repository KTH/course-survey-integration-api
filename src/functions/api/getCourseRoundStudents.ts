import {
  HttpRequest, HttpResponseInit, InvocationContext
} from "@azure/functions";
import {
  APICourseRoundStudentList
} from "../interface";
import { Database } from "../utils";

export default async function handler<T extends APICourseRoundStudentList>(request: HttpRequest, context: InvocationContext, db: Database): Promise<HttpResponseInit> {
  const { id } = request.params;
  const outp: APICourseRoundStudentList = await db.queryByProperty('ladokCourseRoundId', id, 'StudentParticipation');
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