import { MongoClient } from "mongodb";

const { MONGODB_CONNECTION_STRING = "mongodb://localhost:27027" } = process.env;
const DB_NAME = "ladok3";
const DB_QUEUE_NAME = "Ladok3FeedEvent";

const client = new MongoClient(MONGODB_CONNECTION_STRING, {
  maxPoolSize: 1,
  minPoolSize: 1,
  connectTimeoutMS: 1000,
});

export async function storeFeedEvent(message: any, userProps: any) {
  const event = {
    ladok3EventType: userProps.ladok3EventType,
    ladok3Username: userProps.ladok3Username,
    message,
    userProps,
  };

  let res;
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const coll = db.collection(DB_QUEUE_NAME);
    res = await coll.insertOne({
      ...event,
    });
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }

  if (res?.acknowledged) return;

  // TODO: Should we check reason?
  throw new Error("Could not insert entry into queue");
}
