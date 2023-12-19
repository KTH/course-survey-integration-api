import { InvocationContext } from "@azure/functions";
import { Db } from "mongodb";
import { TLadokEventContext } from "./types";

export type TPaborjadUtbildningEvent = {
  StudentUID: string, // "bbcce853-4df3-11e8-a562-6ec76bb54b9f",
  UtbildningUID: string, // "e51b9586-9501-11ee-a0ce-a9a57d284dbd",
  UtbildningsinstansUID: string, // "e51b9585-9501-11ee-a0ce-a9a57d284dbd",
  UtbildningstillfalleUID: string, // "3ea87094-9507-11ee-a0ce-a9a57d284dbd",
  UtbildningstypID: number, // 22,
  HandelseUID: string, // "8fb6fe3c-950a-11ee-99ff-6b3efc3c4159",
  EventContext: TLadokEventContext
}

export async function handler(db: Db, message: TPaborjadUtbildningEvent, context: InvocationContext): Promise<void> {

}