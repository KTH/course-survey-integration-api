import {
  HttpRequest, HttpResponseInit, InvocationContext
} from "@azure/functions";
import {
  APICourseRoundStudentList
} from "../interface";
import { Database } from "../utils";

export default async function handler<T extends APICourseRoundStudentList>(request: HttpRequest, context: InvocationContext, db: Database): Promise<HttpResponseInit> {
  let offset = parseInt(request.query.get("offset") ?? "0");
  if (offset < 0) offset = 0;
  let limit = parseInt(request.query.get("limit") ?? "30");
  if (limit > 30) limit = 30;
  
  const { id } = request.params;

  let outp: APICourseRoundStudentList = [];
  let total;
  try {
    total = await db.countByPropertyQuery('ladokCourseRoundId', id, 'StudentParticipation');
    // TODO: Add type TStudentParticiaionEntity
    outp = await db.queryByProperty('ladokCourseRoundId', id, 'StudentParticipation', { offset, limit });
  } finally {
    await db.close();
  }

  if (!outp) {
    return {
      status: 404,
      jsonBody: { error: 'Not found' }
    }
  }
  
  return {
    status: 200,
    jsonBody: outp,
    headers: {
      "Pagination-Total-Count": total.toString(),
      "Pagination-Page-Offset": offset.toString(),
      "Pagination-Page-Limit": limit.toString()
    }
  }
};