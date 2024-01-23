import { TUgUser } from "ug-integration";
import { TCourseUser } from "../interface";

export function _convert(ugUser: TUgUser | undefined): TCourseUser | undefined {
  if (ugUser === undefined) return undefined;

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
  return _convert(ugUser);
}

export function convertUgToCourseUserArr(ugUser: (TUgUser | undefined)[] | undefined):  (TCourseUser | undefined)[] | undefined {
  if (Array.isArray(ugUser)) {
    return ugUser.map(_convert);
  }
  return undefined;
}