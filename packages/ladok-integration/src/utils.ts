import type { z } from "zod";
import { LadokOrganisation } from "./types";

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
