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

  // Information about programs. Not used at this moment
  // usage?: {
  //   programmeCode: string;
  //   specCode: string;
  //   title: string;
  // }[];
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
