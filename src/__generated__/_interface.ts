/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/course-rounds": {
    /**
     * Returns a list of course rounds pending evaluation (partial objects only).
     * @description | The API will return course rounds from this or previous term. The course round is returned as a partial object,
     * | for complete data call the details endpoint. A course round might be updated and course rounds might be added
     * | to this list as time progresses during the term. Added courses will be added to end of list. Course rounds may
     * | be removed from this list if calls are on different days.
     */
    get: {
      parameters: {
        query?: {
          limit?: components["parameters"]["PageLimit"];
          offset?: components["parameters"]["PageOffset"];
        };
      };
      responses: {
        /** @description Ok */
        200: {
          headers: {
            "Pagination-Total-Count": components["headers"]["Pagination-Total-Count"];
            "Pagination-Offset": components["headers"]["Pagination-Offset"];
            "Pagination-Limit": components["headers"]["Pagination-Limit"];
          };
          content: {
            "application/json": components["schemas"]["CourseRoundPartial"][];
          };
        };
        401: components["responses"]["401"];
        default: components["responses"]["default"];
      };
    };
  };
  "/course-rounds/{ladokRoundId}": {
    /**
     * Returns complete information about this course round.
     * @description | This endpoint returns all information about a course round. This includes the number of registered students,
     * | the number of reported results, grading distribution, programs and modules.
     * | Note: This information needs to be updated daily from when the course has ended until the course analysis has
     * | been created.
     */
    get: {
      parameters: {
        path: {
          ladokRoundId: string;
        };
      };
      responses: {
        /** @description Ok */
        200: {
          content: {
            "application/json": components["schemas"]["CourseRound"];
          };
        };
        401: components["responses"]["401"];
        default: components["responses"]["default"];
      };
    };
  };
  "/course-rounds/{ladokRoundId}/students": {
    /** Returns list of students belonging to the course round. */
    get: {
      parameters: {
        query?: {
          limit?: components["parameters"]["PageLimit"];
          offset?: components["parameters"]["PageOffset"];
        };
        path: {
          ladokRoundId: string;
        };
      };
      responses: {
        /** @description Ok */
        200: {
          headers: {
            "Pagination-Total-Count": components["headers"]["Pagination-Total-Count"];
            "Pagination-Offset": components["headers"]["Pagination-Offset"];
            "Pagination-Limit": components["headers"]["Pagination-Limit"];
          };
          content: {
            "application/json": components["schemas"]["StudentParticipation"][];
          };
        };
        401: components["responses"]["401"];
        default: components["responses"]["default"];
      };
    };
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    CourseRoundPartial: {
      /** @description Ladok equivalent: UtbildningstillfalleUID, KurstillfalleUID */
      ladokCourseRoundId: string;
      /** @description Ladok equivalent: UtbildningsUID, KursUID */
      ladokCourseId: string;
      /** @description This property is called sis_section_id in Canvas API. (Equivalent to ladokCourseRoundId) */
      canvasSisId: string;
      /** @description Name in tutoring language. */
      name: string;
      /** @description This is the _course_ code and originates from Ladok. */
      courseCode: string;
      /**
       * @description The tutoring language for this course round. Determines the language used to generate report.
       * @enum {string}
       */
      language: "en" | "sv";
      /** @description Marked true if the course round has been canceled (duh!). */
      canceled: boolean;
      /**
       * Format: date
       * @description The date when the course round ends.
       */
      endDate: string;
      /** @description The year this course round was held (YYYY). Note: there are course rounds that span multiple years and might be displayed as YYYY-YYYY */
      displayYear: string;
      /** @description The school at KTH this course round belongs to. */
      organization: components["schemas"]["OrgEntity"];
      /** @description The specific institution at a school this course round is attached to. */
      institution: components["schemas"]["OrgEntity"];
      /** @description This freetext entry explains the goal of the course. Includes linebreaks. */
      courseGoal: string;
      /**
       * @description | List of periods this course round runs for. Currently we only return the start period
       * | and all credits for the course. In the future we might specify all periods and spread
       * | the credits accross them.
       */
      periods?: ({
          /** @enum {string} */
          period?: "P0" | "P1" | "P2" | "P3" | "P4" | "P5";
          /** @description Credits awarded for this period. */
          credits?: string;
        })[];
      /** @description Total credits awarded for this course. */
      credits: string;
      /** @description List of examinors for this _course_. */
      courseExaminors?: components["schemas"]["CourseUser"][];
      /** @description List of course responsible for this course round. */
      courseResponsible: components["schemas"]["CourseUser"][];
      /** @description List of teachers of this course round. */
      courseTeachers: components["schemas"]["CourseUser"][];
    };
    CourseRound: components["schemas"]["CourseRoundPartial"] & {
      /** @description Number of students registered for this course round. */
      totalRegisteredStudents: number;
      /** @description Number of students with reported results for this course round. */
      totalReportedResults: number;
      /**
       * @description Kurs, betygsfördelning
       * @example [
       *   {
       *     "A": 3,
       *     "B": 25,
       *     "C": 15,
       *     "D": 3,
       *     "E": 0,
       *     "F": 2
       *   },
       *   {
       *     "P": 45,
       *     "F": 3
       *   }
       * ]
       */
      gradingDistribution: {
        [key: string]: unknown;
      };
      /** @description List of programs this course round is part of according to registered students. */
      programs: components["schemas"]["ProgramRound"][];
      /** @description List of modules that are part of this course round, including grading distribution etc. */
      modules: components["schemas"]["CourseModule"][];
    };
    StudentParticipation: {
      /** @description Ladok equivalent: StudentUID */
      ladokStudentId: string;
      /** @description Ladok equivalent: UtbildningsUID, KursUID */
      ladokCourseId: string;
      ladokCourseRoundId: string;
      /** @description We currently use kthUserId as canvasSisId */
      canvasSisId: string;
      /** @description Full Name of user */
      name: string;
      /** Format: email */
      email: string;
      roles: "student"[];
      location: string;
      program: components["schemas"]["ProgramRound"];
    };
    ProgramRound: {
      code: string;
      semester: string;
      /** @description Year and term when program round started */
      startTerm?: string;
      name: string;
      /** @description Calculate by using startPeriod and current period. */
      studyYear: number;
      /** @description Specialization of the program (inriktning på svenska). This is omitted if connection belongs to the base program. */
      specialization?: {
        code?: string;
        /** @description Name of the specialization in tutoring language. */
        name?: string;
      };
      /**
       * @description Determines if taking this course is mandatory or not for this program.
       * @enum {string}
       */
      required?: "mandatory?" | "...";
    };
    CourseModule: {
      code: string;
      name: string;
      /** @description Credits awarded for this module. */
      credits: string;
      gradingScheme: string[];
      totalReportedResults: number;
      /**
       * @description Moment, betygsfördelning
       * @example [
       *   {
       *     "A": 3,
       *     "B": 25,
       *     "C": 15,
       *     "D": 3,
       *     "E": 0,
       *     "F": 2
       *   },
       *   {
       *     "P": 45,
       *     "F": 3
       *   }
       * ]
       */
      gradingDistribution: Record<string, never>;
    };
    CourseUser: {
      /** @description This is the username used to log in to KTH SSO. */
      userName: string;
      /** @description This is the unique identifier for a user at KTH. */
      kthUserId: string;
      /** Format: email */
      email: string;
      fullName: string;
    };
    OrgEntity: {
      /** @description The name of the organization entity to be displayed in report in the tutoring language. */
      displayName: string;
      /**
       * @description KTH-specific code used for organization entity.
       * @example [
       *   "EECS",
       *   "EECS/JA"
       * ]
       */
      displayCode: string;
      /** @description The unique identifier used by the federated login server to refer to the organization entity. */
      kthId: string;
    };
  };
  responses: {
    /** @description Unauthorized */
    401: {
      content: never;
    };
    /** @description Invalid request */
    default: {
      content: {
        "application/json": {
          message?: string;
        };
      };
    };
  };
  parameters: {
    /** @description Nrof items per page */
    PageLimit?: number;
    /** @description Start on page (zero based) */
    PageOffset?: number;
  };
  requestBodies: never;
  headers: {
    "Pagination-Total-Count": number;
    "Pagination-Offset": number;
    "Pagination-Limit": number;
  };
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export type operations = Record<string, never>;
