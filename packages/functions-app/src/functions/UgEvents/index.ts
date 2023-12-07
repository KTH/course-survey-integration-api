import { app, InvocationContext } from "@azure/functions";

export async function UgEvents(message: unknown, context: InvocationContext): Promise<void> {
    context.log('Service bus topic function processed message:', message);
}

app.serviceBusTopic('UgEvents', {
    connection: '',
    topicName: 'mytopic',
    subscriptionName: 'mysubscription',
    handler: UgEvents
});
