import { app, InvocationContext } from "@azure/functions";

const SUBSCRIPTION_NAME = process.env.LADOK3_FEED_SERVICE_BUS_SUBSCRIPTION_NAME ?? "";
// const CONNECTION_STRING = process.env.LADOK3_FEED_SERVICE_BUS_CONNECTION_STRING ?? "" ;

export async function LadokEvents(message: unknown, context: InvocationContext): Promise<void> {
  if (typeof message === 'string') {
    const msg = JSON.parse(message);
    context.log('...');

    if (msg.Anonymiseringskod === undefined) {
      context.log('Service bus topic function processed message:', message);
    } else {
      context.log('Anonymiseringskod, skippar...');
    }
  }
}

app.serviceBusTopic('LadokEvents', {
  connection: 'LADOK3_FEED_SERVICE_BUS_CONNECTION_STRING',
  topicName: 'ladok3-feed',
  subscriptionName: SUBSCRIPTION_NAME,
  handler: LadokEvents
});
