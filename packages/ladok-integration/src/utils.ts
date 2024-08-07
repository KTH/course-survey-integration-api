import type { z } from "zod";
import { LadokOrganisation } from "./types";
import { strict as assert } from "node:assert";
import { TGetEduInstance } from ".";

type LadokOrganisation = z.infer<typeof LadokOrganisation>;

/**
 * This information is obtained from Ladok
 * But hardcoded for eficiency reasons
 */
export function getGradingScheme(id: number) {
  // AF
  if (id === 131657) {
    return {
      code: "AF",
      grades: [
        { validFinalGrade: true, code: "A" },
        { validFinalGrade: true, code: "B" },
        { validFinalGrade: true, code: "C" },
        { validFinalGrade: true, code: "D" },
        { validFinalGrade: true, code: "E" },
        { validFinalGrade: false, code: "FX" },
        { validFinalGrade: false, code: "F" },
      ],
    };
  }

  // PF
  if (id === 131656) {
    return {
      code: "PF",
      grades: [
        { validFinalGrade: true, code: "P" },
        { validFinalGrade: false, code: "F" },
      ],
    };
  }

  // GD (deprecated) used for HL1903
  if (id === 131650) {
    return {
      code: "GD",
      grades: [
        { validFinalGrade: true, code: "G" },
        { validFinalGrade: true, code: "D" },
        { validFinalGrade: false, code: "U" },
      ],
    };
  }

  // UV (deprecated) 131668 used for HL1903, 101312 used for a bunch of others
  if (id === 131668 || id === 101312) {
    return {
      code: "UV",
      grades: [
        { validFinalGrade: true, code: "VG" },
        { validFinalGrade: true, code: "G" },
        { validFinalGrade: false, code: "U" },
      ],
    };
  }

  // FOG (deprecated)
  if (id === 1) {
    return {
      code: "FOG",
      grades: [
        { validFinalGrade: true, code: "G" },
      ],
    };
  }

  throw new Error(`Unknown grading scheme id [${id}]`);
}

export function parseOrganisation(organisation: LadokOrganisation) {
  // Both "Benamning.sv" and "Benamning.en" are formatted as
  // "SCI/Matematik" where "SCI" is the School code and should be the same
  // in both languages
  const [codeSv, departmentSv] = organisation.Benamning.sv.split("/");
  const [codeEn, departmentEn] = organisation.Benamning.en.split("/");

  // Verifying the length of the arrays
  if (!departmentEn) {
    throw new Error(
      `Incompatible format. Benamning.en must be "School code/Institution name". Obtained: [${organisation.Benamning.en}]`,
    );
  }

  if (!departmentSv) {
    throw new Error(
      `Incompatible format. Benamning.sv must be "School code/Institution name". Obtained: [${organisation.Benamning.sv}]`,
    );
  }

  if (codeSv !== codeEn) {
    throw new Error(
      `School code in Swedish [${codeSv}] does not match with code in English [${codeEn}]`,
    );
  }

  return {
    school: {
      code: codeSv,
    },
    department: {
      code: organisation.Organisationskod,
      name: {
        en: departmentEn,
        sv: departmentSv,
      },
    },
  };
}

/**
 * Get the year and term from a date
 * @param {string} date  Date formatted as `YYYY-MM-DD`
 * @return a string "XXXXY" where XXXX is a year and Y is the term (1 for spring, 2 for autumn)
 */
export function getTermFromDate(date: string) {
  const REGEX = /(\d\d\d\d)\-(\d\d)\-(\d\d)/;
  const m = date.match(REGEX);

  assert(m !== null, "Error!!1");

  const year = m[1];
  const month = parseInt(m[2], 10);

  if (month <= 6) {
    return `${year}1`;
  } else {
    return `${year}2`;
  }
}

/** Get the difference between two terms */
export function diffTerms(t1: string, t2: string) {
  // 1. Number of years between the periods
  const yDiff = parseInt(t1.slice(0, 4), 10) - parseInt(t2.slice(0, 4), 10);

  // 2. If they are not the same period, add or substract 1
  const tDiff = parseInt(t1.slice(-1), 10) - parseInt(t2.slice(-1), 10);

  return yDiff * 2 + tDiff;
}

/**
 * Given the reference of a "Studiestruktur" and a tree with "Studiestruktur",
 * find the leaf in the structure with the reference
 *
 * Returns an array of the path from the root to the found leaf
 */
