// import { app, InvocationContext } from "@azure/functions";
// import { TLadokEventUserProperties } from "./ladok-events/types";

// const SUBSCRIPTION_NAME = process.env.LADOK3_FEED_SERVICE_BUS_SUBSCRIPTION_NAME ?? "";
// // const CONNECTION_STRING = process.env.LADOK3_FEED_SERVICE_BUS_CONNECTION_STRING ?? "" ;

// export async function LadokEvents(message: unknown, context: InvocationContext): Promise<void> {
//   context.log('ladok3EventType:', (context?.triggerMetadata?.userProperties as TLadokEventUserProperties).ladok3EventType)
// }

// app.serviceBusTopic('LadokEvents', {
//   connection: 'LADOK3_FEED_SERVICE_BUS_CONNECTION_STRING',
//   topicName: 'ladok3-feed',
//   subscriptionName: SUBSCRIPTION_NAME,
//   handler: LadokEvents
// });
