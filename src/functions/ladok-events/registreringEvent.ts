import { InvocationContext } from "@azure/functions";
import { Db } from "mongodb";
import { TLadokEventContext } from "./types";

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

export async function handler(db: Db, message: TRegistreringEvent, context: InvocationContext): Promise<void> {
  const kurstillfalleUid = message.KurstillfalleUID;
  const studentUid = message.StudentUID;
  context.log(`RegistreringEvent: ${kurstillfalleUid} ${studentUid}`);
  // 1. Create a StudentParticipation object
  // 2. Get more student info from UG REST API
  // 3. Persist in DB
}