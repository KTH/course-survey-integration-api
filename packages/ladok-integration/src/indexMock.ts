import { TGetCourseRoundInformation } from ".";

const _mockedValues: Record<string, TGetCourseRoundInformation> = {};

export class LadokIntegrationMock {
  static getCourseRoundInformation(ladokUid: string, params: TGetCourseRoundInformation) {
    if (_mockedValues[ladokUid]) throw new Error(`Mock value already registered for ${ladokUid}`);

    _mockedValues[ladokUid] = params;
  }
}


export async function getCourseRoundInformation(ladokUid: string) {
  return _mockedValues[ladokUid];
}