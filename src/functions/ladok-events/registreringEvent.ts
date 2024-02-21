import { InvocationContext } from "@azure/functions";
import { TLadokEventContext } from "./types";
import { ServiceBus, Database } from "../utils";
import { getUgUserByLadokId } from "ug-integration";
import { strict as assert } from "node:assert";

import {
  ProgramParticipation,
  getProgramParticipation,
} from "ladok-integration";

/** Information about student participation as stored in the Database */
export type DatabaseStudentParticipation = {
  id: string;
  ladokStudentId: string;
  ladokCourseId: string;
  ladokCourseRoundId: string;

  canvasSisId: string;
  name: string;
  email: string;
  roles: ["student"];
  locations: string[];
  programRound: ProgramParticipation;
};

export type TRegistreringEvent = {
  Omfattningsvarde: string; // "10.0",
  Studieavgiftsbetalning: string; // "studiedeltagande.domain.studieavgiftsbetalningsvarde.ej_aktuell",
  StudieperiodSlut: string; // "2024-01-15",
  StudieperiodStart: string; // "2023-08-28",
  ArAnpassad: boolean; // false,
  HandelseUID: string; // "8fb63aea-950a-11ee-99ff-6b3efc3c4159",
  EventContext: TLadokEventContext;
  KursUID: string; // "e51b9586-9501-11ee-a0ce-a9a57d284dbd",
  KurstillfalleUID: string; // "41717c91-4028-11ee-bf53-2115569549a8",
  Period: number; // 1,
  RegistreringUID: string; // "64a2a94f-9509-11ee-99ff-6b3efc3c4159",
  StudentUID: string; // "bbcce853-4df3-11e8-a562-6ec76bb54b9f",
  TillfallesantagningUID: string; // "64a2a94e-9509-11ee-99ff-6b3efc3c4159",
  UtbildningsinstansUID: string; // "e51b9585-9501-11ee-a0ce-a9a57d284dbd"
};

export async function handler(
  message: TRegistreringEvent,
  context: InvocationContext,
  db: Database,
): Promise<void> {
  // if (!isValidEvent("se.ladok.schemas.studiedeltagande.RegistreringEvent", context?.triggerMetadata?.userProperties)) return;

  // TODO: Consider using zod to validate the message

  const ladokCourseRoundId = message.KurstillfalleUID;
  const ladokCourseId = message.KursUID;
  const ladokStudentId = message.StudentUID;
  context.log(`RegistreringEvent: ${ladokCourseRoundId} ${ladokStudentId}`);

  const id = `${ladokStudentId}.${ladokCourseRoundId}`;
  const studentParticipation: DatabaseStudentParticipation = await db.fetchById(
    id,
    "StudentParticipation",
  );

  if (studentParticipation) {
    // StudentParticipation exists
    await db.close();
    return;
  }

  const ugUser = await getUgUserByLadokId(ladokStudentId);
  // const ugUser = await getUgUser(ladokStudentId);
  assert(ugUser !== undefined, "");

  const programParticipation = await getProgramParticipation(
    ladokStudentId,
    ladokCourseRoundId,
  );

  // 1. Create a StudentParticipation object
  const doc: DatabaseStudentParticipation = {
    id,
    ladokStudentId,
    ladokCourseId,
    ladokCourseRoundId,
    /** @description We currently use kthUserId as canvasSisId */
    canvasSisId: ugUser.kthid,
    /** @description Full Name of user */
    name: `${ugUser.givenName} ${ugUser.surname}`,
    /** Format: email */
    email: ugUser?.email,
    roles: ["student"],
    locations: [],
    programRound: programParticipation,
  };

  // 2. Get more student info from UG REST API
  // 3. Persist in DB
  await db.insert(doc, "StudentParticipation");
  await db.close();
}

export default {
  handler: ServiceBus<TRegistreringEvent>(handler),
  // input binding doesn't support cosmos document store yet
  // extraInputs: [cosmosInput],
  // extraOutputs: [cosmosOutput],
};
