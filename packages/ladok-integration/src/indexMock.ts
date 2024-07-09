import { ProgramParticipation, TGetCourseRoundInformation, TGetCourseRoundLanguage, TGetEduInstance } from ".";

// This doesn't require mocking
export { getGradingScheme } from "../src";

const _mockedValues: Record<
  string,
  TGetCourseRoundInformation | ProgramParticipation | TGetCourseRoundLanguage | TGetEduInstance
> = {};

export class LadokIntegrationMock {
  static getCourseRoundLanguage(
    ladokUid: string,
    params: TGetCourseRoundLanguage,
  ) {
    const key = `${ladokUid}-language`;
    if (_mockedValues[key])
      throw new Error(`Mock value already registered for ${key}`);

    _mockedValues[key] = params;
  }

  static getCourseRoundInformation(
    ladokUid: string,
    params: TGetCourseRoundInformation,
  ) {
    if (_mockedValues[ladokUid])
      throw new Error(`Mock value already registered for ${ladokUid}`);

    _mockedValues[ladokUid] = params;
  }

  static getProgramParticipation(
    studentUID: string,
    courseRoundUID: string,
    params: ProgramParticipation,
  ) {
    const key = [studentUID, courseRoundUID].join("-");
    if (_mockedValues[key])
      throw new Error(`Mock value already registered for ${key}`);

    _mockedValues[key] = params;
  }

  static getEduInstance(ladokUid: string,
    params: {
      ladokUID: string,
      isCoursePackage: boolean,
      isDoctoralThesis: boolean,
      isExchangeCourse: boolean,
      isExchangeStudent: boolean,
      isIndustrialEdu: boolean,
      isLicPaper: boolean,
      isDeprecatedStudyOrder: boolean,
    }) {
    if (_mockedValues[ladokUid])
      throw new Error(`Mock value already registered for ${ladokUid}`);

    _mockedValues[ladokUid] = params;
  }
}

export async function getCourseRoundLanguage(utbildningstillfalleUid: string) {
  return _mockedValues[`${utbildningstillfalleUid}-language`];
}


export async function getCourseRoundInformation(ladokUid: string) {
  return _mockedValues[ladokUid];
}

export async function getProgramParticipation(
  studentUID: string,
  courseRoundUID: string,
) {
  return _mockedValues[[studentUID, courseRoundUID].join("-")];
}

export async function getEduInstance(ladokUid: string) {
  return _mockedValues[ladokUid];
}
