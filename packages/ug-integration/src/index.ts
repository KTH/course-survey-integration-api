import { z } from "zod";
import { UgGroups, UgSchool, UgUser } from "./types";
import { UGRestClient, UGRestClientError } from "./ugRestClient";

const {
  OAUTH_SERVER_BASE_URI,
  UG_REST_API_BASEURL,
  UG_REST_API_CLIENT_ID,
  UG_REST_API_CLIENT_SECRET,
} = process.env;

const ugClient = new UGRestClient({
  authServerDiscoveryURI: OAUTH_SERVER_BASE_URI ?? "",
  resourceBaseURI: UG_REST_API_BASEURL ?? "",
  clientId: UG_REST_API_CLIENT_ID ?? "",
  clientSecret: UG_REST_API_CLIENT_SECRET ?? "",
});

export async function getUgMembers(groupName: string) {
  const { data, json, statusCode } = await ugClient
    .get<unknown>(`groups?$filter=name eq '${groupName}'`)
    .catch(ugClientGetErrorHandler);

  if (statusCode !== 200) {
    throw new Error(`UGRestClient: ${statusCode} ${data}`);
  }

  const groups = UgGroups.parse(json);

  if (groups.length === 0) {
    // throw new Error(`UGRestClient: group [${groupName}] not found`);
    // The school will be informed by other systems that this course is missing members so
    // we don't need to throw an error here. https://kth-se.atlassian.net/browse/FOE-412
    return [];
  }

  if (groups.length > 1) {
    throw new Error(
      `UGRestClient: there are ${groups.length} groups with name [${groupName}] (expected one)`,
    );
  }

  return groups[0].members;
}

export async function getUgCourseResponsible(
  courseCode: string,
  roundYear: string,
  roundCode: string,
) {
  const prefix = courseCode.slice(0, 2);
  const path = `edu.courses.${prefix}.${courseCode}.${roundYear}.${roundCode}.courseresponsible`;

  return getUgMembers(path);
}

export async function getUgCourseTeachers(
  courseCode: string,
  roundYear: string,
  roundCode: string,
) {
  const prefix = courseCode.slice(0, 2);
  const path = `edu.courses.${prefix}.${courseCode}.${roundYear}.${roundCode}.teachers`;

  return getUgMembers(path);
}

/** Return the KTH ID of examiners for a course */
export async function getUgCourseExaminers(
  courseCode: string,
): Promise<string[]> {
  const prefix = courseCode.slice(0, 2);
  const path = `edu.courses.${prefix}.${courseCode}.examiner`;

  return getUgMembers(path);
}

export type TUgUser = z.infer<typeof UgUser>;

export async function getUgUser(kthId: string): Promise<TUgUser | undefined> {
  const { data, json, statusCode } = await ugClient
    .get<TUgUser[]>(`users?$filter=kthid eq '${kthId}'`)
    .catch(ugClientGetErrorHandler);

  if (json === undefined) return;

  return UgUser.parse(json.pop());
}

export async function getUgUserByLadokId(
  ladokId: string,
): Promise<TUgUser | undefined> {
  const { data, json, statusCode } = await ugClient
    .get<TUgUser[]>(
      // `groups?$filter=name eq 'edu.courses.SF.SF1625.20222'`
      `users?$filter=ladok3StudentUid eq '${ladokId}'`,
    )
    .catch(ugClientGetErrorHandler);

  if (json === undefined) return;

  return UgUser.parse(json.pop());
}

function ugClientGetErrorHandler(err: any): never {
  // function ugClientGetErrorHandler(err: any) {
  if (err instanceof UGRestClientError) {
    throw err;
  }

  Error.captureStackTrace(err, ugClientGetErrorHandler);
  throw err;
}

export type TUgSchool = {
  name: string;
  kthid: string;
  description: {
    en?: string;
    sv?: string;
  };
};

export async function getUgSchool(
  schoolCode: string,
): Promise<TUgSchool | undefined> {
  const { data, json, statusCode } = await ugClient
    .get<TUgSchool[]>(
      // `groups?$filter=name eq 'edu.courses.SF.SF1625.20222'`
      `groups?$filter=name eq 'pa.org.${schoolCode.toUpperCase()}'`,
    )
    .catch(ugClientGetErrorHandler);

  const res = Array.isArray(json) ? json.pop() : undefined;

  if (res === undefined) {
    throw new Error(
      `UGRestClient: the search for pa.org.${schoolCode.toUpperCase()} returned "${json}" (expected array of objects)`,
    );
  }

  return UgSchool.parse(res);
}
