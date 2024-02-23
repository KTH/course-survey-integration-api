import { InvocationContext } from "@azure/functions";
import { TLadokEventContext } from "./types";
import { Database, ServiceBus, isValidEvent } from "../utils";
import { TReportedResultEntity } from "../interface";
import { hashStudentId } from "./utils";

export type TResultatPaModulAttesteratEvent = {
  HandelseUID: string; // "22a5b75c-b446-11ee-988f-6acd08c746d6",
  EventContext: TLadokEventContext;
  Beslut: {
    BeslutUID: string; // "34b1ff17-603e-11e9-9dcc-b1e66e1540b0",
    Beslutsdatum: string; // "2024-01-16",
    Beslutsfattare: string; // "Emil Stenberg (IT)",
    BeslutsfattareUID: string; // "34b1ff17-603e-11e9-9dcc-b1e66e1540b0"
  };
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

export async function handler(
  message: TResultatPaModulAttesteratEvent,
  context: InvocationContext,
  db: Database,
): Promise<void> {
  if (
    !isValidEvent(
      "ResultatPaModulAttesteradEvent",
      context?.triggerMetadata?.userProperties,
    )
  )
    return;

  context.log(`ResultatPaModulAttesteradEvent: `);

  const { KurstillfalleUID, StudentUID, UtbildningsinstansUID } = message;
  const { BeslutUID } = message.Beslut;
  const { BetygsgradID, BetygsskalaID, ResultatUID } = message.Resultat;
  const hashedStudentId = await hashStudentId(StudentUID);

  const id = `${UtbildningsinstansUID}-${hashedStudentId}`;
  const doc: TReportedResultEntity = {
    id,
    parentId: UtbildningsinstansUID, // This matches the moduleRoundId
    courseRoundId: KurstillfalleUID,
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

  const res = await db.fetchById(
    id,
    "ReportedResult",
  );

  if (res.length > 0) {
    const foundDoc = res[0];
    await db.update<TReportedResultEntity>(foundDoc._id, doc, "ReportedResult");
  } else {
    await db.insert<TReportedResultEntity>(doc, "ReportedResult");
  }
  await db.close();
}

export default {
  handler: ServiceBus<TResultatPaModulAttesteratEvent>(handler),
  // input binding doesn't support cosmos document store yet
  // extraInputs: [cosmosInput],
  // extraOutputs: [cosmosOutput],
};
