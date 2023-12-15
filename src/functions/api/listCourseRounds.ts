import {
  HttpRequest, HttpResponseInit, InvocationContext
} from "@azure/functions";
import {
  APICourseRoundList
} from "../interface";

export default async function handler<T extends APICourseRoundList>(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  // const body: T = {};

  return {
    status: 200,
    body: 'TODO: List course rounds!'
  }
};