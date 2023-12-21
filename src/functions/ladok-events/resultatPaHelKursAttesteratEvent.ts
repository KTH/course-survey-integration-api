import { InvocationContext } from "@azure/functions";
import { TLadokEventContext } from "./types";
import { ServiceBus, isValidEvent } from "../utils";

export type TResultatPaHelKursAttesteratEvent = {
  // TODO: Figure out what this event looks like!
  HandelseUID: string, // "6b79e669-9505-11ee-a0ce-a9a57d284dbd",
  EventContext: TLadokEventContext,
}

export async function handler(message: TResultatPaHelKursAttesteratEvent, context: InvocationContext): Promise<void> {
  if (!isValidEvent("ResultatPaHelKursAttesteradEvent", context?.triggerMetadata?.userProperties)) return;

  context.log(`ResultatPaHelKursAttesteradEvent: `);
}

export default {
  handler: ServiceBus<TResultatPaHelKursAttesteratEvent>(handler),
  extraInputs: undefined,
  extraOutputs: undefined,
}
