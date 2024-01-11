type TParams = {
  name: string;
  courseCode: string;
  organisation: string;
  organisationUnit: string;
  credits: string;
  modules: Array<{
    code: string;
    name: string;
    credits: string;
  }>;
  gradingScheme: Array<{
    code: string;
    grades: Array<{
      validFinalGrade: boolean;
      code: string;
    }>;
  }>;
}

const _mockedValues: Record<string, TParams> = {};

export class KoppsIntegrationMock {
  static getCourseRoundInformation(ladokUid: string, params: TParams) {
    if (_mockedValues[ladokUid]) throw new Error(`Mock value already registered for ${ladokUid}`);

    _mockedValues[ladokUid] = params;
  }
}


export async function getCourseRoundInformation(ladokUid: string) {
  const { name, courseCode, organisation, organisationUnit, credits, modules, gradingScheme } = _mockedValues[ladokUid];
  return {
    name,
    courseCode,
    organisation,
    organisationUnit,
    credits,
    modules,
    gradingScheme,
  };
}