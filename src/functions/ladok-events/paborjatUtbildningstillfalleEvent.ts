import { InvocationContext } from "@azure/functions";
import { TLadokEventContext } from "./types";
import { getUgCourseResponsibleAndTeachers, getUgUser } from "ug-integration";
import { ServiceBus, isValidEvent, Database } from "../utils";
import { TCourseRound, TCourseUser, TOrgEntity } from "../interface";
import { getCourseInformation } from "kopps-integration";
import { getCourseRoundInformation } from "ladok-integration";
import { convertUgToCourseUser, convertUgToCourseUserArr } from "./utils";

export type TPaborjatUtbildningstillfalleEvent = {
  PaborjandeDatum: string, // "2021-01-01",
  StudentUID: string, // "bbcce853-4df3-11e8-a562-6ec76bb54b9f",
  TillfallesantagningUID: string, // "64a2a94e-9509-11ee-99ff-6b3efc3c4159",
  UtbildningUID: string, // "e51b9586-9501-11ee-a0ce-a9a57d284dbd",
  UtbildningsinstansUID: string, // "e51b9585-9501-11ee-a0ce-a9a57d284dbd",
  UtbildningstillfalleUID: string, // "41717c91-4028-11ee-bf53-2115569549a8",
  UtbildningstillfallestypID: number, // 22,
  HandelseUID: string, // "8fb6fe3c-950a-11ee-99ff-6b3efc3c4159",
  EventContext: TLadokEventContext
}

export async function handler(message: TPaborjatUtbildningstillfalleEvent, context: InvocationContext, db: Database): Promise<void> {
  if (!isValidEvent("se.ladok.schemas.studiedeltagande.PaborjatUtbildningstillfalleEvent", context?.triggerMetadata?.userProperties)) return;

  // TODO: Consider using zod to validate the message

  const utbildningstillfalleUid = message.UtbildningstillfalleUID;
  const utbildningsUid = message.UtbildningUID;
  context.log(`PaborjadUtbildningEvent: ${utbildningstillfalleUid}`);
  // 1. Create a CourseRound object
  const courseRound: TCourseRound = await db.fetchById(utbildningstillfalleUid, "CourseRound");

  // If course round already exists we don't need to do anything
  // QUESTION: What if they change teachers during term?
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
  const ladokCourseRoundInfo = await getCourseRoundInformation(utbildningstillfalleUid);

  const courseCode = ladokCourseRoundInfo.courseCode;
  const courseYear = message.PaborjandeDatum.slice(0, 4); // Get the year from the date
  const courseRoundCode = koppsInfo?.round?.periods?.[0]; // TODO: We should use new period code (nnnnn)

  // TODO: Should we cache these values? For how long?
  // TODO: Use live data but during development we can use hardcoded values
  const [courseResonsibleKthId, courseTeachersKthIds = []] =
    await getUgCourseResponsibleAndTeachers("SF1625" || courseCode, "2022" || courseYear, "2" || courseRoundCode);

  // TODO: Should we cache these values? For how long?
  const tmpUgCourseResponsible = await getUgUser(courseResonsibleKthId);
  const tmpUgCourseTeachers = await Promise.all(
    courseTeachersKthIds?.map(async (kthId: string) => await getUgUser(kthId))
  );

  const courseResponsible = convertUgToCourseUser(tmpUgCourseResponsible);
  const courseTeachers = convertUgToCourseUserArr(tmpUgCourseTeachers);
  
  const doc: TCourseRound = {
    id: utbildningstillfalleUid,
    ladokCourseId: utbildningsUid,
    ladokCourseRoundId: utbildningstillfalleUid,
    canvasSisId: 'TBD',
    name: koppsInfo?.course.name[language],
    courseCode: ladokCourseRoundInfo?.courseCode,
    language: language,
    canceled: false,
    endDate: 'TBD',
    displayYear: 'TBD',
    organization: {} as TOrgEntity,
    institution: {} as TOrgEntity,
    courseGoal: koppsInfo?.syllabus.goals,
    period: 'P1',
    credits: ladokCourseRoundInfo?.credits.toString(),
    courseExaminor: {} as TCourseUser,
    courseResponsible, // From UG
    courseTeachers, // From UG
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
  handler: ServiceBus<TPaborjatUtbildningstillfalleEvent>(handler),
  // input binding doesn't support cosmos document store yet
  // extraInputs: [cosmosInput],
  // extraOutputs: [cosmosOutput],
}