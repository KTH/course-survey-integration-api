import { InvocationContext } from "@azure/functions";
import { TLadokEventContext } from "./types";
import { ServiceBus, isValidEvent } from "../utils";

export type TPaborjadUtbildningEvent = {
  StudentUID: string, // "bbcce853-4df3-11e8-a562-6ec76bb54b9f",
  UtbildningUID: string, // "e51b9586-9501-11ee-a0ce-a9a57d284dbd",
  UtbildningsinstansUID: string, // "e51b9585-9501-11ee-a0ce-a9a57d284dbd",
  UtbildningstillfalleUID: string, // "3ea87094-9507-11ee-a0ce-a9a57d284dbd",
  UtbildningstypID: number, // 22,
  HandelseUID: string, // "8fb6fe3c-950a-11ee-99ff-6b3efc3c4159",
  EventContext: TLadokEventContext
}

export async function handler(message: TPaborjadUtbildningEvent, context: InvocationContext): Promise<void> {
  if (!isValidEvent("se.ladok.schemas.studiedeltagande.PaborjadUtbildningEvent", context?.triggerMetadata?.userProperties)) return;

  const utbildningstillfalleUid = message.UtbildningstillfalleUID;
  const studentUid = message.StudentUID;
  context.log(`PaborjadUtbildningEvent: ${utbildningstillfalleUid} ${studentUid}`);
  // 1. Create a CourseRound object
  // 2. Get more course info from KOPPS API
  // 3. Get more course info from LADOK API
  // 4. Get more course info from UG REST API
  // 5. Persist in DB

}

export default {
  handler: ServiceBus<TPaborjadUtbildningEvent>(handler),
  extraInputs: undefined,
  extraOutputs: undefined,
}