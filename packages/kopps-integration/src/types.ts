/**
 * Response of Kopps API endpoint
 * /course/offerings/roundnumber
 */
export interface KoppsCourseRoundSummary {
  /** Example: "SF1624" */
  course_code: string;

  /** Example: "HT2017" */
  start_term: string;
}

export interface KoppsPerson {
  kthid: string;
  givenName: string;
  lastName: string;
  email: string;
  username: string;
}

export type CourseRequiredForProgram =
  | "ALL" // ("Alla", "All", "Alla", "All"),
  | "O" // ("Obligatoriska", "Mandatory", "Obligatorisk", "Mandatory"),
  | "VV" // ("Villkorligt valfria", "Conditionally Elective", "Villkorligt valfri", "Conditionally Elective"),
  | "R" // ("Rekommenderade", "Recommended", "Rekommenderad", "Recommended"),
  | "V" // ("Valfria", "Optional", "Valfri", "Optional");

export type CourseElectiveCondition = {
  // "specCode": string, // "FOR"
  "programmeCode": string, // "CDEPR"
  "progAdmissionTerm": {
      "term": number, // 20222
  },
  "studyYear": number, // 3
  // "title": string, // "Civilingenjörsutbildning i design och produktframtagning",
  "electiveCondition": {
      "ordinal": number, // 2
      "name": CourseRequiredForProgram, // "VV"
      "abbrLabel": string, // "Villkorligt valfri"
  }
}


/** Course round information */
export interface KoppsCourseRoundInfo {
  round: {
    /** course round ID */
    ladokUID: string;

    /** Old "round ID" (single digit) */
    ladokRoundId: string;

    /**
     * An object containing the number of credits per period. It includes
     * also information about start and end weeks per period
     */
    courseRoundTerms: Array<
      Partial<Record<`creditsP${0 | 1 | 2 | 3 | 4 | 5}`, number>> & {
        term: {
          term: number;
        };
      }
    >;

    startTerm: {
      /** Start term of the round */
      term: number;
    };
  };

  ldapResponsibles?: KoppsPerson[];
  ldapTeachers?: KoppsPerson[];
  
  usage: Array<CourseElectiveCondition>
}

export interface KoppsSyllabus {
  validFromTerm: {
    /** Term from where the syllabus is valid. Example "20232" */
    term: number;
  };
  courseSyllabus: {
    /** Learning goals */
    goals: string;
  };
}

/**
 * Response of Kopps API endpoint
 * /course/<courseCode>/detialedinformation
 */
export interface KoppsCourseDetailedInformation {
  course: {
    /** Example: "SF1624" */
    courseCode: string;

    department: {
      /** Department code. Example: "JH" */
      code: string;

      /** School and department name. Example: "EECS/Datavetenskap" */
      name: string;
    };

    /** Name of the course in Swedish. Example: "Tillämpad programmering" */
    title: string;

    /** Name of the course in English. Example: "Applied programming" */
    titleOther: string;

    /** Number of credits */
    credits: number;
  };

  examiners: KoppsPerson[];

  /** All course rounds in the course */
  roundInfos: KoppsCourseRoundInfo[];

  /** Information about modules */
  examinationSets: Record<
    string,
    {
      examinationRounds: {
        examCode: string;
        title: string;
        credits: number;
      }[];
    }
  >;

  publicSyllabusVersions: KoppsSyllabus[];
}
