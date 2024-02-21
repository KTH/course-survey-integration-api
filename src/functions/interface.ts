import { paths, components } from "../__generated__/_interface";
// # API Interface
// To generate the _interface.ts file, run: `npm run generate-types`
// in the root of the project.

// ## Entities
export type TCourseRound = components["schemas"]["CourseRound"] & {
  /**
   * Add each reported result using composite key to allow for updates.
   * key: `TBD`
   */
  _gradingScheme: string[]; // Support to calculate grading distribution, currently not shown in report
};
export type TStudentParticipation =
  components["schemas"]["StudentParticipation"];
export type TProgramRound = components["schemas"]["ProgramRound"];
export type TCourseModule = components["schemas"]["CourseModule"];
export type TCourseUser = components["schemas"]["CourseUser"];
export type TOrgEntity = components["schemas"]["OrgEntity"];

// ## Errors
type TAPIErrType = "NotFound" | "BadRequest" | "InternalServerError";
// - API Error Payload Type:
export type TApiError = {
  statusCode: number;
  name?: string;
  type?: string;
  message: string;
  details?: string;
};

// ## Endpoints
export type PathCourseRoundList = paths["/course-round"];
export type APICourseRoundListErrType = TAPIErrType;
export type APICourseRoundList = TCourseRound[];

export type PathCourseRound = paths["/course-round/{ladokRoundId}"];
export type APICourseRoundErrType = TAPIErrType;
export type APICourseRound = TCourseRound;

export type PathCourseRoundStudentList =
  paths["/course-round/{ladokRoundId}/students"];
export type APICourseRoundStudentListErrType = TAPIErrType;
export type APICourseRoundStudentList = TStudentParticipation[];

/**
 * Domain entities stored in DB
 */

export type TCourseRoundModuleEntity = {
  id: TCourseModule["id"];
  code: TCourseModule["code"];
  name: TCourseModule["name"];
  credits: TCourseModule["credits"];
  gradingScheme: TCourseModule["gradingScheme"];
};

export type TCourseRoundEntity = {
  language: TCourseRound["language"];
  canceled: TCourseRound["canceled"];
  institution: TCourseRound["institution"];
  period: TCourseRound["period"];
  courseExaminor: TCourseRound["courseExaminor"];

  // Source event message:
  id: TCourseRound["id"];
  ladokCourseId: TCourseRound["ladokCourseId"];
  ladokCourseRoundId: TCourseRound["ladokCourseRoundId"];
  canvasSisId: TCourseRound["canvasSisId"];

  // Source KOPPS API:
  name: TCourseRound["name"];
  courseGoal: TCourseRound["courseGoal"];

  // Source UG:
  organization: TCourseRound["organization"];
  courseResponsible: TCourseRound["courseResponsible"];
  courseTeachers: TCourseRound["courseTeachers"];

  // Source LADOK REST API:
  _gradingScheme: string[];
  courseCode: TCourseRound["courseCode"];
  endDate: TCourseRound["endDate"];
  displayYear: TCourseRound["displayYear"];
  credits: TCourseRound["credits"];
  modules: TCourseRoundModuleEntity[];
};

export type TReportedResultEntity = {
  id: string;
  parentId: string; // UtbildningsinstansUID
  hashedStudentId: string; // StudentUID hashed
  decision: string; // BeslutUID
  result: string; // Calculated from BetygsgradID and BetygsskalaID
  metaData: {
    HandelseUID: string;
    BetygsgradID: number;
    BetygsskalaID: number;
    ResultatUID: string;
  };
};
