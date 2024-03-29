import {
  HttpRequest,
  InvocationContext,
  HttpResponseInit,
} from "@azure/functions";
import { MongoClient, ObjectId } from "mongodb";
import { TLadokEventUserProperties } from "./ladok-events/types";
import { APIPaths } from "./interface";

const IS_PROD = process.env.NODE_ENV === "production";
const { COSMOSDB_CONNECTION_STRING } = process.env;
if (IS_PROD && !COSMOSDB_CONNECTION_STRING)
  throw new Error("Missing env var COSMOS_DB_CONNECTION_STRING");

type ApiHttpHandler = (
  req: HttpRequest,
  context: InvocationContext,
  db: Database,
) => Promise<HttpResponseInit>;

/**
 * This wrapper functions makes sure that the entire process doesn't crash on errors
 * by wrapping it in a try/catch. See note in code.
 * @param handler
 * @returns
 */
export function API(handler: ApiHttpHandler) {
  return async function (req: HttpRequest, ctx: InvocationContext) {
    try {
      ctx.log(`Http function processed request for url "${req.url}"`);
      return await handler(req, ctx, new Database());
    } catch (err) {
      ctx.error(err);
      // This rethrown exception will only fail the individual invocation, instead of crashing the whole process
      // https://learn.microsoft.com/en-us/azure/azure-functions/functions-reference-node?pivots=nodejs-model-v4&tabs=typescript%2Cwindows%2Cazure-cli#use-async-and-await
      throw err;
    }
  };
}

/**
 * This wrapper enforces paths to match API specification and removes the leading slash
 * @param path the path as defined in the API specification
 * @returns the path without the leading slash
 */
export function APIPathFromSpec(path: APIPaths) {
  return path.substring(1);
}

type ServiceBusTopicHandler<T = unknown> = (
  message: T,
  context: InvocationContext,
  db: Database,
) => Promise<void>;
/**
 * This wrapper functions makes sure that the entire process doesn't crash on errors
 * by wrapping it in a try/catch. See note in code.
 * @param handler
 * @returns
 */
export function ServiceBus<T>(handler: ServiceBusTopicHandler<T>) {
  return async function (msg: unknown, ctx: InvocationContext) {
    try {
      return await handler(<T>msg, ctx, new Database());
    } catch (err) {
      ctx.error(err);
      // This rethrown exception will only fail the individual invocation, instead of crashing the whole process
      // https://learn.microsoft.com/en-us/azure/azure-functions/functions-reference-node?pivots=nodejs-model-v4&tabs=typescript%2Cwindows%2Cazure-cli#use-async-and-await
      throw err;
    }
  };
}

// Runtime check to make sure that we don't process events that are not meant for us
export function isValidEvent(
  eventName: string,
  userProperties: unknown,
): boolean {
  return (
    (<TLadokEventUserProperties>userProperties)?.ladok3EventType === eventName
  );
}

export type DbCollectionName =
  | "StudentParticipation"
  | "CourseRound"
  | "Module"
  | "Program"
  | "ReportedResult";

export type TQueryOptions = {
  offset?: number;
  limit?: number;
};

export class Database {
  _client: MongoClient | undefined;

  async connect(): Promise<void> {
    if (this._client) return;
    const mongoClient = new MongoClient(COSMOSDB_CONNECTION_STRING!);
    this._client = await mongoClient.connect();
  }
  async close(): Promise<void> {
    if (this._client) await this._client.close();
    this._client = undefined;
  }

  async fetchById<T = any>(
    id: string,
    collectionName: DbCollectionName,
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
    options?: TQueryOptions,
  ): Promise<T[]> {
    await this.connect();
    const opts = options !== undefined
      ? { skip: options.offset, limit: options.limit }
      : undefined ;
    const collection = this._client!.db().collection(collectionName);
    const docs = await collection
      .find({ [propName]: value }, opts)
      .toArray();
    return docs as T[];
  }

  async query<T = any>(
    query: { [key: string]: any },
    collectionName: DbCollectionName,
    options?: TQueryOptions,
  ): Promise<T[]> {
    await this.connect();
    const opts = options !== undefined
      ? { skip: options.offset, limit: options.limit }
      : undefined ;
    const collection = this._client!.db().collection(collectionName);
    const docs = await collection.find(query, opts).toArray();
    return docs as T[];
  }

  async countByPropertyQuery(
    propName: string,
    value: string | Record<string, unknown>,
    collectionName: DbCollectionName,
  ): Promise<number> {
    await this.connect();
    const collection = this._client!.db().collection(collectionName);
    const count = await collection.countDocuments({ [propName]: value });
    return count;
  }

  async insert<T extends TBaseEntity>(
    doc: T,
    collectionName: DbCollectionName,
  ): Promise<void> {
    await this.connect();
    const collection = this._client!.db().collection(collectionName);
    await collection.insertOne({ ...doc });
  }

  async update<T extends TBaseEntity>(
    id: string,
    partial: Partial<T>,
    collectionName: DbCollectionName,
  ): Promise<void> {
    await this.connect();
    const collection = this._client!.db().collection(collectionName);
    await collection.updateOne({ id }, { $set: partial });
  }
}

type TBaseEntity = {
  id: string;
};
