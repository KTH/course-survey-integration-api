import { TUgSchool, TUgUser } from ".";

const _mockedValues: {
  getUgMembers: Record<string, string[]>;
  getUgCourseResponsible: Record<string, string[]>;
  getUgCourseTeachers: Record<string, string[]>;
  getUgCourseExaminers: Record<string, string[]>;
  getUgUser: Record<string, TUgUser>;
  getUgSchool: Record<string, TUgSchool>;
  getUgUserByLadokId: Record<string, TUgUser>;
} = {
  getUgMembers: {},
  getUgCourseResponsible: {},
  getUgCourseTeachers: {},
  getUgCourseExaminers: {},
  getUgUser: {},
  getUgSchool: {},
  getUgUserByLadokId: {},
};

export class UgIntegrationMock {
  static getUgMembers(groupName: string, params: string[]) {
    const mocked = _mockedValues.getUgMembers;
    if (mocked[groupName])
      throw new Error(`Mock value already registered for ${groupName}`);

    return (mocked[groupName] = params);
  }

  static getUgCourseResponsible(
    courseCode: string,
    roundYear: string,
    roundCode: string,
    params: string[],
  ) {
    const mocked = _mockedValues.getUgCourseResponsible;
    const key = `${courseCode}-${roundYear}-${roundCode}`;
    if (mocked[key])
      throw new Error(`Mock value already registered for ${key}`);
    mocked[key] = params;
  }

  static getUgCourseTeachers(
    courseCode: string,
    roundYear: string,
    roundCode: string,
    params: string[],
  ) {
    const mocked = _mockedValues.getUgCourseTeachers;
    const key = `${courseCode}-${roundYear}-${roundCode}`;
    if (mocked[key])
      throw new Error(`Mock value already registered for ${key}`);
    mocked[key] = params;
  }

  static getUgCourseExaminers(courseCode: string, params: string[]) {
    const mocked = _mockedValues.getUgCourseExaminers;
    if (mocked[courseCode])
      throw new Error(`Mock value already registered for ${courseCode}`);
    mocked[courseCode] = params;
  }

  static getUgUser(kthId: string, params: TUgUser) {
    const mocked = _mockedValues.getUgUser;
    if (mocked[kthId])
      throw new Error(`Mock value already registered for ${kthId}`);

    mocked[kthId] = params;
  }

  static getUgSchool(schoolCode: string, params: TUgSchool) {
    const mocked = _mockedValues.getUgSchool;
    if (mocked[schoolCode])
      throw new Error(`Mock value already registered for ${schoolCode}`);

    mocked[schoolCode] = params;
  }

  static getUgUserByLadokId(ladokId: string, params: TUgUser) {
    const mocked = _mockedValues.getUgUserByLadokId;
    if (mocked[ladokId])
      throw new Error(`Mock value already registered for ${ladokId}`);

    mocked[ladokId] = params;
  }
}

export async function getUgMembers(groupName: string) {
  return _mockedValues.getUgMembers[groupName];
}

export async function getUgCourseResponsible(
  courseCode: string,
  roundYear: string,
  roundCode: string,
) {
  const key = `${courseCode}-${roundYear}-${roundCode}`;
  return _mockedValues.getUgCourseResponsible[key];
}

export async function getUgCourseTeachers(
  courseCode: string,
  roundYear: string,
  roundCode: string,
) {
  const key = `${courseCode}-${roundYear}-${roundCode}`;
  return _mockedValues.getUgCourseTeachers[key];
}

export async function getUgCourseExaminers(courseCode: string) {
  return _mockedValues.getUgCourseExaminers[courseCode];
}

export async function getUgUser(
  kthId: string | undefined,
): Promise<TUgUser | undefined> {
  if (kthId === undefined) return;
  return _mockedValues.getUgUser[kthId];
}

export async function getUgUserByLadokId(
  ladokId: string,
): Promise<TUgUser | undefined> {
  return _mockedValues.getUgUserByLadokId[ladokId];
}

export async function getUgSchool(
  schoolCode: string,
): Promise<TUgSchool | undefined> {
  return _mockedValues.getUgSchool[schoolCode];
}
