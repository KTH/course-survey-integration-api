import { TUgUser, TUgSchool } from "ug-integration";
import { TCourseUser, TOrgEntity } from "../interface";

export function _convert(ugUser: TUgUser): TCourseUser {
  const email = ugUser.email;
  const userName = email?.split('@')[0];
  const kthUserId = ugUser.kthid;
  const fullName = [
    ugUser.givenName ?? '',
    ugUser.surname ?? ''
  ].join(' ').trim();

  return {
    userName,
    kthUserId,
    email,
    fullName
  };
}

export function convertUgToCourseUser(ugUser: TUgUser | undefined): TCourseUser | undefined {
  if (ugUser === undefined) return undefined;
  return _convert(ugUser);
}

export function convertUgToCourseUserArr(ugUser: (TUgUser | undefined)[] | undefined):  TCourseUser[] {
  if (Array.isArray(ugUser)) {
    return (ugUser.filter(o => o) as TUgUser[]).map(_convert);
  }
  return [];
}

export function convertUgSchoolToOrgEntity(ugSchool: TUgSchool | undefined, schoolCode: string, lang: 'en' | 'sv'): TOrgEntity {
  return {
    displayName: ugSchool?.description[lang] ?? '',
    displayCode: schoolCode.toUpperCase(),
    kthId: ugSchool?.kthid ?? '',
  };
}

export function convertLadokModuleToCourseModule(ladokModule: any, lang: string): any {
  const gradingDistribution = ladokModule.gradingScheme?.grades?.reduce((val: any, curr: any) => {
    return {
      ...val,
      [curr.code]: -1,
    };
  }, {});

  return {
    _reportedResults: {},
    code: ladokModule.code,
    name: ladokModule.name?.[lang],
    credits: ladokModule.credits,
    gradingScheme: Object.keys(gradingDistribution ?? {}),
    nrofReportedResults: 0, // TODO: Calculated field
    gradingDistribution, // TODO: Calculated field
  };
}