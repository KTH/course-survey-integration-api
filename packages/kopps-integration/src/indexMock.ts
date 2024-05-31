import { getCourseInformation as origGetCourseInformation } from ".";
import { CourseElectiveCondition } from "./types";
import { getPeriods } from "./utils";

type TParams = {
  title: string;
  titleOther: string;
  courseCode: string;
  periods: ReturnType<typeof getPeriods>;
  goals: string;
  startTerm: string;
  code: string;
  electiveConditions: CourseElectiveCondition[];
};

const _mockedValues: Record<string, TParams> = {};

export class KoppsIntegrationMock {
  static getCourseInformation(ladokUid: string, params: TParams) {
    if (_mockedValues[ladokUid])
      throw new Error(`Mock value already registered for ${ladokUid}`);

    _mockedValues[ladokUid] = params;
  }
}

export async function getCourseInformation(
  ladokUid: string,
): Promise<ReturnType<typeof origGetCourseInformation>> {
  const { title, titleOther, courseCode, periods, goals, startTerm, code, electiveConditions } =
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
    electiveConditions,
  };
}
