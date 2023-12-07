import { MongoClient } from "mongodb";

const { MONGODB_CONNECTION_STRING = "mongodb://localhost:27027/ladok3" } = process.env;
const DB_NAME = "ladok3";
const DB_QUEUE_NAME = "Ladok3FeedEvent";

const databaseClient = new MongoClient(MONGODB_CONNECTION_STRING, {
  maxPoolSize: 5,
  minPoolSize: 1,
  connectTimeoutMS: 1000,
});

let _dbOpenCounter = 0;
async function getCol() {
  _dbOpenCounter++;
  const database = databaseClient.db(DB_NAME);
  return database.collection(DB_QUEUE_NAME);
}

async function closeDb() {
  _dbOpenCounter--;
  if (_dbOpenCounter === 0) {
    // await databaseClient.close();
  }
}

export async function storeFeedEvent(message: any, userProps: any) {
  const event = {
    ladok3EventType: userProps.ladok3EventType,
    ladok3Username: userProps.ladok3Username,
    message,
    userProps,
  };

  let res;
  try {
    const eventCol = await getCol();
    res = await eventCol.insertOne({
      ...event,
    });
  } catch (e) {
    console.error(e);
  } finally {
    await closeDb();
  }

  if (res?.acknowledged) return;

  // TODO: Should we check reason?
  throw new Error("Could not insert entry into queue");
}