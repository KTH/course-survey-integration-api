import { HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { APICourseRound } from "../interface";

export default async function handler<T extends APICourseRound>(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  // const body: T | null = null;

  return {
    status: 200,
    body: 'TODO: Show course info!'
  }
};