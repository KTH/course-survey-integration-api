import { TUgCourseResponsibleAndTeachers, TUgSchool, TUgUser } from ".";

const _mockedValues: {
  getUgCourseResponsibleAndTeachers: Record<string, TUgCourseResponsibleAndTeachers>;
  getUgUser: Record<string, TUgUser>;
  getUgSchool: Record<string, TUgSchool>;
} = {
  getUgCourseResponsibleAndTeachers: {},
  getUgUser: {},
  getUgSchool: {},
};

export class UgIntegrationMock {
  static getUgCourseResponsibleAndTeachers(courseCode: string, roundYear: string, roundCode: string | number, params: TUgCourseResponsibleAndTeachers) {
    const key = [courseCode, roundYear, roundCode].join('-');
    const mocked = _mockedValues.getUgCourseResponsibleAndTeachers;
    if (mocked[key]) throw new Error(`Mock value already registered for ${key}`);
  
    mocked[key] = params;
  }

  static getUgUser(kthId: string, params: TUgUser) {
    const mocked = _mockedValues.getUgUser;
    if (mocked[kthId]) throw new Error(`Mock value already registered for ${kthId}`);
  
    mocked[kthId] = params;
  }
}

export async function getUgCourseResponsibleAndTeachers(courseCode: string, roundYear: string, roundCode: string | number): Promise<TUgCourseResponsibleAndTeachers | []> {
  return Promise.resolve(
    _mockedValues.getUgCourseResponsibleAndTeachers[[courseCode, roundYear, roundCode].join('-')]
    ?? [ undefined, [] ]
  );
}

export async function getUgUser(kthId: string | undefined): Promise<TUgUser | undefined>  {
  if (kthId === undefined) return;
  return Promise.resolve(_mockedValues.getUgUser[kthId]);
}

export async function getUgSchool(schoolCode: string): Promise<TUgSchool | undefined> {
  return Promise.resolve(_mockedValues.getUgSchool[schoolCode]);
}
