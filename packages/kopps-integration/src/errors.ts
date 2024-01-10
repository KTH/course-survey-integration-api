/** List of all errors that can come from Kopps API */

import { HTTPError, Method, Headers } from "got";

export class InvalidLadokUidError extends Error {
  constructor(ladokUid: string) {
    super(
      `No round information found for ladokUid [${ladokUid}]. Information about old course rounds is not returned by Kopps API`,
    );
  }
}

export class SyllabusNotFoundError extends Error {
  constructor(term: number) {
    super(`No syllabus found for term [${term}]. `);
  }
}

/** Thrown when there was an error when fetching data from Kopps API */
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

    this.options.headers.authorization = "[HIDDEN]";
  }
}
