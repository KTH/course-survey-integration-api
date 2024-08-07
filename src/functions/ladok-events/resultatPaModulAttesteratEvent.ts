import { InvocationContext } from "@azure/functions";
import { TLadokEventContext } from "./types";
import { isValidEvent } from "../utils";
import { Database } from "../db";
import { TBeslutMetaData, TReportedResultEntity } from "../interface";
import { hashStudentId } from "./utils";

export type TResultatPaModulAttesteratEvent = {
  HandelseUID: string; // "22a5b75c-b446-11ee-988f-6acd08c746d6",
  EventContext: TLadokEventContext;
  Beslut: TBeslutMetaData;
  KursUID: string; // "a4565647-b3b8-11ee-bf6a-e2af0a9345af",
  KursinstansUID: string; // "a4565646-b3b8-11ee-bf6a-e2af0a9345af",
  KurstillfalleUID: string; // "f1b8ac31-b3b8-11ee-bf6a-e2af0a9345af",
  Resultat: {
    BetygsgradID: number; // 131697,
    BetygsskalaID: number; // 131657,
    Examinationsdatum: string; // "2023-02-08",
    GiltigSomSlutbetyg: boolean; // false,
    OmfattningsPoang: number; // 20.0,
    PrestationsPoang: number; // 20.0,
    ResultatUID: string; // "b42577ac-b3b9-11ee-816b-5383fced4224"
  };
  StudentUID: string; // "4ff5969a-0e54-11ed-8f4d-87c157374df8",
  UtbildningsinstansUID: string; // "e540d686-b3b8-11ee-bf6a-e2af0a9345af"
};

export default async function handler(
  message: TResultatPaModulAttesteratEvent,
  context: InvocationContext,
  db: Database,
): Promise<void> {
  if (
    !isValidEvent(
      "se.ladok.schemas.resultat.ResultatPaModulAttesteratEvent",
      context?.triggerMetadata?.userProperties,
    )
  )
    return;

  context.log(`ResultatPaModulAttesteradEvent: `);

  const { KurstillfalleUID, StudentUID, UtbildningsinstansUID } = message;
  const { BeslutUID } = message.Beslut;
  const { BetygsgradID, BetygsskalaID, ResultatUID } = message.Resultat;
  try {
    const hashedStudentId = await hashStudentId(StudentUID);

    const id = `${UtbildningsinstansUID}-${hashedStudentId}`;
    const doc: TReportedResultEntity = {
      id,
      parentId: UtbildningsinstansUID, // This matches the moduleRoundId
      ladokCourseRoundId: KurstillfalleUID,
      hashedStudentId,
      decision: BeslutUID,
      result: "string",
      metaData: {
        HandelseUID: message.HandelseUID,
        BetygsgradID,
        BetygsskalaID,
        ResultatUID,
      },
    };

    await db.upsert<TReportedResultEntity>(doc.id, doc, "ReportedResult");
  } finally {
    await db.close();
  }
}
