import {
  getKursinstans,
  getKurstillfalle,
  getKurstillfallesdeltagande,
  getOrganisation,
  getStudiestruktur,
} from "./api";
import { getGradingScheme, parseOrganisation } from "./utils";

type TMultiLang = {
  sv?: string;
  en?: string;
}

type TGradingScheme = {
  code: string;
  grades: Array<{
    validFinalGrade: boolean;
    code: string;
  }>
};

export type TGetCourseRoundInformation = {
  name: TMultiLang;
  courseCode: string;
  organisation: {
    code: string;
  };
  organisationUnit: {
    code: string;
    name: TMultiLang
  };
  courseInstanceCode: string;
  startDate: string;
  endDate: string;
  credits: number;
  modules: Array<{
    code: string;
    name: TMultiLang;
    credits: number;
    gradingScheme: TGradingScheme
  }>;
  gradingScheme: TGradingScheme
}

/** Get course round information from its Ladok UID */
export async function getCourseRoundInformation(ladokUid: string): Promise<TGetCourseRoundInformation> {
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

/**
 * Get all programs that include the course round where a student is participating
 * Returns null if:
 * - the course round is not part of any program
 * - the student is not taking the course round as part of any program
 */
export async function getProgramParticipation(
  studentUID: string,
  courseRoundUID: string,
) {
  const allaDeltagande = await getKurstillfallesdeltagande(studentUID);
  const deltagande = allaDeltagande.Tillfallesdeltaganden.find(
    (t) => t.Utbildningsinformation.UtbildningstillfalleUID === courseRoundUID,
  );

  if (!deltagande?.Studiestrukturreferens) {
    return null;
  }

  if (deltagande.Studiestrukturreferens) {
    const allaStruktur = await getStudiestruktur(studentUID);
    const struktur = allaStruktur.Studiestrukturer.find(
      (s) => s.Referens === deltagande.Studiestrukturreferens,
    );

    if (!struktur) {
      // This is an error.
      return null;
    }

    return {
      code: struktur.Utbildningsinformation.Utbildningskod,
      name: struktur.Utbildningsinformation.Benamning,
    };
  }
}
