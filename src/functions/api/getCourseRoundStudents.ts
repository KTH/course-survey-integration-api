import {
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { APICourseRoundStudentList, APICourseRoundStudentListParams, TCourseRoundEntity, TStudentParticipationEntity } from "../interface";
import { Database } from "../db";

export default async function handler<T extends APICourseRoundStudentList>(
  request: HttpRequest,
  context: InvocationContext,
  db: Database,
): Promise<HttpResponseInit> {
  let offset = parseInt(request.query.get("offset") ?? "0");
  if (offset < 0) offset = 0;
  let limit = parseInt(request.query.get("limit") ?? "30");
  if (limit > 100) limit = 100;

  const { id } = request.params as APICourseRoundStudentListParams["path"];

  const courseRound = await db.fetchById<TCourseRoundEntity>(id, "CourseRound");
  
  if (!courseRound) {
    return {
      status: 404,
      jsonBody: {
        error: "Not found",
        description: `CourseRound with id ${id} not found`,
      },
    };
  }

  const { ladokCourseRoundId } = courseRound;

  let outp: APICourseRoundStudentList = [];
  let total;
  try {
    total = await db.countByPropertyQuery(
      "ladokCourseRoundId",
      ladokCourseRoundId,
      "StudentParticipation",
    );
    // TODO: Add type TStudentParticiaionEntity
    const students = await db.queryByProperty<TStudentParticipationEntity>(
      "ladokCourseRoundId",
      ladokCourseRoundId,
      "StudentParticipation",
      // Paging requires stable sort order, otherwise we may
      // skip or duplicate items
      { offset, limit, sortBy: "_id", sortOrder: "asc"},
    );

    outp = students.map(({
      id,
      ladokCourseRoundId,
      canvasSisId,
      name,
      email,
      roles,
      program,
    }) => {
      return {
        id,
        ladokCourseRoundId,
        canvasSisId,
        name,
        email,
        roles,
        program,
      }
    });
  } finally {
    await db.close();
  }

  return {
    status: 200,
    jsonBody: outp ?? [],
    headers: {
      "Pagination-Total-Count": total.toString(),
      "Pagination-Offset": offset.toString(),
      "Pagination-Limit": limit.toString(),
    },
  };
}
