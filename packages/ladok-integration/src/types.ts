import { z } from "zod";
/**
 * Response for Ladok endpoint
 * GET /resultat/kurstillfalle/{{kurstillfalleUID}}/moment
 */
export const LadokKurstillfalleMoment = z.object({
  /** Name */
  Benamning: z.object({
    sv: z.string(),
    en: z.string(),
  }),

  /** Course code */
  Utbildningskod: z.string(),
  Kurstillfalleskod: z.string(), // I UG kommer omgångsnumret från kopps ersättas med Kurstillfalleskod

  /** Availability */
  Startdatum: z.string().trim(),
  Slutdatum: z.string().trim(),

  /** Credits */
  Omfattning: z.number(),
  AntalRegistrerade: z.number(),

  /** Grading Scheme */
  BetygsskalaID: z.number(),

  /** Modules */
  IngaendeMoment: z.array(
    z.object({
      /** Code */
      Utbildningskod: z.string(),

      /** Name */
      Benamning: z.object({
        sv: z.string(),
        en: z.string(),
      }),

      /** Credits */
      Omfattning: z.number(),

      /** Grading Scheme */
      BetygsskalaID: z.number(),
    }),
  ),

  /** ID of the "utbildningsinstans" */
  UtbildningsinstansUID: z.string(),
});

export const LadokKursinstans = z.object({
  OrganisationUID: z.string(),
});

export const LadokOrganisation = z.object({
  Benamning: z.object({
    sv: z.string(),
    en: z.string(),
  }),
  Organisationskod: z.string(),
});
