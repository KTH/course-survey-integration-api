import { ZodError, ZodObject, ZodRawShape } from "zod";
import { ApiError, ApiSchemaError } from "./errors";
import {
  LadokKursinstans,
  LadokOrganisation,
  LadokKurstillfalleMoment,
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

function errorHandler(endpoint: string, error: unknown): never {
  if (error instanceof HTTPError) {
    throw new ApiError(error);
  }

  if (error instanceof ZodError) {
    throw new ApiSchemaError(endpoint, error);
  }

  throw error;
}

function typedGet<T extends ZodRawShape>(endpoint: string, type: ZodObject<T>) {
  return gotClient
    .get(endpoint)
    .then((r) => type.parse(r.body))
    .catch((err) => errorHandler(endpoint, err));
}

export async function getKurstillfalle(kurstillfalleUID: string) {
  return typedGet(
    `resultat/kurstillfalle/${kurstillfalleUID}/moment`,
    LadokKurstillfalleMoment,
  );
}

export async function getKursinstans(utbildningsinstansUID: string) {
  return typedGet(
    `resultat/utbildningsinstans/kursinstans/${utbildningsinstansUID}`,
    LadokKursinstans,
  );
}

export async function getOrganisation(organisationUID: string) {
  return typedGet(
    `kataloginformation/organisation/${organisationUID}`,
    LadokOrganisation,
  );
}
