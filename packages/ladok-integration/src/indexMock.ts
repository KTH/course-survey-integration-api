import { ProgramParticipation, TGetCourseRoundInformation, TGetCourseRoundLanguage } from ".";

// This doesn't require mocking
export { getGradingScheme } from "../src";

const _mockedValues: Record<
  string,
  TGetCourseRoundInformation | ProgramParticipation | TGetCourseRoundLanguage
> = {};

export class LadokIntegrationMock {
  static getCourseRoundLanguage(
    ladokUid: string,
    params: TGetCourseRoundLanguage,
  ) {
    if (_mockedValues[ladokUid])
      throw new Error(`Mock value already registered for ${ladokUid}`);

    _mockedValues[ladokUid] = params;
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
}

export async function getCourseRoundLanguage(utbildningstillfalleUid: string) {
  return _mockedValues[utbildningstillfalleUid];
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
