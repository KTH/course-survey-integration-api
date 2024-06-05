import { InvocationContext } from "@azure/functions";
import { TLadokEventContext } from "./types";
import { isValidEvent } from "../utils";
import { Database } from "../db";
import { TReportedResultEntity } from "../interface";
import { hashStudentId } from "./utils";

export type TAttesteratResultatMakuleratEvent = {
  Beslut: {
    Anteckning: string; // "Makulerat av någon anledning.",
    BeslutUID: string; // "34b1ff17-603e-11e9-9dcc-b1e66e1540b0",
    Beslutsdatum: string; // "2024-01-18",
    Beslutsfattare: string; // "Emil Stenberg (IT)",
    BeslutsfattareUID: string; // "34b1ff17-603e-11e9-9dcc-b1e66e1540b0"
  };
  GiltigSomSlutbetyg: boolean; // true,
  KursUID: string; // "a4565647-b3b8-11ee-bf6a-e2af0a9345af",
  PrestationsPoang: number; // 5,
  ResultatFinns: boolean; // false,
  ResultatUID: string; // "31d936dc-b53f-11ee-988f-6acd08c746d6",
  StudentUID: string; // "ea667761-2c55-11ee-998a-6a4f18c04b6e",
  UtbildningensOmfattning: number; // 5,
  UtbildningsgrundtypID: number; // 1,
  UtbildningsinstansUID: string; // "715b159a-b536-11ee-aef4-bd1cad394d29",
  HandelseUID: string; // "5c6e3eab-b5de-11ee-988f-6acd08c746d6",
  EventContext: TLadokEventContext;
};

export default async function handler(
  message: TAttesteratResultatMakuleratEvent,
  context: InvocationContext,
  db: Database,
): Promise<void> {
  if (
    !isValidEvent(
      "se.ladok.schemas.resultat.AttesteratResultatMakuleratEvent",
      context?.triggerMetadata?.userProperties,
    )
  ) return;

  try {
    const hashedStudentId = await hashStudentId(message.StudentUID);
    const id = `${message.UtbildningsinstansUID}-${hashedStudentId}`;
  
    await db.upsert<TReportedResultEntity>(id, { id, retraction: message.Beslut }, "ReportedResult");
  } finally {
    await db.close();
  }

  // context.log(`AttesteratResultatMakuleratEvent: `);
}
