import { InvocationContext } from "@azure/functions";
import { TLadokEventContext } from "./types";
import { Database, ServiceBus, isValidEvent } from "../utils";
import { TReportedResultEntity } from "../interface";
import { hashStudentId } from "./utils";

export type TResultatPaHelKursAttesteratEvent = {
  HandelseUID: string; // "1e391f8b-b44f-11ee-988f-6acd08c746d6",
  EventContext: TLadokEventContext,
  Beslut: {
      BeslutUID: string; // "34b1ff17-603e-11e9-9dcc-b1e66e1540b0",
      Beslutsdatum: string; // "2024-01-16",
      Beslutsfattare: string; // "Emil Stenberg (IT)",
      BeslutsfattareUID: string; // "34b1ff17-603e-11e9-9dcc-b1e66e1540b0"
  },
  KursUID: string; // "a4565647-b3b8-11ee-bf6a-e2af0a9345af",
  KursinstansUID: string; // "a4565646-b3b8-11ee-bf6a-e2af0a9345af",
  KurstillfalleUID: string; // "f1b8ac31-b3b8-11ee-bf6a-e2af0a9345af",
  Resultat: {
      BetygsgradID: number; // 131661,
      BetygsskalaID: number; // 131657,
      Examinationsdatum: string; // "2024-01-16",
      GiltigSomSlutbetyg: boolean, // true,
      OmfattningsPoang: number; // 20.0,
      PrestationsPoang: number; // 0.0,
      ResultatUID: string; // "1e391f88-b44f-11ee-988f-6acd08c746d6"
  },
  StudentUID: string; // "e806c109-ce0e-11e7-ab7e-c364338b4317",
  UtbildningsinstansUID: string; // "a4565646-b3b8-11ee-bf6a-e2af0a9345af"
}

export async function handler(message: TResultatPaHelKursAttesteratEvent, context: InvocationContext, db: Database): Promise<void> {
  if (!isValidEvent("ResultatPaHelKursAttesteradEvent", context?.triggerMetadata?.userProperties)) return;

  context.log(`ResultatPaHelKursAttesteradEvent: `);

  const { KurstillfalleUID, StudentUID, UtbildningsinstansUID } = message;
  const { BeslutUID } = message.Beslut;
  const { BetygsgradID, BetygsskalaID, ResultatUID } = message.Resultat;
  const hashedStudentId = await hashStudentId(StudentUID);

  const id = `${KurstillfalleUID}-${hashedStudentId}`;
  const doc: TReportedResultEntity = {
    id,
    parentId: UtbildningsinstansUID, // This matches the courseRoundId and is used to distinguish between course result and module result
    courseRoundId: KurstillfalleUID,
    hashedStudentId,
    decision: BeslutUID,
    result: "string",
    metaData: {
      HandelseUID: message.HandelseUID,
      BetygsgradID,
      BetygsskalaID,
      ResultatUID
    }  
  }

  const res = await db.query({
    id,
  }, "ReportedResult");
  
  if (res.length > 0) {
    const foundDoc = res[0];
    await db.update<TReportedResultEntity>(foundDoc._id, doc, "ReportedResult");
  } else {
    await db.insert<TReportedResultEntity>(doc, "ReportedResult");
  }
  await db.close();
}

export default {
  handler: ServiceBus<TResultatPaHelKursAttesteratEvent>(handler),
  extraInputs: undefined,
  extraOutputs: undefined,
}
