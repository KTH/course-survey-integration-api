import {
  getKursinstans,
  getKurstillfalle,
  getKurstillfallesdeltagande,
  getOrganisation,
  getStudiestruktur,
  getUtbildningsinstans,
  getUtbildningstillfalle,
} from "./api";
import {
  diffTerms,
  findStudiestruktur,
  getGradingScheme,
  getTermFromDate,
  isDoktorsavhandling,
  isKurspaketering,
  isUppdragsutbildning,
  isUtbytesinstans,
  isUtbytesstudent,
  parseOrganisation,
} from "./utils";

export { getGradingScheme } from "./utils";

export type ProgramParticipation =
  | undefined
  | {
      code: string;
      name: { sv: string; en: string };
      startTerm: string;
      studyYear: number;
      specialization:
        | undefined
        | {
            code: string;
            name: { sv: string; en: string };
          };
    };

type TMultiLang = {
  sv?: string;
  en?: string;
};

type TGradingScheme = {
  code: string;
  grades: Array<{
    validFinalGrade: boolean;
    code: string;
  }>;
};

export type TGetCourseRoundInformation = {
  name: TMultiLang;
  courseCode: string;
  organisation: {
    code: string;
  };
  organisationUnit: {
    code: string;
    name: TMultiLang;
  };
  courseInstanceCode: string;
  startDate: string;
  endDate: string;
  credits: number;
  modules: Array<{
    code: string;
    name: TMultiLang;
    credits: number;
    gradingScheme: TGradingScheme;
  }>;
  gradingScheme: TGradingScheme;
};

export type TGetEduInstance = {
  ladokUID: string;
  isCoursePackage: boolean;
  isDoctoralThesis: boolean;
  isExchangeCourse: boolean;
  isExchangeStudent: boolean;
  isIndustrialEdu: boolean;
}

export type TGetCourseRoundLanguage = {
  language: "sv" | "en";
}

export async function getCourseRoundLanguage(
  utbildningstillfalleUid: string,
): Promise<TGetCourseRoundLanguage> {
  const utbildningstillfalle = await getUtbildningstillfalle(utbildningstillfalleUid);
  const langAttr = utbildningstillfalle.Attributvarden.find(a => a.Namn === "utbildning.attribut.undervisningssprak");
  return {
    language: langAttr?.Varde === "1" ? "sv" : "en",
  };
}

/** Get course round information from its Ladok UID */
export async function getCourseRoundInformation(
  ladokUid: string,
): Promise<TGetCourseRoundInformation> {
  const kurstillfalle = await getKurstillfalle(ladokUid);
  const kursinstans = await getKursinstans(kurstillfalle.UtbildningsinstansUID);
  const organisation = parseOrganisation(
    await getOrganisation(kursinstans.OrganisationUID),
  );

  return {
    name: kurstillfalle.Benamning,
    courseCode: kurstillfalle.Utbildningskod,
    courseInstanceCode: kurstillfalle.Kurstillfalleskod,
    startDate: kurstillfalle.Startdatum,
    endDate: kurstillfalle.Slutdatum,
    organisation: organisation.school,
    organisationUnit: organisation.department,
    credits: kurstillfalle.Omfattning,
    modules: kurstillfalle.IngaendeMoment.map((m) => ({
      code: m.Utbildningskod,
      name: m.Benamning,
      credits: m.Omfattning,
      gradingScheme: getGradingScheme(m.BetygsskalaID),
    })),

    // TODO: Extract the information from kurstillfalle.BetygsskalaID
    gradingScheme: getGradingScheme(kurstillfalle.BetygsskalaID),
  };
}

export async function getEduInstance(ladokUid: string): Promise<TGetEduInstance> {
  // Course packages don't have kurstillfalle, otherwise that would have been a
  // nicer endpoint.
  const utbtillfalle = await getUtbildningstillfalle(ladokUid);
  const utbinstans = await getUtbildningsinstans(utbtillfalle.UtbildningsinstansUID);
  const isCoursePackage = isKurspaketering(utbinstans);
  const isDoctoralThesis = isDoktorsavhandling(utbinstans);
  const isExchangeCourse = isUtbytesinstans(utbinstans);
  const isExchangeStudent = isUtbytesstudent(utbinstans);
  const isIndustrialEdu = isUppdragsutbildning(utbinstans);

  return {
    ladokUID: ladokUid,
    isCoursePackage,
    isDoctoralThesis,
    isExchangeCourse,
    isExchangeStudent,
    isIndustrialEdu,
  };
}

/**
 * Get all programs that include the course round where a student is participating
 */
export async function getProgramParticipation(
  studentUID: string,
  courseRoundUID: string,
): Promise<ProgramParticipation> {
  const d = await getKurstillfallesdeltagande(studentUID);
  const d1 = d.Tillfallesdeltaganden.find(
    (t) => t.Utbildningsinformation.UtbildningstillfalleUID === courseRoundUID,
  );

  if (!d1 || !d1.Studiestrukturreferens) {
    // OK. The course round does not belong to any program
    return undefined;
  }

  if (d1.Utbildningsinformation.Utbildningskod === "UTVTS") {
    // This is part of a study exchange, not a specific program
    // FIX https://kth-se.atlassian.net/browse/FOE-418
    return undefined;
  }

  const s = await getStudiestruktur(studentUID);
  const arr = findStudiestruktur(d1.Studiestrukturreferens, s.Studiestrukturer);

  if (arr.length === 0) {
    throw new Error(
      `The student [${studentUID}] participates in course round [${courseRoundUID}] which has a "strukturreferens" [${d1.Studiestrukturreferens}], but there is no program with such "studiestrukturreferens"`,
    );
  }

  const courseRoundStartTerm = getTermFromDate(
    d1.Utbildningsinformation.Studieperiod.Startdatum,
  );
  const program = arr[0];
  const programStartTerm = getTermFromDate(
    program.Utbildningsinformation.Studieperiod.Startdatum,
  );
  const diff = diffTerms(courseRoundStartTerm, programStartTerm);
  const studyYear = Math.floor(diff / 2) + 1;
  const programData = {
    code: program.Utbildningsinformation.Utbildningskod,
    name: program.Utbildningsinformation.Benamning,
    startTerm: programStartTerm,
    studyYear,
    specialization: undefined,
  };

  if (arr.length === 1) {
    return programData;
  }

  const specialization = arr[1];
  const specializationData = {
    code: specialization.Utbildningsinformation.Utbildningskod,
    name: specialization.Utbildningsinformation.Benamning,
  };

  if (arr.length === 2) {
    return {
      ...programData,
      specialization: specializationData,
    };
  }

  throw new Error(
    `The student [${studentUID}] participates in course round [${courseRoundUID}], which is related to a "kurspaketering" with ${arr.length} levels (expected a maximum of two: program and specialization)`,
  );
}
