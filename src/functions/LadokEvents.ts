import { app, InvocationContext } from "@azure/functions";
import { MongoClient } from "mongodb";
import { handler as kurstillfalleTillStatusEvent, TKurstillfalleTillStatusEvent } from "./ladok-events/kurstillfalleTillStatusEvent";
import { handler as modulTillStatusEvent, TModulTillStatusEvent } from "./ladok-events/modulTillStatusEvent";
import { handler as paborjadUtbildningEvent, TPaborjadUtbildningEvent } from "./ladok-events/paborjadUtbildningEvent";
import { handler as registreringEvent, TRegistreringEvent } from "./ladok-events/registreringEvent";
import { handler as resultatPaHelKursAttesteratEvent, TResultatPaHelKursAttesteratEvent } from "./ladok-events/resultatPaHelKursAttesteratEvent";
import { handler as resultatPaModulAttesteratEvent, TResultatPaModulAttesteratEvent } from "./ladok-events/resultatPaModulAttesteratEvent";

import { TLadokEventUserProperties } from "./ladok-events/types";

const SUBSCRIPTION_NAME = process.env.LADOK3_FEED_SERVICE_BUS_SUBSCRIPTION_NAME ?? "";
const { MONGODB_CONNECTION_STRING = "mongodb://localhost:27027" } = process.env;
const DB_NAME = "ladok3";
const DB_QUEUE_NAME = "Ladok3FeedEvent";

const client = new MongoClient(MONGODB_CONNECTION_STRING, {
  maxPoolSize: 1,
  minPoolSize: 1,
  connectTimeoutMS: 1000,
});

export async function LadokEvents(message: unknown, context: InvocationContext): Promise<void> {
  context.log('ladok3EventType:', (context?.triggerMetadata?.userProperties as TLadokEventUserProperties).ladok3EventType)

  let err;
  try {
    await client.connect();
    const db = client.db(DB_NAME);

    switch ((context?.triggerMetadata?.userProperties as TLadokEventUserProperties).ladok3EventType) {
      // https://docs.google.com/presentation/d/130XPuty8Ge5W5XzxiUvW_oG1ThBXwvA0p7lFy_mIxo4/edit#slide=id.g2a0bddbae82_0_0
      case "RegistreringEvent":
        await registreringEvent(db, message as TRegistreringEvent, context);
        break;
      case "PaborjadUtbildningEvent":
        await paborjadUtbildningEvent(db, message as TPaborjadUtbildningEvent, context);
        break;
      case "KurstillfalleTillStatusEvent":
        await kurstillfalleTillStatusEvent(db, message as TKurstillfalleTillStatusEvent, context);
        break;
      case "ModulTillStatusEvent":
        await modulTillStatusEvent(db, message as TModulTillStatusEvent, context);
        break;
      case "ResultatPaModulAttesteratEvent":
        await resultatPaModulAttesteratEvent(db, message as TResultatPaModulAttesteratEvent, context);
        break;
      case "ResultatPaHelKursAttesteratEvent":
        await resultatPaHelKursAttesteratEvent(db, message as TResultatPaHelKursAttesteratEvent, context);
        break;
      default:
        // We don't recognise this message so skipping
    }
  } catch (e) {
    err = e;
  } finally {
    await client.close();
  }

  if (err) {
    context.error(err);
    // This rethrown exception will only fail the individual invocation, instead of crashing the whole process
    // https://learn.microsoft.com/en-us/azure/azure-functions/functions-reference-node?pivots=nodejs-model-v4&tabs=typescript%2Cwindows%2Cazure-cli#use-async-and-await
    throw err;
  }
}

app.serviceBusTopic('LadokEvents', {
  connection: 'LADOK3_FEED_SERVICE_BUS_CONNECTION_STRING',
  topicName: 'ladok3-feed',
  subscriptionName: SUBSCRIPTION_NAME,
  handler: LadokEvents
});
