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
  Utbildningskod: z.string().min(1),
  Kurstillfalleskod: z.string().min(1), // I UG kommer omgångsnumret från kopps ersättas med Kurstillfalleskod

  /** Availability */
  Startdatum: z.string().trim().min(1),
  Slutdatum: z.string().trim().min(1),

  /** Credits */
  Omfattning: z.number(),
  AntalRegistrerade: z.number(),

  /** Grading Scheme */
  BetygsskalaID: z.number(),

  /** Modules */
  IngaendeMoment: z.array(
    z.object({
      /** Code */
      Utbildningskod: z.string().min(1),

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
  UtbildningsinstansUID: z.string().min(1),
});

export const LadokKursinstans = z.object({
  OrganisationUID: z.string().min(1),
});

export const LadokOrganisation = z.object({
  Benamning: z.object({
    sv: z.string(),
    en: z.string(),
  }),
  Organisationskod: z.string().min(1),
});

export const Kurstillfallesdeltagande = z.object({
  Tillfallesdeltaganden: z.array(
    z.object({
      Studiestrukturreferens: z.optional(z.string()),
      Utbildningsinformation: z.object({
        UtbildningstillfalleUID: z.string().min(1),
        Studieperiod: z.object({
          Startdatum: z.string().min(1),
        }),
      }),
    }),
  ),
});

// Studiestruktur is a recursive type
// the property "Barn" is an array of Studiestruktur
// See: https://zod.dev/?id=recursive-types
const StudiestrukturBase = z.object({
  Referens: z.string().min(1),
  Utbildningsinformation: z.object({
    Utbildningskod: z.string().min(1),
    Benamning: z.object({
      sv: z.string(),
      en: z.string(),
    }),
    Studieperiod: z.object({
      Startdatum: z.string().min(1),
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
