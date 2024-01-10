import { InvocationContext } from "@azure/functions";
import { TLadokEventContext } from "./types";
import { ServiceBus, isValidEvent, Database } from "../utils";
import { TCourseRound, TCourseUser, TOrgEntity } from "../interface";
import { getCourseInformation } from "kopps-integration";

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
  
  // TODO: Consider using zod to validate the message

  const utbildningstillfalleUid = message.UtbildningstillfalleUID;
  const utbildningsUid = message.UtbildningUID;
  context.log(`PaborjadUtbildningEvent: ${utbildningstillfalleUid}`);
  // 1. Create a CourseRound object
  const courseRound: TCourseRound = await db.fetchById(utbildningstillfalleUid, "CourseRound");

  if (courseRound) {
    // Course round exists
    let { id, ladokCourseRoundId } = courseRound;
    // TODO: Update OpenAPI spec marking required fields so we don't need this check
    if (ladokCourseRoundId) {
      const nrofRegisteredStudents = db.countByPropertyQuery("ladokCourseRoundId", ladokCourseRoundId, "StudentParticipation");
      await db.update(id!, { nrofRegisteredStudents }, "CourseRound");
    }
    await db.close();
    return;
  }

  const language = "sv";
  const koppsInfo = await getCourseInformation(utbildningstillfalleUid);

  const doc: TCourseRound = {
    id: utbildningstillfalleUid,
    ladokCourseId: utbildningsUid,
    ladokCourseRoundId: utbildningstillfalleUid,
    canvasSisId: 'TBD',
    name: koppsInfo?.course.name['sv'],
    courseCode: 'TBD',
    language: language,
    canceled: false,
    endDate: 'TBD',
    displayYear: 'TBD',
    organization: {} as TOrgEntity,
    institution: {} as TOrgEntity,
    courseGoal: koppsInfo?.syllabus.goals,
    period: 'P1',
    credits: 'TBD',
    courseExaminor: {} as TCourseUser,
    courseResponsible: {} as TCourseUser,
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