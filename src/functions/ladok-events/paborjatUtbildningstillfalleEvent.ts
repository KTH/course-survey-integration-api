import { InvocationContext } from "@azure/functions";
import { TLadokEventContext } from "./types";
import { getUgCourseResponsibleAndTeachers, getUgSchool, getUgUser } from "ug-integration";
import { ServiceBus, isValidEvent, Database } from "../utils";
import { TCourseRound, TCourseUser, TOrgEntity } from "../interface";
import { getCourseInformation } from "kopps-integration";
import { getCourseRoundInformation } from "ladok-integration";
import { convertLadokModuleToCourseModule, convertUgSchoolToOrgEntity, convertUgToCourseUser, convertUgToCourseUserArr } from "./utils";

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
  context.log(`PaborjatUtbildningstillfalleEvent: ${utbildningstillfalleUid}`);
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
  const courseYear = ladokCourseRoundInfo.startDate.slice(0, 4);
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

  const schoolCode = ladokCourseRoundInfo.organisation.code;
  const tmpUgSchool = await getUgSchool(schoolCode);

  const courseResponsible = convertUgToCourseUser(tmpUgCourseResponsible);
  const courseTeachers = convertUgToCourseUserArr(tmpUgCourseTeachers);
  const organization = convertUgSchoolToOrgEntity(tmpUgSchool, schoolCode, language);
  const modules = ladokCourseRoundInfo?.modules?.map((m) => convertLadokModuleToCourseModule(m, language));

  const gradingDistribution = ladokCourseRoundInfo.gradingScheme?.grades?.reduce((val: any, curr: any) => {
    return {
      ...val,
      [curr.code]: -1,
    };
  }, {});

  const doc: Omit<TCourseRound, 'nrofRegisteredStudents' | 'nrofReportedResults'> = {
    _gradingScheme: Object.keys(gradingDistribution ?? {}),
    id: utbildningstillfalleUid,
    ladokCourseId: utbildningsUid,
    ladokCourseRoundId: utbildningstillfalleUid,
    canvasSisId: utbildningstillfalleUid, // I deduced this by looking at the Event Relationship diagram, not yet verified in Canvas
    name: koppsInfo?.course.name[language],
    courseCode: ladokCourseRoundInfo?.courseCode,
    language,
    canceled: false, // TODO: Make sure we set this properly
    endDate: ladokCourseRoundInfo?.endDate,
    displayYear: courseYear,
    organization,
    institution: {} as TOrgEntity,
    courseGoal: koppsInfo?.syllabus.goals,
    period: 'P1', // TODO: Where does this come from?
    credits: ladokCourseRoundInfo?.credits.toString(),
    courseExaminor: {} as TCourseUser, // TODO: Get this from Ladok (I believe)
    courseResponsible, // From UG
    courseTeachers, // From UG
    // nrofRegisteredStudents: -1, // TODO: Convert to calculated field, get from TStudentParticipation
    // nrofReportedResults: -1, // TODO: Convert to calculated field, get from TReportedResult
    gradingDistribution, // TODO: Convert to calculated field
    programs: [],
    modules,
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