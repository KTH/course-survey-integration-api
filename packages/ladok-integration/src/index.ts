import { getKursinstans, getKurstillfalle, getOrganisation } from "./api";
import { parseOrganisation } from "./utils";

/** Get course round information from its Ladok UID */
export async function getCourseRoundInformation(ladokUid: string) {
  const kurstillfalle = await getKurstillfalle(ladokUid);
  const kursinstans = await getKursinstans(kurstillfalle.UtbildningsinstansUID);
  const organisation = parseOrganisation(
    await getOrganisation(kursinstans.OrganisationUID),
  );

  return {
    name: kurstillfalle.Benamning,
    courseCode: kurstillfalle.Utbildningskod,
    organisation: organisation.school,
    organisationUnit: organisation.department,
    credits: kurstillfalle.Omfattning,
    modules: kurstillfalle.IngaendeMoment.map((m) => ({
      code: m.Utbildningskod,
      name: m.Benamning,
      credits: m.Omfattning,
    })),

    // TODO: Extract the information from kurstillfalle.BetygsskalaID
    gradingScheme: {},
  };
}
