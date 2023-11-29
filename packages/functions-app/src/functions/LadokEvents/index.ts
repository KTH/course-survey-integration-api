import { app, InvocationContext } from "@azure/functions";

export async function LadokEvents(message: unknown, context: InvocationContext): Promise<void> {
    context.log('Service bus topic function processed message:', message);
}

app.serviceBusTopic('LadokEvents', {
    connection: '',
    topicName: 'mytopic',
    subscriptionName: 'mysubscription',
    handler: LadokEvents
});
