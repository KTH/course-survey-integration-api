import { z } from "zod";
/**
 * Response for Ladok endpoint
 * GET /resultat/kurstillfalle/{{kurstillfalleUID}}/moment
 */
export interface LadokKurstillfalleMoment {
  /** Name */
  Benamning: {
    sv: string;
    en: string;
  };

  /** Course code */
  Utbildningskod: string;

  /** Credits */
  Omfattning: number;
  AntalRegistrerade: number;

  /** Grading Scheme */
  BetygsskalaID: number;

  /** Modules */
  IngaendeMoment: {
    /** Code */
    Utbildningskod: string;

    /** Name */
    Benamning: {
      sv: string;
      en: string;
    };

    /** Credits */
    Omfattning: number;

    /** Grading Scheme */
    BetygsskalaID: number;
  }[];

  /** ID of the "utbildningsinstans" */
  UtbildningsinstansUID: string;
}

/**
 * Response for the Laodk endpoint
 * GET /resultat/utbildningsinstans/kursinstans/{{utbildningsinstansUID}}
 */
export interface LadokKursinstans {
  OrganisationUID: string;
}

/**
 * Response for the Ladok endpoint
 * GET /kataloginformation/organisation/{{UID}}
 */
export interface LadokOrganisation {
  Benamning: {
    /** We use this to take the "School code" */
    sv: string;
    en: string;
  };
  Organisationskod: string;
}
