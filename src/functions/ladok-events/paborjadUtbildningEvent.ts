import { InvocationContext, input, output } from "@azure/functions";
import { TLadokEventContext } from "./types";
import { ServiceBus, isValidEvent, writeToCosmos } from "../utils";
import { TCourseRound } from "../interface";

export type TPaborjadUtbildningEvent = {
  StudentUID: string, // "bbcce853-4df3-11e8-a562-6ec76bb54b9f",
  UtbildningUID: string, // "e51b9586-9501-11ee-a0ce-a9a57d284dbd",
  UtbildningsinstansUID: string, // "e51b9585-9501-11ee-a0ce-a9a57d284dbd",
  UtbildningstillfalleUID: string, // "3ea87094-9507-11ee-a0ce-a9a57d284dbd",
  UtbildningstypID: number, // 22,
  HandelseUID: string, // "8fb6fe3c-950a-11ee-99ff-6b3efc3c4159",
  EventContext: TLadokEventContext
}

const cosmosInput = input.cosmosDB({
  databaseName: 'CourseSurvey',
  collectionName: 'CourseRound',
  id: '{queueTrigger.UtbildningstillfalleUID}',
  partitionKey: '{queueTrigger}',
  connectionStringSetting: 'COSMOSDB_CONNECTION_STRING',
});

const cosmosOutput = output.cosmosDB({
  databaseName: 'CourseSurvey',
  collectionName: 'CourseRound',
  createIfNotExists: true,
  partitionKey: '{queueTrigger}',
  connectionStringSetting: 'COSMOSDB_CONNECTION_STRING',
});

export async function handler(message: TPaborjadUtbildningEvent, context: InvocationContext): Promise<void> {
  if (!isValidEvent("se.ladok.schemas.studiedeltagande.PaborjadUtbildningEvent", context?.triggerMetadata?.userProperties)) return;

  const utbildningstillfalleUid = message.UtbildningstillfalleUID;
  context.log(`PaborjadUtbildningEvent: ${utbildningstillfalleUid}`);
  // 1. Create a CourseRound object
  const doc = {
    id: utbildningstillfalleUid,
  }
  // 2. Get more course info from KOPPS API
  // 3. Get more course info from LADOK API
  // 4. Get more course info from UG REST API
  // 5. Persist in DB
  writeToCosmos<TCourseRound>(doc, context, cosmosOutput);
}

export default {
  handler: ServiceBus<TPaborjadUtbildningEvent>(handler),
  extraInputs: [cosmosInput],
  extraOutputs: [cosmosOutput],
}