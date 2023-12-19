import { InvocationContext } from "@azure/functions";
import { Db } from "mongodb";
import { TLadokEventContext } from "./types";

export type TResultatPaModulAttesteratEvent = {
  // TODO: Figure out what this event looks like!
  HandelseUID: string, // "6b79e669-9505-11ee-a0ce-a9a57d284dbd",
  EventContext: TLadokEventContext,
}

export async function handler(db: Db, message: TResultatPaModulAttesteratEvent, context: InvocationContext): Promise<void> {

}