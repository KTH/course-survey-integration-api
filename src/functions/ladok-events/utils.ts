import { TUgUser } from "ug-integration";
import { TCourseUser } from "../interface";

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