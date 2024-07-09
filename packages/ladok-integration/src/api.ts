import { ZodError, z } from "zod";
import { ApiError, ApiSchemaError } from "./errors";
import {
  LadokKursinstans,
  LadokOrganisation,
  LadokKurstillfalleMoment,
  Kurstillfallesdeltagande,
  Studiestruktur,
  LadokAnvandare,
  Utbildningstillfalle,
  LadokUtbildningsinstans,
} from "./types";
import got, { HTTPError } from "got";

const { LADOK_API_BASEURL, LADOK_API_PFX_BASE64, LADOK_API_PFX_PASSPHRASE } =
  process.env;

const gotClient = got.extend({
  prefixUrl: LADOK_API_BASEURL,
  headers: {
    // Each ladok "endpoint" (/resultat, /kataloginformation) requires a
    // different "accept" header. The easiest is to set all of them in every
    // request
    Accept: [
      "application/vnd.ladok-resultat+json",
      "application/vnd.ladok-kataloginformation+json",
      "application/vnd.ladok-studiedeltagande+json",
      "application/vnd.ladok-utbildningsinformation+json",
    ].join(","),
  },
  responseType: "json",
  https:
    LADOK_API_PFX_BASE64 && LADOK_API_PFX_PASSPHRASE
      ? {
          pfx: Buffer.from(LADOK_API_PFX_BASE64 as string, "base64"),
          passphrase: LADOK_API_PFX_PASSPHRASE,
        }
      : undefined,
});

function errorHandler(endpoint: string, error: unknown): never {
  if (typeof error === "object" && error !== null) {
    Error.captureStackTrace(error, errorHandler);
  }
  
  if (error instanceof HTTPError) {
    throw new ApiError(error);
  }

  if (error instanceof ZodError) {
    throw new ApiSchemaError(endpoint, error);
  }

  throw error;
}

/*
  Removed the typechecking function because the stacktrace became hard to read

  ApiError [UnhandledApiError]: Response code 400 (Bad Request)
    at errorHandler (/home/site/wwwroot/node_modules/ladok-integration/dist/api.js:58:15)
    at /home/site/wwwroot/node_modules/ladok-integration/dist/api.js:69:25
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async getCourseRoundInformation (/home/site/wwwroot/node_modules/ladok-integration/dist/index.js:18:27)
    at async handler (/home/site/wwwroot/dist/src/functions/ladok-events/paborjatUtbildningstillfalleEvent.js:27:38)
    at async /home/site/wwwroot/dist/src/functions/utils.js:44:20

  The line dist/api.js:69:25 pointed to the general typechecking function

  This might not work due to Got's error handling. If not, add a function _getCurrentUser() that
 
  function _getCurrentUser()
    return typedGet("kataloginformation/anvandare/autentiserad", LadokAnvandare);
  }

  or

  function _getCurrentUser(endpoint, zodType) {
    return gotClient(endpoint)
      .then((r) => zodType.parse(r.body))
      .catch((err) => errorHandler(endpoint, err));
  }
*/

export async function getCurrentUser() {
  const endpoint = "kataloginformation/anvandare/autentiserad";
  const zodType = LadokAnvandare;
  return gotClient(endpoint)
    .then((r) => zodType.parse(r.body))
    .catch((err) => errorHandler(endpoint, err));
}

export async function getKurstillfalle(kurstillfalleUID: string) {
  const endpoint = `resultat/kurstillfalle/${kurstillfalleUID}/moment`;
  const zodType = LadokKurstillfalleMoment;
  return gotClient(endpoint)
    .then((r) => zodType.parse(r.body))
    .catch((err) => errorHandler(endpoint, err));
}

export async function getKursinstans(utbildningsinstansUID: string) {
  const endpoint = `resultat/utbildningsinstans/kursinstans/${utbildningsinstansUID}`;
  const zodType = LadokKursinstans;
  return gotClient(endpoint)
    .then((r) => zodType.parse(r.body))
    .catch((err) => errorHandler(endpoint, err));
}

export async function getUtbildningsinstans(utbildningsinstansUID: string) {
  const endpoint = `utbildningsinformation/ro/utbildningsinstans/${utbildningsinstansUID}`;
  const zodType = LadokUtbildningsinstans;
  return gotClient(endpoint)
    .then((r) => zodType.parse(r.body))
    .catch((err) => errorHandler(endpoint, err));
}

export async function getOrganisation(organisationUID: string) {
  const endpoint = `kataloginformation/organisation/${organisationUID}`;
  const zodType = LadokOrganisation;
  return gotClient(endpoint)
    .then((r) => zodType.parse(r.body))
    .catch((err) => errorHandler(endpoint, err));
}

export async function getKurstillfallesdeltagande(studentUID: string) {
  const endpoint = `studiedeltagande/tillfallesdeltagande/kurstillfallesdeltagande/student/${studentUID}`;
  const zodType = Kurstillfallesdeltagande;
  return gotClient(endpoint)
    .then((r) => zodType.parse(r.body))
    .catch((err) => errorHandler(endpoint, err));
}

export async function getStudiestruktur(studentUID: string) {
  const endpoint = `studiedeltagande/studiestruktur/student/${studentUID}`;
  const zodType = Studiestruktur;
  return gotClient(endpoint)
    .then((r) => zodType.parse(r.body))
    .catch((err) => errorHandler(endpoint, err));
}

export async function getUtbildningstillfalle(utbildningstillfalleUID: string) {
  const endpoint = `utbildningsinformation/utbildningstillfalle/${utbildningstillfalleUID}`;
  const zodType = Utbildningstillfalle;
  return gotClient(endpoint)
    .then((r) => zodType.parse(r.body))
    .catch((err) => errorHandler(endpoint, err));
}

// /utbildningsinformation/internal/utbildningstillfalle/647a7d3d-9a89-11ee-bfe5-0721067a4fbf