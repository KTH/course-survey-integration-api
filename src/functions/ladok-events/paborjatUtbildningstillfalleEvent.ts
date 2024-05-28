import { InvocationContext } from "@azure/functions";
import { TLadokEventContext } from "./types";
import {
  getUgCourseTeachers,
  getUgCourseResponsible,
  getUgCourseExaminers,
  getUgSchool,
  getUgUser,
} from "ug-integration";
import { isValidEvent } from "../utils";
import { Database } from "../db";
import { TCourseRound, TCourseRoundEntity } from "../interface";
import { getCourseInformation } from "kopps-integration";
import { getCourseRoundInformation } from "ladok-integration";
import {
  convertLadokModuleToCourseModule,
  convertToCourseInstanceArchivingCode,
  convertUgSchoolToOrgEntity,
  convertUgUsersToCourseUsers,
} from "./utils";

export type TPaborjatUtbildningstillfalleEvent = {
  PaborjandeDatum: string; // "2021-01-01",
  StudentUID: string; // "bbcce853-4df3-11e8-a562-6ec76bb54b9f",
  TillfallesantagningUID: string; // "64a2a94e-9509-11ee-99ff-6b3efc3c4159",
  UtbildningUID: string; // "e51b9586-9501-11ee-a0ce-a9a57d284dbd",
  UtbildningsinstansUID: string; // "e51b9585-9501-11ee-a0ce-a9a57d284dbd",
  UtbildningstillfalleUID: string; // "41717c91-4028-11ee-bf53-2115569549a8",
  UtbildningstillfallestypID: number; // 22,
  HandelseUID: string; // "8fb6fe3c-950a-11ee-99ff-6b3efc3c4159",
  EventContext: TLadokEventContext;
};

export default async function handler(
  message: TPaborjatUtbildningstillfalleEvent,
  context: InvocationContext,
  db: Database,
): Promise<void> {
  if (
    !isValidEvent(
      "se.ladok.schemas.studiedeltagande.PaborjatUtbildningstillfalleEvent",
      context?.triggerMetadata?.userProperties,
    )
  )
    return;

  // TODO: Consider using zod to validate the message
  const msgUtbildningstillfalleUid = message.UtbildningstillfalleUID;

  // If we have applied message out of order, we might have a course round in the db
  const existingCourseRound = await db.fetchById<TCourseRoundEntity>(msgUtbildningstillfalleUid, "CourseRound");

  // More common is that we have already processed a registration for this course
  // Since this message handler is the only one adding ladokCourseId to the object
  // we use that to determine if the course round exists.
  if (existingCourseRound?.ladokCourseId) {
    // Already added so skip all expensive lookups and return early
    return;
  }

  const msgUtbildningsUid = message.UtbildningUID;
  context.log(
    `PaborjatUtbildningstillfalleEvent: ${msgUtbildningstillfalleUid}`,
  );
  try {
    const dummyLanguage = "sv"; // TODO: Fix me!!! Should use default language for course
    const koppsInfo = await getCourseInformation(msgUtbildningstillfalleUid);
    const ladokCourseRoundInfo = await getCourseRoundInformation(
      msgUtbildningstillfalleUid,
    );

    const ladokCourseCode = ladokCourseRoundInfo.courseCode;
    const roundTerm = koppsInfo.round.startTerm;
    const ladokCourseYear = ladokCourseRoundInfo.startDate.slice(0, 4);

    // Note: this uses the "old" round code format
    const roundCode = koppsInfo.round.code;
    const electiveConditionsForPrograms = koppsInfo.electiveConditions;

    // TODO: Should we cache these values? For how long?
    // TODO: Use live data but during development we can use hardcoded values
    const courseResponsibleIds = await getUgCourseResponsible(
      ladokCourseCode,
      roundTerm,
      roundCode,
    );
    const teachersIds = await getUgCourseTeachers(
      ladokCourseCode,
      roundTerm,
      roundCode,
    );

    const examinersIds = await getUgCourseExaminers(ladokCourseCode);

    // TODO: Should we cache these values? For how long?
    const courseResponsible = convertUgUsersToCourseUsers(
      await Promise.all(courseResponsibleIds.map(getUgUser)),
    );

    const teachers = convertUgUsersToCourseUsers(
      await Promise.all(teachersIds.map(getUgUser)),
    );

    const examiners = convertUgUsersToCourseUsers(
      await Promise.all(examinersIds.map(getUgUser)),
    );

    const ladokSchoolCode = ladokCourseRoundInfo.organisation.code;
    const ladokInsitutionCode = ladokCourseRoundInfo.organisationUnit.code;
    const tmpUgSchool = await getUgSchool(ladokSchoolCode);
    const tmpUgInstitution = await getUgSchool(ladokInsitutionCode);

    const ladokGradingDistribution =
      ladokCourseRoundInfo.gradingScheme?.grades?.reduce(
        (val: any, curr: any) => {
          return {
            ...val,
            [curr.code]: -1,
          };
        },
        {},
      );

    // Merge existing modules found in db with new modules from message
    // retaining only canceled property from existing modules
    // We do this in case a KurstillfalleTillStatusEvent has been processed
    // before this event.
    let mergedModules = ladokCourseRoundInfo?.modules?.map((m) =>
      convertLadokModuleToCourseModule(m, dummyLanguage),
    );
    mergedModules = mergedModules.map(module => {
      const m = existingCourseRound?.modules.find(m => m.code === module.code);
      return m ? { ...module, canceled: m.canceled } : module;
    });

    // TODO: Create entity types that are synced with the API response types
    const doc: TCourseRoundEntity = {
      // Required for DB-layer to work
      id: msgUtbildningstillfalleUid,

      // Dummy data:
      language: dummyLanguage,
      canceled: existingCourseRound?.canceled ?? false,

      // N
      periods: [
        {
          period: koppsInfo.round.periods[0],
          credits: `${ladokCourseRoundInfo?.credits} hp`,
        },
      ],

      // Source event message:
      ladokCourseId: msgUtbildningsUid,
      ladokCourseRoundId: msgUtbildningstillfalleUid,
      canvasSisId: msgUtbildningstillfalleUid, // I deduced this by looking at the Event Relationship diagram, not yet verified in Canvas

      // Source KOPPS API:
      name: koppsInfo?.course.name[dummyLanguage],
      courseGoal: koppsInfo?.syllabus.goals,

      // Source UG:
      organization: convertUgSchoolToOrgEntity(
        tmpUgSchool,
        ladokSchoolCode,
        dummyLanguage,
      ),

      institution: convertUgSchoolToOrgEntity(
        tmpUgInstitution,
        ladokInsitutionCode,
        dummyLanguage,
      ),
      courseResponsible: courseResponsible,
      courseExaminers: examiners,
      courseTeachers: teachers,

      // Source LADOK REST API:
      _gradingScheme: Object.keys(ladokGradingDistribution ?? {}),
      courseCode: ladokCourseRoundInfo?.courseCode,
      courseInstanceCode: ladokCourseRoundInfo?.courseInstanceCode,
      courseInstanceArchivingCode: convertToCourseInstanceArchivingCode(ladokCourseRoundInfo, koppsInfo),
      endDate: ladokCourseRoundInfo?.endDate,
      displayYear: ladokCourseYear,
      credits: `${ladokCourseRoundInfo?.credits} hp`,
      modules: mergedModules,
      electiveConditionsForPrograms,
    };
    await db.upsert<TCourseRoundEntity>(doc.id, doc, "CourseRound");
  } finally {
    await db.close();
  }
}
