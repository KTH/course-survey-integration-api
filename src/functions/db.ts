import { MongoClient } from "mongodb";

const IS_PROD = process.env.NODE_ENV === "production";
const {
  COSMOSDB_CONNECTION_STRING = "mongodb://localhost:27027"
} = process.env;

if (IS_PROD && !COSMOSDB_CONNECTION_STRING)
  throw new Error("Missing env var COSMOS_DB_CONNECTION_STRING");

const dbConnectionUrl = new URL(COSMOSDB_CONNECTION_STRING);
const COSMOSDB_NAME = process.env.COSMOSDB_NAME ?? "test";
dbConnectionUrl.pathname = `/${COSMOSDB_NAME}`;
  
// const DB_NAME = "ladok3";
// const DB_QUEUE_NAME = "Ladok3FeedEvent";

// const client = new MongoClient(MONGODB_CONNECTION_STRING, {
//   maxPoolSize: 1,
//   minPoolSize: 1,
//   connectTimeoutMS: 1000,
// });

// export async function storeFeedEvent(message: any, userProps: any) {
//   const event = {
//     ladok3EventType: userProps.ladok3EventType,
//     ladok3Username: userProps.ladok3Username,
//     message,
//     userProps,
//   };

//   let res;
//   try {
//     await client.connect();
//     const db = client.db(DB_NAME);
//     const coll = db.collection(DB_QUEUE_NAME);
//     res = await coll.insertOne({
//       ...event,
//     });
//   } catch (e) {
//     console.error(e);
//   } finally {
//     await client.close();
//   }

//   if (res?.acknowledged) return;

//   // TODO: Should we check reason?
//   throw new Error("Could not insert entry into queue");
// }

export type DbCollectionName = "StudentParticipation" |
  "CourseRound" |
  "Module" |
  "Program" |
  "ReportedResult";

export type TQueryOptions = {
  offset?: number;
  limit?: number;
};

export class Database {
  _client: MongoClient | undefined;

  async connect(): Promise<void> {
    if (this._client) return;
    const mongoClient = new MongoClient(dbConnectionUrl.href);
    this._client = await mongoClient.connect();
  }
  async close(): Promise<void> {
    if (this._client) await this._client.close();
    this._client = undefined;
  }

  async fetchById<T = any>(
    id: string,
    collectionName: DbCollectionName
  ): Promise<T> {
    await this.connect();
    const collection = this._client!.db().collection(collectionName);
    const doc = await collection.findOne({ id });
    return doc as T;
  }

  async queryByProperty<T = any>(
    propName: string,
    value: string | object,
    collectionName: DbCollectionName,
    options?: TQueryOptions
  ): Promise<T[]> {
    await this.connect();
    const opts = options !== undefined
      ? { skip: options.offset, limit: options.limit }
      : undefined;
    const collection = this._client!.db().collection(collectionName);
    const docs = await collection
      .find({ [propName]: value }, opts)
      .toArray();
    return docs as T[];
  }

  async query<T = any>(
    query: { [key: string]: any; },
    collectionName: DbCollectionName,
    options?: TQueryOptions
  ): Promise<T[]> {
    await this.connect();
    const opts = options !== undefined
      ? { skip: options.offset, limit: options.limit }
      : undefined;
    const collection = this._client!.db().collection(collectionName);
    const docs = await collection.find(query, opts).toArray();
    return docs as T[];
  }

  async countByPropertyQuery(
    propName: string,
    value: string | Record<string, unknown>,
    collectionName: DbCollectionName
  ): Promise<number> {
    await this.connect();
    const collection = this._client!.db().collection(collectionName);
    const count = await collection.countDocuments({ [propName]: value });
    return count;
  }

  async insert<T extends TBaseEntity>(
    doc: T,
    collectionName: DbCollectionName
  ): Promise<void> {
    await this.connect();
    const collection = this._client!.db().collection(collectionName);
    await collection.insertOne({ ...doc });
  }

  async update<T extends TBaseEntity>(
    id: string,
    partial: Partial<T>,
    collectionName: DbCollectionName
  ): Promise<void> {
    await this.connect();
    const collection = this._client!.db().collection(collectionName);
    await collection.updateOne({ id }, { $set: partial });
  }
}
type TBaseEntity = {
  id: string;
};

