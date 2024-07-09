import { z } from "zod";

/**
 * Response from Ladok endpoint
 * GET /kataloginformation/anvandare/autentiserad
 */
export const LadokAnvandare = z.object({
  Anvandarnamn: z.string(),
  Fornamn: z.string(),
  LarosateID: z.number(),
  Uid: z.string(),
});

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

export const LadokUtbildningsinstans = z.object({
  Attributvarden: z.array(
    z.record(
      z.any(),
    ),
  ),
  Uid: z.string(),
});

export const LadokOrganisation = z.object({
  Benamning: z.object({
    sv: z.string(),
    en: z.string(),
  }),
  Organisationskod: z.string(),
});

export const Kurstillfallesdeltagande = z.object({
  Tillfallesdeltaganden: z.array(
    z.object({
      Studiestrukturreferens: z.optional(z.string()),
      Utbildningsinformation: z.object({
        Utbildningskod: z.optional(z.string()), // Utbildningskod doesn't exist for outgoing exchange studies
        UtbildningstillfalleUID: z.string(),
        Studieperiod: z.object({
          Startdatum: z.string(),
        }),
      }),
    }),
  ),
});

// Studiestruktur is a recursive type
// the property "Barn" is an array of Studiestruktur
// See: https://zod.dev/?id=recursive-types
const StudiestrukturBase = z.object({
  Referens: z.string(),
  Utbildningsinformation: z.object({
    AvsesLedaTill: z.string(),
    Utbildningskod: z.string(),
    Benamning: z.object({
      sv: z.string(),
      en: z.string(),
    }).partial({ en: true }), // Special cases don't have english translations
    Studieperiod: z.object({
      Startdatum: z.string(),
    }),
  }).partial({ AvsesLedaTill: true}),
});

export type TStudiestruktur = z.infer<typeof StudiestrukturBase> & {
  Barn: TStudiestruktur[];

};

const StudiestrukturRec: z.ZodType<TStudiestruktur> = StudiestrukturBase.extend(
  {
    Barn: z.lazy(() => StudiestrukturRec.array()),
  },
);

export const Studiestruktur = z.object({
  Studiestrukturer: z.array(StudiestrukturRec),
});

// https://www.integrationstest.ladok.se/restdoc/utbildningsinformation.html#N71765
const AttributVarde = z.object({
  AttributdefinitionUID: z.string(),
  Grupp: z.number(),
  link: z.array(z.any()),
  Namn: z.string(),
  Uid: z.string(),
  Varde: z.string(),
});
export const Utbildningstillfalle = z.object({
  Attributvarden: AttributVarde.array(),
  UtbildningsinstansUID: z.string(),
});