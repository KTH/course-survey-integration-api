import { UgUser, checkGetUgCourseResponsibleAndTeachers } from "./types";
import { UGRestClient, UGRestClientError } from "./ugRestClient";
import { ZodError, ZodObject, ZodRawShape } from "zod";

const {
  OAUTH_SERVER_BASE_URI,
  UG_REST_API_BASEURL,
  UG_REST_API_CLIENT_ID,
  UG_REST_API_CLIENT_SECRET,
} = process.env;

const ugClient = new UGRestClient({
  authServerDiscoveryURI: OAUTH_SERVER_BASE_URI ?? '',
  resourceBaseURI: UG_REST_API_BASEURL ?? '',
  clientId: UG_REST_API_CLIENT_ID ?? '',
  clientSecret: UG_REST_API_CLIENT_SECRET ?? '',
});

export type TUgCourseResponsibleAndTeachers = [
  courseResponsible: string,
  courseTeachers: string[],
]

export async function getUgCourseResponsibleAndTeachers(courseCode: string, roundYear: string, roundCode: string | number): Promise<TUgCourseResponsibleAndTeachers | []> {
  const prefix = courseCode.slice(0, 2);
  const path = `edu.courses.${prefix}.${courseCode}.${roundYear}${roundCode}`

  // The course can have several parallel sections so we need to get all of them
  // Example: edu.courses.SF.SF1625.20222

  // TODO: I can't get the subgroups from the query so I can't iterate over the sections
  const { data, json, statusCode } =
    (await ugClient
      .get<any[]>(
        `groups?$filter=startswith(name,'${path}')` // &$expand=Subgroups
      )
      .catch(ugClientGetErrorHandler)) ?? <any>{};
  if (statusCode !== 200) {
    throw new Error(`UGRestClient: ${statusCode} ${data}`);
  }

  if (json === undefined) return [];

  const courseResonsible = json
    .filter((group: any) => group.name.endsWith('courseresponsible'))
    .reduce((val: string | undefined, curr: any) => val ?? curr.members.pop(), undefined);
  const courseTeachers = json
    .filter((group: any) => group.name.endsWith('teachers'))
    .reduce((val: string[], curr: any) => {
      // Add only unique values
      return [...val, ...curr.members.filter((m: any) => !val.includes(m))]
    }, []);    

  // This will throw if values are incorrect
  // TODO: Investigate if zod can be used here too
  // TODO: Improve error handling to level of ladok-integration
  checkGetUgCourseResponsibleAndTeachers([courseResonsible, courseTeachers]);

  return [
    courseResonsible,
    courseTeachers,
  ];
}

export type TUgUser = {
  email: string;
  kthid: string;
  givenName: string;
  surname: string;
}

export async function getUgUser(kthId: string | undefined): Promise<TUgUser | undefined>  {
  if (kthId === undefined) return;

  const { data, json, statusCode } =
    (await ugClient
      .get<TUgUser[]>(
        // `groups?$filter=name eq 'edu.courses.SF.SF1625.20222'`
        `users?$filter=kthid eq '${kthId}'`
      )
      .catch(ugClientGetErrorHandler)) ?? <any>{};

  if (json === undefined) return;

  const outp = json.pop();

  // Type-check with zod, throws error if values are incorrect
  // TODO: Improve error handling to level of ladok-integration
  UgUser.parse(outp)

  return outp;
}

function ugClientGetErrorHandler(err: any): never {
  if (err instanceof UGRestClientError) {
    throw err;
  }

  Error.captureStackTrace(err, ugClientGetErrorHandler);
  throw err;
}