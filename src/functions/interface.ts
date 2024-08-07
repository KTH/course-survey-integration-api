import { ObjectId } from "mongodb";
import { paths, components } from "../__generated__/_interface";
import { Blob } from "buffer";
// # API Interface
// To generate the _interface.ts file, run: `npm run generate-types`
// in the root of the project.

// ## API Components
export type TCourseRoundPartial = components["schemas"]["CourseRoundPartial"];
export type TCourseRound = components["schemas"]["CourseRound"];
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
export type APIPaths = keyof paths;

export type OpenApiCourseRoundList = paths["/course-rounds"];
export type APICourseRoundListErrType = TAPIErrType;
export type APICourseRoundList = TCourseRoundPartial[];
export type APICourseRoundListParams = OpenApiCourseRoundList["get"]["parameters"];

export type OpenApiCourseRound = paths["/course-rounds/{id}"];
export type APICourseRoundErrType = TAPIErrType;
export type APICourseRound = TCourseRound;
export type APICourseRoundParams = OpenApiCourseRound["get"]["parameters"];

export type OpenApiCourseRoundStudentList = paths["/course-rounds/{id}/students"];
export type APICourseRoundStudentListErrType = TAPIErrType;
export type APICourseRoundStudentList = TStudentParticipation[];
export type APICourseRoundStudentListParams = OpenApiCourseRoundStudentList["get"]["parameters"];

export type OpenApiCourseRoundGradingDistributionChart = paths["/course-rounds/{id}/grading-distribution.png"];
export type APICourseRoundGradingDistributionChartErrType = TAPIErrType;
export type APICourseRoundGradingDistributionChart = Blob;
export type APICourseRoundGradingDistributionChartParams = OpenApiCourseRoundGradingDistributionChart["get"]["parameters"];

export type OpenApiModuleGradingDistributionChart = paths["/course-rounds/{id}/modules/{moduleCode}/grading-distribution.png"];
export type APIModuleGradingDistributionChartErrType = TAPIErrType;
export type APIModuleGradingDistributionChart = Blob;
export type APIModuleGradingDistributionChartParams = OpenApiModuleGradingDistributionChart["get"]["parameters"];

/**
 * Domain entities stored in DB
 */
export type TBeslutMetaData = {
  Anteckning?: string; // "Det bidde fel i systemet. Jag har makulerat beslutet.",
  BeslutUID: string; // "34b1ff17-603e-11e9-9dcc-b1e66e1540b0",
  Beslutsdatum: string; // "2024-01-16",
  Beslutsfattare: string; // "Emil Stenberg (IT)",
  BeslutsfattareUID: string; // "34b1ff17-603e-11e9-9dcc-b1e66e1540b0"
}

// This is an embedded object
export type TCourseRoundModuleEntity = {
  moduleRoundId: string; // Used to match with credits (TReportedResultEntity)
  code: TCourseModule["code"];
  canceled: boolean;
  name: TCourseModule["name"];
  credits: TCourseModule["credits"];
  gradingScheme: TCourseModule["gradingScheme"];
};

// This is an embedded object
export type TKoppsCourseRequiredForProgram =
  | "ALL" // ("Alla", "All", "Alla", "All"),
  | "O" // ("Obligatoriska", "Mandatory", "Obligatorisk", "Mandatory"),
  | "VV" // ("Villkorligt valfria", "Conditionally Elective", "Villkorligt valfri", "Conditionally Elective"),
  | "R" // ("Rekommenderade", "Recommended", "Rekommenderad", "Recommended"),
  | "V" // ("Valfria", "Optional", "Valfri", "Optional");

export type TKoppsCourseElectiveCondition = {
  "programmeCode": string, // "CDEPR"
  "progAdmissionTerm": {
      "term": number, // 20222
  },
  "studyYear": number, // 3
  // "title": string, // "Civilingenjörsutbildning i design och produktframtagning",
  "electiveCondition": {
      "ordinal": number, // 2
      "name": TKoppsCourseRequiredForProgram, // "VV"
      "abbrLabel": string, // "Villkorligt valfri"
  }
}

// This is an embedded object
export type TProgramRoundEntity = {
  code: TProgramRound["code"];
  startTerm: TProgramRound["startTerm"];
  name: { sv: string, en: string };
  studyYear: TProgramRound["studyYear"];
  specialization?: { code: string, name?: { sv: string, en: string }};
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
  courseInstanceCode: TCourseRound["courseInstanceCode"];
  courseInstanceArchivingCode: string;
  endDate: TCourseRound["endDate"];
  displayYear: TCourseRound["displayYear"];
  credits: TCourseRound["credits"];
  modules: TCourseRoundModuleEntity[];
  electiveConditionsForPrograms: TKoppsCourseElectiveCondition[];
};

export type TReportedResultEntity = {
  _id?: string | ObjectId; // Used by document store
  id: string; // Required for DB-layer to work
  parentId?: string; // This can belong to a module (UtbildningsinstansId = moduleRoundId) or a course (UtbildningsinstansId = courseId).
  ladokCourseRoundId?: string; // CourseRound.ladokCourseRoundId (UtbildningstillfalleUID)
  hashedStudentId?: string; // StudentUID hashed
  decision?: string; // BeslutUID
  result?: string; // Calculated from BetygsgradID and BetygsskalaID
  metaData: {
    HandelseUID?: string;
    BetygsgradID?: number;
    BetygsskalaID?: number;
    ResultatUID: string;
  };
  retraction?: TBeslutMetaData;
};

export type TStudentParticipationEntity = {
  _id?: string | ObjectId; // Used by document store
  id: string; // Required for DB-layer to work
  // CourseRound.ladokCourseRoundId (UtbildningsinstansUID):
  ladokStudentId: string;
  ladokCourseId: string;
  ladokCourseRoundId: TStudentParticipation["ladokCourseRoundId"];
  
  canvasSisId: TStudentParticipation["canvasSisId"];
  name: TStudentParticipation["name"];
  email: TStudentParticipation["email"];
  roles: TStudentParticipation["roles"]; // Accutally only "student"
  // roles: ["student"];

  locations: string[];
  program?: TProgramRoundEntity;
};
