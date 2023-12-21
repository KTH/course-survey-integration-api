import { ApiError } from "./errors";
import {
  LadokKursinstans,
  LadokOrganisation,
  type LadokKurstillfalleMoment,
} from "./types";
import got, { HTTPError } from "got";

const gotClient = got.extend({
  prefixUrl: process.env.LADOK_API_BASEURL,
  headers: {
    // Each ladok "endpoint" (/resultat, /kataloginformation) requires a
    // different "accept" header. The easiest is to set all of them in every
    // request
    Accept: [
      "application/vnd.ladok-resultat+json",
      "application/vnd.ladok-kataloginformation+json",
    ].join(","),
  },
  responseType: "json",
  https: {
    pfx: Buffer.from(process.env.LADOK_API_PFX_BASE64 as string, "base64"),
    passphrase: process.env.LADOK_API_PFX_PASSPHRASE,
  },
});

function errorHandler(error: unknown): never {
  if (error instanceof HTTPError) {
    throw new ApiError(error);
  }

  throw error;
}

export async function getKurstillfalle(kurstillfalleUID: string) {
  return gotClient
    .get<LadokKurstillfalleMoment>(
      `resultat/kurstillfalle/${kurstillfalleUID}/moment`,
    )
    .then((r) => r.body)
    .catch(errorHandler);
}

export async function getKursinstans(utbildningsinstansUID: string) {
  return gotClient
    .get<LadokKursinstans>(
      `resultat/utbildningsinstans/kursinstans/${utbildningsinstansUID}`,
    )
    .then((r) => r.body)
    .catch(errorHandler);
}

export async function getOrganisation(organisationUID: string) {
  return gotClient
    .get<LadokOrganisation>(
      `kataloginformation/organisation/${organisationUID}`,
    )
    .then((r) => r.body)
    .catch(errorHandler);
}
