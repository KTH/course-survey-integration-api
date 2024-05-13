import * as crypto from "crypto";
import { TUgUser, TUgSchool } from "ug-integration";
import { TCourseUser, TOrgEntity } from "../interface";

export function _convert(ugUser: TUgUser): TCourseUser {
  const email = ugUser.email;
  const userName = email.split("@")[0];
  const kthUserId = ugUser.kthid;
  const fullName = [ugUser.givenName, ugUser.surname].join(" ").trim();

  return {
    userName,
    kthUserId,
    email,
    fullName,
  };
}

export function convertUgUsersToCourseUsers(
  ugUser: (TUgUser | undefined)[],
): TCourseUser[] {
  return (ugUser.filter((o) => o) as TUgUser[]).map(_convert);
}

export function convertUgSchoolToOrgEntity(
  ugSchool: TUgSchool | undefined,
  schoolCode: string,
  lang: "en" | "sv",
): TOrgEntity {
  return {
    displayName: ugSchool?.description[lang] ?? "",
    displayCode: schoolCode.toUpperCase(),
    kthId: ugSchool?.kthid ?? "",
  };
}

export function convertLadokModuleToCourseModule(
  ladokModule: any,
  lang: string,
): any {
  const gradingDistribution = ladokModule.gradingScheme?.grades?.reduce(
    (val: any, curr: any) => {
      return {
        ...val,
        [curr.code]: -1,
      };
    },
    {},
  );

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

export async function hashStudentId(studentId: string): Promise<string> {
  // TODO: For this to be secure we need to add a secret salt that is not stored in the code.
  const hash = crypto.createHash("sha256");

  return new Promise((resolve, reject) => {
    hash.on("error", (err) => {
      reject(err);
    });

    hash.on("readable", () => {
      // Only one element is going to be produced by the
      // hash stream.
      const data = hash.read();
      if (data) {
        const hash = data.toString("hex");
        resolve(hash);
        // Prints:
        //   6a2da20943931e9834fc12cfe5bb47bbd9ae43489a30726962b576f4e3993e50
      }
    });

    hash.write(studentId);

    hash.end();
  });
}


export function convertToCourseInstanceArchivingCode(
  ladokCourseRoundInfo: { courseCode: string, courseInstanceCode: string },
  koppsInfo: { round: { startTerm: string, ladokRoundId?: string } },
) {
  const [startYear, termNr] = [koppsInfo?.round?.startTerm.slice(2, 4), koppsInfo?.round?.startTerm.slice(4, 5)];
  const startTerm = termNr === "1" ? "HT" : "VT";
  return `${ladokCourseRoundInfo?.courseCode} ${startTerm}${startYear} ${koppsInfo?.round.ladokRoundId || ladokCourseRoundInfo?.courseInstanceCode}`;
}

/**
 * Extracts the start term from an archiving code converted by convertToCourseInstanceArchivingCode.
 * TODO: Write a test that makes sure that if convertToCourseInstanceArchivingCode is changed, this is too.
 */
export function startTermFromArchivingCode(archivingCode: string): string {
  // The archiving code is formatted as: "SF1625 HT23 51210"
  const [ _courseCode, startTerm, _courseInstanceCode ] = archivingCode?.split(" ") ?? [];
  return startTerm;
}

