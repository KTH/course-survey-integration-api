import { ObjectId } from "mongodb";
import { paths, components } from "../__generated__/_interface";
// # API Interface
// To generate the _interface.ts file, run: `npm run generate-types`
// in the root of the project.

// ## API Components
export type TCourseRoundPartial = components["schemas"]["CourseRoundPartial"];
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
export type PathCourseRoundList = paths["/course-rounds"];
export type APICourseRoundListErrType = TAPIErrType;
export type APICourseRoundList = TCourseRoundPartial[];

export type PathCourseRound = paths["/course-rounds/{ladokRoundId}"];
export type APICourseRoundErrType = TAPIErrType;
export type APICourseRound = TCourseRound;

export type PathCourseRoundStudentList =
  paths["/course-rounds/{ladokRoundId}/students"];
export type APICourseRoundStudentListErrType = TAPIErrType;
export type APICourseRoundStudentList = TStudentParticipation[];

/**
 * Domain entities stored in DB
 */

// This is an embedded object
export type TCourseRoundModuleEntity = {
  moduleRoundId: string; // Used to match with credits (TReportedResultEntity)
  code: TCourseModule["code"];
  name: TCourseModule["name"];
  credits: TCourseModule["credits"];
  gradingScheme: TCourseModule["gradingScheme"];
};

// This is an embedded object
export type TProgramRoundEntity = {
  code: TProgramRound["code"];
  startTerm: TProgramRound["startTerm"];
  name: TProgramRound["name"];
  studyYear: TProgramRound["studyYear"];
  specialization?: TProgramRound["specialization"];
  required: TProgramRound["required"];
};

export type TCourseRoundEntity = {
  _id?: string | ObjectId; // Used by document store
  id: string; // Required for DB-layer to work
  language: TCourseRound["language"];
  canceled: TCourseRound["canceled"];
  institution: TCourseRound["institution"];
  periods: TCourseRound["periods"];
  courseExaminers: TCourseRound["courseExaminers"];

  // Source event message:
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
  _id?: string | ObjectId; // Used by document store
  id: string; // Required for DB-layer to work
  parentId: string; // This can belong to a module (UtbildningsinstansId = moduleRoundId) or a course (UtbildningsinstansId = courseId).
  ladokCourseRoundId: string; // CourseRound.ladokCourseRoundId (UtbildningstillfalleUID)
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

export type TStudentParticipationEntity = {
  _id?: string | ObjectId; // Used by document store
  id: string; // Required for DB-layer to work
  // CourseRound.ladokCourseRoundId (UtbildningsinstansUID):
  parentId: string; // TODO: Consider removing, use ladokCoursRoundId instead
  hashedStudentId: string; // StudentUID hashed
  ladokCourseRoundId: string;
  canvasSisId: string;
  name: string;
  email: string;
  roles: string[];
  program: TProgramRoundEntity;
};
