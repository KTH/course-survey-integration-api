import { getKursinstans, getKurstillfalle, getOrganisation } from "./api";

/** Get course round information from its Ladok UID */
export async function getCourseRoundInformation(ladokUid: string) {
  const kurstillfalle = await getKurstillfalle(ladokUid);
  const kursinstans = await getKursinstans(kurstillfalle.UtbildningsinstansUID);
  const organisation = await getOrganisation(kursinstans.OrganisationUID);

  return {
    name: kurstillfalle.Benamning,
    courseCode: kurstillfalle.Utbildningskod,
    organisation: {
      // TODO: Extract the school code from the "organisation" object
      code: "",
    },
    organisationUnit: {
      code: organisation.Organisationskod,
    },
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
