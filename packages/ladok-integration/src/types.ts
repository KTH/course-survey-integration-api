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

export const Kurstillfallesdeltagande = z.object({
  Tillfallesdeltaganden: z.array(
    z.object({
      Studiestrukturreferens: z.optional(z.string()),
      Utbildningsinformation: z.object({
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
    Utbildningskod: z.string(),
    Benamning: z.object({
      sv: z.string(),
      en: z.string(),
    }),
    Studieperiod: z.object({
      Startdatum: z.string(),
    }),
  }),
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
