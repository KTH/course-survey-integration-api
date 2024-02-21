import { TUgSchool, TUgUser } from ".";

const _mockedValues: {
  getUgUser: Record<string, TUgUser>;
  getUgSchool: Record<string, TUgSchool>;
  getUgUserByLadokId: Record<string, TUgUser>;
} = {
  getUgUser: {},
  getUgSchool: {},
  getUgUserByLadokId: {},
};

export class UgIntegrationMock {
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

export async function getUgUser(
  kthId: string | undefined,
): Promise<TUgUser | undefined> {
  if (kthId === undefined) return;
  return _mockedValues.getUgUser[kthId];
}

export async function getUgSchool(
  schoolCode: string,
): Promise<TUgSchool | undefined> {
  return _mockedValues.getUgSchool[schoolCode];
}

export async function getUgUserByLadokId(
  ladokId: string,
): Promise<TUgUser | undefined> {
  return _mockedValues.getUgUserByLadokId[ladokId];
}
