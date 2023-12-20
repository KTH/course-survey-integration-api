import { InvocationContext } from "@azure/functions";
import { Db } from "mongodb";
import { TLadokAttributvarde, TLadokEventContext } from "./types";

export type TModulTillStatusEvent = {
  HandelseUID: string, // "6b79e669-9505-11ee-a0ce-a9a57d284dbd",
  EventContext: TLadokEventContext,
  OrganisationUID: string, // "e842afc9-73d6-11e8-8c58-f9aa7f7e4fb6",
  Status: number, // 2,
  UtbildningUID: string, // "6b741a06-9505-11ee-a0ce-a9a57d284dbd",
  Attributvarde: TLadokAttributvarde[],
  /*
    {
      "Grupp": 0,
      "Namn": "utbildning.attribut.betygsskala",
      "Varde": "131657",
      "Uid": "6b7419ff-9505-11ee-a0ce-a9a57d284dbd"
    },
    {
      "Grupp": 0,
      "Namn": "utbildning.attribut.titel.ska.anges",
      "Varde": "false",
      "Uid": "6b741a00-9505-11ee-a0ce-a9a57d284dbd"
    },
    {
      "Grupp": 0,
      "Namn": "utbildning.attribut.utbildningsomrade.organisation",
      "Varde": "e842afc9-73d6-11e8-8c58-f9aa7f7e4fb6",
      "Uid": "6b741a01-9505-11ee-a0ce-a9a57d284dbd"
    },
    {
      "Grupp": 0,
      "Namn": "utbildning.attribut.utbildningsomrade",
      "Varde": "2",
      "Uid": "6b741a02-9505-11ee-a0ce-a9a57d284dbd"
    },
    {
      "Grupp": 0,
      "Namn": "utbildning.attribut.utbildningsomrade.procent",
      "Varde": "100",
      "Uid": "6b741a03-9505-11ee-a0ce-a9a57d284dbd"
    }
  */
  UtbildningsinstansUID: string, // "6b741a05-9505-11ee-a0ce-a9a57d284dbd",
  UtbildningstypID: number, // 4,
  Benamningar: {
    Benamning: {
      Sprakkod: string, // "en",
      Text: string, // "Testmodule 1239"
    }[]
  },
  EnhetID: number, // 2,
  Omfattningsvarde: string, // "10.0",
  StudieordningID: number, // 1,
  UtbildningsformID: number, // 1,
  Utbildningskod: string, // "1239",
  Versionsinformation: {
    GiltigFranPeriodID: {
      value: number, // 151878
    },
    Versionsnummer: number, // 1,
    ArSenasteVersion: boolean, // true,
    Uid: string, // "6b741a04-9505-11ee-a0ce-a9a57d284dbd"
  },
  OverliggandeUtbildningUID: string, // "e51b9586-9501-11ee-a0ce-a9a57d284dbd",
  OverliggandeUtbildningsinstansUID: string, // "e51b9585-9501-11ee-a0ce-a9a57d284dbd",
  BetygsskalaID: number, // 131657,
  TitelSkaAnges: boolean, // false,
  Utbildningsomradesfordelning: {
    UtbildningsomradenPerOrganisation: {
      OrganisationUID: string, // "e842afc9-73d6-11e8-8c58-f9aa7f7e4fb6",
      Procent: number, // 100,
      UtbildningsomradeID: number, // 2
    }[]
  }
}

export async function handler(db: Db, message: TModulTillStatusEvent, context: InvocationContext): Promise<void> {
  const utbildningstillfalleUid = message.UtbildningsinstansUID;
  const status = message.Status;
  context.log(`ModulTillStatusEvent: ${utbildningstillfalleUid} ${status}`);
  // 1. Fetch CourseRound from DB
  // 2. Update status
  // 3. Persist in DB
}