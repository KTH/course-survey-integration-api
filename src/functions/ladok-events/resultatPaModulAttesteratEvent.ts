import { InvocationContext } from "@azure/functions";
import { TLadokEventContext } from "./types";
import { Database, ServiceBus, isValidEvent } from "../utils";

export type TResultatPaModulAttesteratEvent = {
  // TODO: Figure out what this event looks like!
  HandelseUID: string, // "6b79e669-9505-11ee-a0ce-a9a57d284dbd",
  EventContext: TLadokEventContext,
}

export async function handler(message: TResultatPaModulAttesteratEvent, context: InvocationContext, db: Database): Promise<void> {
  if (!isValidEvent("ResultatPaModulAttesteradEvent", context?.triggerMetadata?.userProperties)) return;

  context.log(`ResultatPaModulAttesteradEvent: `);
}

export default {
  handler: ServiceBus<TResultatPaModulAttesteratEvent>(handler),
  // input binding doesn't support cosmos document store yet
  // extraInputs: [cosmosInput],
  // extraOutputs: [cosmosOutput],
}
