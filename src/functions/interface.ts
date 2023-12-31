import { paths, components } from "../__generated__/_interface";
// # API Interface
// To generate the _interface.ts file, run: `npm run generate-types`
// in the root of the project.

// ## Entities
export type TCourseRound = components["schemas"]["CourseRound"];
export type TStudent = components["schemas"]["Student"];
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

export type PathCourseRoundStudentList = paths["/course-round/{ladokRoundId}/students"];
export type APICourseRoundStudentListErrType = TAPIErrType;
export type APICourseRoundStudentList = TStudent[];

