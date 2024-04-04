import {
  HttpRequest,
  InvocationContext,
  HttpResponseInit,
} from "@azure/functions";

import { TLadokEventUserProperties } from "./ladok-events/types";
import { APIPaths } from "./interface";
import { Database } from "./db";

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
