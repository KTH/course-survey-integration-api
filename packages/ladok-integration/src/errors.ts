import { HTTPError, Method, Headers } from "got";
import { ZodError, ZodIssue } from "zod";

/** Thrown when there was an error when fetching data from API */
export class ApiError extends Error {
  public options?: {
    headers: Headers;
    url: string;
    method: Method;
    body: unknown;
  };

  public response?: {
    body: unknown;
    headers: Headers;
    ip?: string;
    retryCount: number;
    statusCode: number;
    statusMessage?: string;
  };

  public code: number;

  constructor(gotError: HTTPError) {
    super(gotError.message);
    this.code = gotError.response.statusCode;
    this.name = "UnhandledApiError";
    this.options = {
      headers: gotError.options.headers,
      url: gotError.options.url.toString(),
      method: gotError.options.method,
      body: JSON.stringify(gotError.options.json || {}),
    };
    this.response = {
      body: gotError.response.body,
      headers: gotError.response.headers,
      ip: gotError.response.ip,
      retryCount: gotError.response.retryCount,
      statusCode: gotError.response.statusCode,
      statusMessage: gotError.response.statusMessage,
    };
  }
}

/** Thrown when API response doesn't match the expected type */
export class ApiSchemaError extends Error {
  issues: string;

  constructor(endpoint: string, zodError: ZodError) {
    super(`The Ladok endpoint ${endpoint} returned an unexpected type`);
    this.issues = JSON.stringify(zodError.issues);
  }
}
