import { InvocationContext } from "@azure/functions";
import { Database } from "../db";

export default async function handler(
  message: any,
  context: InvocationContext,
  db: Database,
): Promise<void> {
  const { triggerMetadata, invocationId } = context;
  // We have stored userProperties in fixture data
  const { userProperties } = triggerMetadata as any;

  try {
    await db._logIncomingMessage(
      invocationId,
      {
        id: invocationId,
        ladok3EventType: userProperties?.ladok3EventType,
        ladok3Username: userProperties?.ladok3Username,
        userProperties,
        message,
      },
    )
  } catch (err) {
    throw err;
  } finally {
    db.close();
  }
}
