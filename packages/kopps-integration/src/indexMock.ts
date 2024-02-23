import { getCourseInformation as origGetCourseInformation } from ".";
import { getPeriods } from "./utils";

type TParams = {
  title: string;
  titleOther: string;
  courseCode: string;
  periods: ReturnType<typeof getPeriods>;
  goals: string;
};

const _mockedValues: Record<string, TParams> = {};

export class KoppsIntegrationMock {
  static getCourseInformation(ladokUid: string, params: TParams) {
    if (_mockedValues[ladokUid])
      throw new Error(`Mock value already registered for ${ladokUid}`);

    _mockedValues[ladokUid] = params;
  }
}

export async function getCourseInformation(ladokUid: string) {
  const { title, titleOther, courseCode, periods, goals } =
    _mockedValues[ladokUid];
  return {
    course: {
      name: {
        sv: title,
        en: titleOther,
      },
      code: courseCode,
    },
    round: {
      startTerm,
      code,
      periods,
    },
    syllabus: {
      goals: goals,
    },
  };
}
