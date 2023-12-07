import { app, InvocationContext } from "@azure/functions";
import { storeFeedEvent } from "./ladok-events/db";
import { TLadokEventUserProperties } from "./ladok-events/types";

const SUBSCRIPTION_NAME = process.env.LADOK3_FEED_SERVICE_BUS_SUBSCRIPTION_NAME ?? "";
// const CONNECTION_STRING = process.env.LADOK3_FEED_SERVICE_BUS_CONNECTION_STRING ?? "" ;

export async function LadokEvents(message: unknown, context: InvocationContext): Promise<void> {
  const eventType = (context?.triggerMetadata?.userProperties as TLadokEventUserProperties).ladok3EventType;
  console.log('ladok3EventType:', eventType);
  switch (eventType) {
    case 'se.ladok.schemas.studiedeltagande.ForvantatDeltagandeSkapadEvent':
    case 'se.ladok.schemas.resultat.AnmalanPaAktivitetstillfalleEvent':
    case 'se.ladok.schemas.resultat.AvanmalanPaAktivitetstillfalleEvent':
    case 'se.ladok.schemas.studiedeltagande.RegistreringEvent':
    case 'se.ladok.schemas.utbildningsinformation.KurstillfalleEvent':
    case 'se.ladok.schemas.utbildningsinformation.KurstillfalleUppdateratEvent':
    case 'se.ladok.schemas.utbildningsinformation.KurstillfalleTillStatusEvent':
    case 'se.ladok.schemas.studiedeltagande.AterkalladregistreringEvent':
      try {
        await storeFeedEvent(message, context?.triggerMetadata?.userProperties);
      } catch (e) {
        console.error('Failed to store event in DB', e);
      }
      break;
    default:
      try {
        await storeFeedEvent(message, context?.triggerMetadata?.userProperties);
      } catch (e) {
        console.error('Failed to store event in DB', e);
      }
      break;
  }
}

app.serviceBusTopic('LadokEvents', {
  connection: 'LADOK3_FEED_SERVICE_BUS_CONNECTION_STRING',
  topicName: 'ladok3-feed',
  subscriptionName: SUBSCRIPTION_NAME,
  handler: LadokEvents
});

setTimeout(() => {
  console.log('--- Restarted ---')
}, 1000);