export function findStudiestruktur<T extends { Referens: string; Barn: T[] }>(
  ref: string,
  struktur: T[],
): Omit<T, "Barn">[] {
  for (const leaf of struktur) {
    const { Barn, ...other } = leaf;

    if (leaf.Referens === ref) {
      return [other];
    }

    if (leaf.Barn.length > 0) {
      const subStructure = findStudiestruktur(ref, leaf.Barn);

      if (subStructure.length > 0) {
        return [other, ...subStructure];
      }
    }
  }

  return [];
}

export function isKurspaketering(data: any): boolean {
  for (const attribut of data.Attributvarden) {
    if (!Array.isArray(attribut.GrupperadeVarden)) continue;

    for (const grupperatVarde of attribut.GrupperadeVarden) {
      if (!Array.isArray(grupperatVarde.Varden)) continue;

      for (const varde of grupperatVarde.Varden) {
        if (varde.Attributdefinition.Kod !== "utbildningstyp.grundtyp") continue;

        if (varde.Varden[0] === "KURSPAKETERING") {
          return true;
        }
      }
    }
  }

  return false;
}

const doctoralThesisCodes = [
  "DOKABE",
  "DOKCBH",
  "DOKEECS",
  "DOKITM",
  "DOKITM10",
  "DOKSCI",
  "DOKV18",
];

export function isDoktorsavhandling(data: any): boolean {
  for (const attribut of data.Attributvarden) {
    if (attribut.Attributdefinition.Kod === "utbildning.attribut.kod"
      && doctoralThesisCodes.includes(attribut.Varden[0])) {
      return true;
    }
  }

  return false;
}

const licThesisCodes = [
  "LICABE",
  "LICABE10",
  "LICCBH",
  "LICEECS",
  "LICITM",
  "LICITM10",
  "LICSCI",
];

export function isLicentiatuppsats(data: any): boolean {
  for (const attribut of data.Attributvarden) {
    if (attribut.Attributdefinition.Kod === "utbildning.attribut.kod"
      && licThesisCodes.includes(attribut.Varden[0])) {
      return true;
    }
  }

  return false;
}

export const exchangeCourseCodes = [
  "UTBSAM",
  "UTHTDA",
  "UTHTJ",
  "UTHTM",
  "UTHTS",
  "UTHTTA",
  "UTVTDA",
  "UTVTJ",
  "UTVTM",
  "UTVTS",
  "UTVTTA",
];

export function isUtbytesinstans(data: any): boolean {
  for (const attribut of data.Attributvarden) {
    if (attribut.Attributdefinition.Kod === "utbildning.attribut.kod"
      && exchangeCourseCodes.includes(attribut.Varden[0])
    ) {
      return true;
    }

    if (attribut.Attributdefinition.Kod === "utbildning.attribut.engelsk.benamning"
      && attribut.Varden[0] === "Exchange load"
    ) {
      return true;
    }
  }

  return false;
}

export function isUtbytesstudent(data: any): boolean {
  for (const attribut of data.Attributvarden) {
    if (!Array.isArray(attribut.GrupperadeVarden)) continue;

    for (const grupperatVarde of attribut.GrupperadeVarden) {
      if (!Array.isArray(grupperatVarde.Varden)) continue;

      for (const varde of grupperatVarde.Varden) {
        if (varde.Attributdefinition.Kod !== "utbildning.attribut.markningsnyckel.kod") continue;

        if (varde.Varden[0] === "UTBSTUD") {
          return true;
        }
      }
    }
  }

  return false;
}

export function isUppdragsutbildning(data: any): boolean {
  for (const attribut of data.Attributvarden) {
    if (!Array.isArray(attribut.GrupperadeVarden)) continue;

    for (const grupperatVarde of attribut.GrupperadeVarden) {
      if (!Array.isArray(grupperatVarde.Varden)) continue;

      for (const varde of grupperatVarde.Varden) {
        if (varde.Attributdefinition.Kod !== "utbildningstyp.studieordning.utbildningsform.kod") continue;

        if (varde.Varden[0] === "UP") {
          return true;
        }
      }
    }
  }

  return false;
}

const deprecatedStudyRules = [
  "HÖ07"
];

export function isGammalStudieordning(data: any): boolean {
  for (const attribut of data.Attributvarden) {
    if (!Array.isArray(attribut.GrupperadeVarden)) continue;

    for (const grupperatVarde of attribut.GrupperadeVarden) {
      if (!Array.isArray(grupperatVarde.Varden)) continue;

      for (const varde of grupperatVarde.Varden) {
        if (varde.Attributdefinition.Kod !== "utbildningstyp.studieordning.kod") continue;

        if (deprecatedStudyRules.includes(varde.Varden[0].toUpperCase())) {
          return true;
        }
      }
    }
  }

  return false;
}

