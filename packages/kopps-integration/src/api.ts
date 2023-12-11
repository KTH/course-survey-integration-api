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
  prefixUrl: "https://api.kth.se/api/kopps/v2/",
  responseType: "json",
});

function errorHandler(error: unknown): never {
  if (error instanceof HTTPError) {
    throw new ApiError(error);
  }

  throw error;
}

/**
 * Get a course round from its Ladok ID
 */
export async function getCourseRoundSummary(ladokId: string) {
  return gotClient
    .get<KoppsCourseRoundSummary>(
      `courses/offerings/roundnumber?ladokuid=${ladokId}`,
    )
    .then((response) => response.body)
    .catch(errorHandler);
}

/**
 * Get full information of a course round
 */
export async function getCourseDetailedInformation(courseCode: string) {
  return gotClient
    .get<KoppsCourseDetailedInformation>(
      `course/${courseCode}/detailedinformation`,
    )
    .then((response) => response.body)
    .catch(errorHandler);
}
