import { InvocationContext } from "@azure/functions";
import { TLadokEventContext, TLadokAttributvarde } from "./types";
import { Database, ServiceBus, isValidEvent } from "../utils";

export type TKurstillfalleTillStatusEvent = {
  HandelseUID: string, // "7c2e425f-9507-11ee-a0ce-a9a57d284dbd",
  EventContext: TLadokEventContext,
  OrganisationUID: string, // "e842afc9-73d6-11e8-8c58-f9aa7f7e4fb6",
  Status: number, // 2,
  UtbildningUID: string, //  "e51b9586-9501-11ee-a0ce-a9a57d284dbd",
  Attributvarde: TLadokAttributvarde[],
  /*
  {
    "Grupp": 0,
    "Namn": "utbildning.attribut.undervisningstid",
    "Varde": "101052",
    "Uid": "3ea87095-9507-11ee-a0ce-a9a57d284dbd"
  },
  {
    "Grupp": 0,
    "Namn": "utbildning.attribut.finansieringsform",
    "Varde": "102085",
    "Uid": "3ea87096-9507-11ee-a0ce-a9a57d284dbd"
  },
  {
    "Grupp": 0,
    "Namn": "utbildning.attribut.studieavgiftsbelagd",
    "Varde": "false",
    "Uid": "3ea87097-9507-11ee-a0ce-a9a57d284dbd"
  }
  */
  UtbildningsinstansUID: string, // "e51b9585-9501-11ee-a0ce-a9a57d284dbd",
  UtbildningstypID: number, // 52,
  Avgiftsbelagt: boolean, // false,
  StartperiodID: number, // 151878,
  StudielokaliseringID: number, // 135195,
  StudietaktID: number, // 1,
  UndervisningsformID: number, // 1,
  UndervisningstidID: number, // 101052,
  UtbildningUtbildningstypID: number, // 22,
  UtbildningstillfalleUID: string, // "41717c91-4028-11ee-bf53-2115569549a8",
  Utbildningstillfalleskod: string, // "12349",
  Kurstillfallesattribut: {
    Finansieringsform: number, // 102085
  },
  Kurstillfallesperioder: {
    ForstaRegistreringsdatum: string, // "2023-08-28",
    ForstaUndervisningsdatum: string, // "2023-08-28",
    Omfattningsvarde: number, // 10,
    SistaRegistreringsdatum: string, // "2024-01-15",
    SistaUndervisningsdatum: string, // "2024-01-15",
    UtbildningsomradePerOrganisation: {
      OrganisationUID: string, // "e842afc9-73d6-11e8-8c58-f9aa7f7e4fb6",
      Procent: number, // 100,
      UtbildningsomradeID: number, // 2,
      Uid: string, // "3ea8709a-9507-11ee-a0ce-a9a57d284dbd"
    }[],
    Uid: string, // "3ea87099-9507-11ee-a0ce-a9a57d284dbd"
  }[]
}

export async function handler(message: TKurstillfalleTillStatusEvent, context: InvocationContext, db: Database): Promise<void> {
  if (!isValidEvent("se.ladok.schemas.utbildningsinformation.KurstillfalleTillStatusEvent", context?.triggerMetadata?.userProperties)) return;

  const utbildningstillfalleUid = message.UtbildningstillfalleUID;
  const status = message.Status;
  context.log(`KurstillfalleTillStatusEvent: ${utbildningstillfalleUid} ${status}`);

  try {
    const courseRound = await db.fetchById(utbildningstillfalleUid, "CourseRound");
    // 1. Fetch CourseRound from DB
    // 2. Update status
    // 3. Persist in DB
  
    await db.update(courseRound.id!, { status }, "CourseRound");
  } finally {
    await db.close();
  }
}

export default {
  handler: ServiceBus<TKurstillfalleTillStatusEvent>(handler),
  extraInputs: undefined,
  extraOutputs: undefined,
}
