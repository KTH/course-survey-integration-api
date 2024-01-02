import { InvocationContext } from "@azure/functions";
import { TLadokEventContext } from "./types";
import { ServiceBus, isValidEvent, Database } from "../utils";
import { TCourseRound } from "../interface";
import { Context } from "vm";

export type TPaborjadUtbildningEvent = {
  StudentUID: string, // "bbcce853-4df3-11e8-a562-6ec76bb54b9f",
  UtbildningUID: string, // "e51b9586-9501-11ee-a0ce-a9a57d284dbd",
  UtbildningsinstansUID: string, // "e51b9585-9501-11ee-a0ce-a9a57d284dbd",
  UtbildningstillfalleUID: string, // "3ea87094-9507-11ee-a0ce-a9a57d284dbd",
  UtbildningstypID: number, // 22,
  HandelseUID: string, // "8fb6fe3c-950a-11ee-99ff-6b3efc3c4159",
  EventContext: TLadokEventContext
}

export async function handler(message: TPaborjadUtbildningEvent, context: InvocationContext, db: Database): Promise<void> {
  if (!isValidEvent("se.ladok.schemas.studiedeltagande.PaborjadUtbildningEvent", context?.triggerMetadata?.userProperties)) return;
  
  const utbildningstillfalleUid = message.UtbildningstillfalleUID;
  const utbildningsUid = message.UtbildningUID;
  context.log(`PaborjadUtbildningEvent: ${utbildningstillfalleUid}`);
  // 1. Create a CourseRound object
  const courseRound: TCourseRound = await db.read(utbildningstillfalleUid, "CourseRound");

  if (courseRound) {
    // Course round exists
    let { id, nrofRegisteredStudents } = courseRound;
    nrofRegisteredStudents++;
    await db.update(id!, { nrofRegisteredStudents }, "CourseRound");
    await db.close();
    return;
  }

  const doc: TCourseRound = {
    id: utbildningstillfalleUid,
    ladokCourseId: utbildningsUid,
    ladokCourseRoundId: utbildningstillfalleUid,
    canvasSisId: undefined,
    name: undefined,
    courseCode: undefined,
    language: undefined,
    canceled: false,
    endDate: undefined,
    displayYear: undefined,
    organization: undefined,
    institution: undefined,
    courseGoal: undefined,
    period: undefined,
    credits: undefined,
    courseExaminor: undefined,
    courseResponsible: undefined,
    courseTeachers: [],
    nrofRegisteredStudents: 1,
    nrofReportedResults: 0,
    gradingDistribution: {},
    programs: [],
    modules: [],
  }
  // 2. Get more course info from KOPPS API
  // 3. Get more course info from LADOK API
  // 4. Get more course info from UG REST API
  // 5. Persist in DB
  await db.insert(doc, "CourseRound");
  await db.close();
}

export default {
  handler: ServiceBus<TPaborjadUtbildningEvent>(handler),
  // input binding doesn't support cosmos document store yet
  // extraInputs: [cosmosInput],
  // extraOutputs: [cosmosOutput],
}