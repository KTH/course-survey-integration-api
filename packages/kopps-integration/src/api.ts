/**
 * This module contains functions that call Kopps API "as it is", without any
 * manipulations
 */

import { ApiError } from "./errors";
import {
  KoppsCourseDetailedInformation,
  KoppsCourseRoundSummary as KoppsCourseRoundSummary,
} from "./types";
import got, { HTTPError } from "got";

const gotClient = got.extend({
  prefixUrl: process.env.KOPPS_API_URL,
  responseType: "json",
  headers: {
    "Ocp-Apim-Subscription-Key": process.env.KOPPS_API_SUBSCRIPTION_KEY,
  },
});

function errorHandler(details: {}, error: unknown): never {
  if (typeof error === "object" && error !== null) {
    Error.captureStackTrace(error, errorHandler);
  }
  
  if (error instanceof HTTPError) {
    error.message = `${error.message} ${JSON.stringify(details)}`;
    throw new ApiError(error);
  }

  throw error;
}

/**
 * Get a course round from its Ladok ID
 */
export async function getCourseRoundSummary(ladokId: string) {
  // TODO: Runtime type-checking
  return gotClient
    .get<KoppsCourseRoundSummary>(
      `courses/offerings/roundnumber?ladokuid=${ladokId}`,
    )
    .then((response) => response.body)
    .catch((err) => errorHandler({ ladokId }, err));
}

/**
 * Get full information of a course round
 */
export async function getCourseDetailedInformation(courseCode: string) {
  // TODO: Runtime type-checking
  return gotClient
    .get<KoppsCourseDetailedInformation>(
      `course/${courseCode}/detailedinformation`,
    )
    .then((response) => response.body)
    .catch((err) => errorHandler({ courseCode }, err));
}
