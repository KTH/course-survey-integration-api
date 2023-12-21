import { InvocationContext, output } from "@azure/functions";
import { TLadokEventContext } from "./types";
import { ServiceBus, isValidEvent, writeToCosmos } from "../utils";
import { TStudent } from "../interface";

export type TRegistreringEvent = {
  Omfattningsvarde: string, // "10.0",
  Studieavgiftsbetalning: string, // "studiedeltagande.domain.studieavgiftsbetalningsvarde.ej_aktuell",
  StudieperiodSlut: string, // "2024-01-15",
  StudieperiodStart: string, // "2023-08-28",
  ArAnpassad: boolean, // false,
  HandelseUID: string, // "8fb63aea-950a-11ee-99ff-6b3efc3c4159",
  EventContext: TLadokEventContext,
  KursUID: string, // "e51b9586-9501-11ee-a0ce-a9a57d284dbd",
  KurstillfalleUID: string, // "3ea87094-9507-11ee-a0ce-a9a57d284dbd",
  Period: number, // 1,
  RegistreringUID: string, // "64a2a94f-9509-11ee-99ff-6b3efc3c4159",
  StudentUID: string, // "bbcce853-4df3-11e8-a562-6ec76bb54b9f",
  TillfallesantagningUID: string, // "64a2a94e-9509-11ee-99ff-6b3efc3c4159",
  UtbildningsinstansUID: string, // "e51b9585-9501-11ee-a0ce-a9a57d284dbd"
}

const cosmosOutput = output.cosmosDB({
  databaseName: 'CourseSurvey',
  collectionName: 'StudentParticipation',
  createIfNotExists: false,
  partitionKey: '{queueTrigger}',
  connectionStringSetting: 'MyAccount_COSMOSDB',
});

export async function handler(message: TRegistreringEvent, context: InvocationContext): Promise<void> {
  if (!isValidEvent("se.ladok.schemas.studiedeltagande.RegistreringEvent", context?.triggerMetadata?.userProperties)) return;
    
  const ladokCourseRoundId = message.KurstillfalleUID;
  const ladokCourseId = message.KursUID;
  const ladokStudentId = message.StudentUID;
  context.log(`RegistreringEvent: ${ladokCourseRoundId} ${ladokStudentId}`);
  // 1. Create a StudentParticipation object
  const doc: TStudent = {
    ladokStudentId,
    ladokCourseId,
    ladokCourseRoundId,
    /** @description We currently use kthUserId as canvasSisId */
    canvasSisId: "TBD",
    /** @description Full Name of user */
    name: "TBD",
    /** Format: email */
    email: "TBD",
    roles: ["TBD"],
    locations: ["TBD"],
    program: undefined
  }
  // 2. Get more student info from UG REST API
  // 3. Persist in DB
  writeToCosmos<TStudent>(doc, context, cosmosOutput);
}

export default {
  handler: ServiceBus<TRegistreringEvent>(handler),
  extraInputs: undefined,
  extraOutputs: [cosmosOutput],
}