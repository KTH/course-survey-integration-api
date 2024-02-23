import { InvocationContext } from "@azure/functions";
import { TLadokEventContext } from "./types";
import { Database, ServiceBus, isValidEvent } from "../utils";

export type TAttesteratResultatMakuleratEvent = {
  Beslut: {
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

export async function handler(
  message: TAttesteratResultatMakuleratEvent,
  context: InvocationContext,
  db: Database,
): Promise<void> {
  if (
    !isValidEvent(
      "AttesteratResultatMakuleratEvent",
      context?.triggerMetadata?.userProperties,
    )
  )
    return;

  context.log(`AttesteratResultatMakuleratEvent: `);
}

export default {
  handler: ServiceBus<TAttesteratResultatMakuleratEvent>(handler),
  // input binding doesn't support cosmos document store yet
  // extraInputs: [cosmosInput],
  // extraOutputs: [cosmosOutput],
};
