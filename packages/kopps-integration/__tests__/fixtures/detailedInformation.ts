import { CourseRequiredForProgram } from "../../src/types";

export const SF1624 = {
  course: {
    academicLevel: "A",
    courseCode: "SF1624",
    versionNumber: 1,
    departmentCode: "SF",
    department: {
      code: "SF",
      name: "SCI/Matematik",
    },
    educationalLevelCode: "BASIC",
    educationalTypeId: 22,
    gradeScaleCode: "AF",
    supplementaryInfo:
      "<p><strong><em>Obligatorisk f&#246;r &#229;k1, kan ej l&#228;sas av andra studenter</em></strong></p>",
    title: "Algebra och geometri",
    titleOther: "Algebra and Geometry",
    cancelled: false,
    deactivated: false,
    recruitmentText:
      "<p>Algebra och geometri &#228;r en grundl&#228;ggande kurs i linj&#228;r algebra med vektorgeometri. Ett centralt begrepp i kursen &#228;r linj&#228;ritet som ligger till grund f&#246;r stora delar av anv&#228;ndningen av matematik inom s&#229;v&#228;l naturvetenskap som inom ingenj&#246;rstill&#228;mpningar.</p>",
    credits: 7.5,
    creditUnitLabel: "Högskolepoäng",
    creditUnitAbbr: "hp",
    state: "ESTABLISHED",
    courseVersion: {
      versionNumber: 1,
      keywordsEn: [],
      keywordsSv: [],
    },
  },
  examiners: [
    {
      kthid: "u1tqa5gd",
      givenName: "Maria",
      lastName: "Saprykina",
      email: "masha@kth.se",
      username: "masha",
    },
    {
      kthid: "u1tyze7e",
      givenName: "Tommy",
      lastName: "Ekola",
      email: "ekola@kth.se",
      username: "ekola",
    },
  ],
  roundInfos: [
    {
      lectureCount: 21,
      excerciseCount: 28,
      usage: [
        {
          programmeCode: "CMETE",
          progAdmissionTerm: {
            term: 20242,
          },
          studyYear: 1,
          title: "Civilingenjörsutbildning i medieteknik",
          electiveCondition: {
            ordinal: 1,
            name: "O" as CourseRequiredForProgram,
            abbrLabel: "Obligatorisk",
          },
        },
        {
          programmeCode: "COPEN",
          progAdmissionTerm: {
            term: 20242,
          },
          studyYear: 1,
          title: "Civilingenjörsutbildning öppen ingång",
          electiveCondition: {
            ordinal: 1,
            name: "O" as CourseRequiredForProgram,
            abbrLabel: "Obligatorisk",
          },
        },
      ],
      timeslots: "",
      hasTimeslots: false,
      ldapResponsibles: [
        {
          kthid: "u1lvdahr",
          givenName: "Lars",
          lastName: "Filipsson",
          email: "lfn@kth.se",
          username: "lfn",
        },
      ],
      ldapTeachers: [
        {
          kthid: "u1lvdahr",
          givenName: "Lars",
          lastName: "Filipsson",
          email: "lfn@kth.se",
          username: "lfn",
        },
      ],
      round: {
        ladokRoundId: "1",
        ladokUID: "0772a941-98c8-11ee-888d-8a62d8d3440a",
        state: "APPROVED",
        tutoringTimeOfDay: {
          name: "DAG",
          key: "tutoringtime.DAG",
        },
        municipalityCode: "KTHCAMPUS",
        tutoringForm: {
          name: "NML",
          key: "tutoringform.NML",
        },
        shortName: "CMETE1 m.fl.",
        campus: {
          name: "KTH Campus",
          label: "KTH Campus",
        },
        selectionCriteriaSv: "<p></p>",
        selectionCriteriaEn: "<p></p>",
        language: "Svenska",
        draftCourseRoundType: {
          code: "ORD",
          name: "Programutbildning",
          active: true,
          category: "PU",
        },
        courseRoundTerms: [
          {
            formattedPeriodsAndCredits: "P2 (7,5 hp)",
            term: {
              term: 20242,
            },
            startWeek: {
              year: 2024,
              week: 44,
            },
            endWeek: {
              year: 2025,
              week: 3,
            },
            creditsP2: 7.5,
          },
        ],
        applicationCodes: [
          {
            applicationCode: "50233",
            term: "20242",
            courseRoundType: {
              code: "ORD",
              name: "Programutbildning",
              active: true,
              category: "PU",
            },
            avgFri: false,
          },
        ],
        startTerm: {
          term: 20242,
        },
        isPU: true,
        isVU: false,
        startWeek: {
          year: 2024,
          week: 44,
        },
        endWeek: {
          year: 2025,
          week: 3,
        },
        startDate: "Oct 28, 2024 12:00:00 AM",
        firstTuitionDate: "2024-10-28",
        lastTuitionDate: "2025-01-13",
        studyPace: 50,
      },
    },
    {
      lectureCount: 21,
      excerciseCount: 14,
      usage: [
        {
          programmeCode: "CITEH",
          progAdmissionTerm: {
            term: 20242,
          },
          studyYear: 1,
          title: "Civilingenjörsutbildning i industriell teknik och hållbarhet",
          electiveCondition: {
            ordinal: 1,
            name: "O" as CourseRequiredForProgram,
            abbrLabel: "Obligatorisk",
          },
        },
      ],
      timeslots: "",
      hasTimeslots: false,
      ldapResponsibles: [
        {
          kthid: "u1ylahac",
          givenName: "Albin",
          lastName: "Eriksson Östman",
          email: "albin01@kth.se",
          username: "albin01",
        },
      ],
      ldapTeachers: [
        {
          kthid: "u1ylahac",
          givenName: "Albin",
          lastName: "Eriksson Östman",
          email: "albin01@kth.se",
          username: "albin01",
        },
      ],
      round: {
        ladokRoundId: "2",
        ladokUID: "8fe6041d-9a88-11ee-bfe5-0721067a4fbf",
        state: "APPROVED",
        tutoringTimeOfDay: {
          name: "DAG",
          key: "tutoringtime.DAG",
        },
        municipalityCode: "KTHCAMPUS",
        tutoringForm: {
          name: "NML",
          key: "tutoringform.NML",
        },
        shortName: "CITEH1",
        campus: {
          name: "KTH Campus",
          label: "KTH Campus",
        },
        selectionCriteriaSv: "<p></p>",
        selectionCriteriaEn: "<p></p>",
        language: "Svenska",
        draftCourseRoundType: {
          code: "ORD",
          name: "Programutbildning",
          active: true,
          category: "PU",
        },
        courseRoundTerms: [
          {
            formattedPeriodsAndCredits: "P2 (7,5 hp)",
            term: {
              term: 20242,
            },
            startWeek: {
              year: 2024,
              week: 44,
            },
            endWeek: {
              year: 2025,
              week: 3,
            },
            creditsP2: 7.5,
          },
        ],
        applicationCodes: [
          {
            applicationCode: "50332",
            term: "20242",
            courseRoundType: {
              code: "ORD",
              name: "Programutbildning",
              active: true,
              category: "PU",
            },
            avgFri: false,
          },
        ],
        startTerm: {
          term: 20242,
        },
        isPU: true,
        isVU: false,
        startWeek: {
          year: 2024,
          week: 44,
        },
        endWeek: {
          year: 2025,
          week: 3,
        },
        startDate: "Oct 28, 2024 12:00:00 AM",
        firstTuitionDate: "2024-10-28",
        lastTuitionDate: "2025-01-13",
        studyPace: 50,
      },
    },
    {
      lectureCount: 21,
      excerciseCount: 14,
      usage: [
        {
          programmeCode: "CINTE",
          progAdmissionTerm: {
            term: 20242,
          },
          studyYear: 1,
          title: "Civilingenjörsutbildning i informationsteknik",
          electiveCondition: {
            ordinal: 1,
            name: "O" as CourseRequiredForProgram,
            abbrLabel: "Obligatorisk",
          },
        },
      ],
      timeslots: "",
      hasTimeslots: false,
      ldapResponsibles: [
        {
          kthid: "u1tyze7e",
          givenName: "Tommy",
          lastName: "Ekola",
          email: "ekola@kth.se",
          username: "ekola",
        },
      ],
      ldapTeachers: [
        {
          kthid: "u1tyze7e",
          givenName: "Tommy",
          lastName: "Ekola",
          email: "ekola@kth.se",
          username: "ekola",
        },
      ],
      round: {
        ladokRoundId: "3",
        ladokUID: "a8611bb8-9a88-11ee-bfe5-0721067a4fbf",
        state: "APPROVED",
        tutoringTimeOfDay: {
          name: "DAG",
          key: "tutoringtime.DAG",
        },
        municipalityCode: "KISTA",
        tutoringForm: {
          name: "NML",
          key: "tutoringform.NML",
        },
        shortName: "CINTE1",
        campus: {
          name: "KTH Kista",
          label: "KTH Kista",
        },
        selectionCriteriaSv: "<p></p>",
        selectionCriteriaEn: "<p></p>",
        language: "Svenska",
        targetGroup: "<p>CINTE1</p>",
        draftCourseRoundType: {
          code: "ORD",
          name: "Programutbildning",
          active: true,
          category: "PU",
        },
        courseRoundTerms: [
          {
            formattedPeriodsAndCredits: "P2 (7,5 hp)",
            term: {
              term: 20242,
            },
            startWeek: {
              year: 2024,
              week: 44,
            },
            endWeek: {
              year: 2025,
              week: 3,
            },
            creditsP2: 7.5,
          },
        ],
        applicationCodes: [
          {
            applicationCode: "51098",
            term: "20242",
            courseRoundType: {
              code: "ORD",
              name: "Programutbildning",
              active: true,
              category: "PU",
            },
            avgFri: false,
          },
        ],
        startTerm: {
          term: 20242,
        },
        isPU: true,
        isVU: false,
        startWeek: {
          year: 2024,
          week: 44,
        },
        endWeek: {
          year: 2025,
          week: 3,
        },
        startDate: "Oct 28, 2024 12:00:00 AM",
        firstTuitionDate: "2024-10-28",
        lastTuitionDate: "2025-01-13",
        studyPace: 50,
      },
    },
    {
      lectureCount: 21,
      excerciseCount: 28,
      usage: [
        {
          programmeCode: "CBIOT",
          progAdmissionTerm: {
            term: 20232,
          },
          studyYear: 2,
          title: "Civilingenjörsutbildning i bioteknik",
          electiveCondition: {
            ordinal: 1,
            name: "O" as CourseRequiredForProgram,
            abbrLabel: "Obligatorisk",
          },
        },
        {
          programmeCode: "CMAST",
          progAdmissionTerm: {
            term: 20242,
          },
          studyYear: 1,
          title: "Civilingenjörsutbildning i maskinteknik",
          electiveCondition: {
            ordinal: 1,
            name: "O" as CourseRequiredForProgram,
            abbrLabel: "Obligatorisk",
          },
        },
      ],
      timeslots: "",
      hasTimeslots: false,
      ldapResponsibles: [
        {
          kthid: "u1tqa5gd",
          givenName: "Maria",
          lastName: "Saprykina",
          email: "masha@kth.se",
          username: "masha",
        },
      ],
      ldapTeachers: [
        {
          kthid: "u1tqa5gd",
          givenName: "Maria",
          lastName: "Saprykina",
          email: "masha@kth.se",
          username: "masha",
        },
      ],
      round: {
        ladokRoundId: "4",
        ladokUID: "b060134d-9a88-11ee-bfe5-0721067a4fbf",
        state: "APPROVED",
        tutoringTimeOfDay: {
          name: "DAG",
          key: "tutoringtime.DAG",
        },
        municipalityCode: "KTHCAMPUS",
        tutoringForm: {
          name: "NML",
          key: "tutoringform.NML",
        },
        shortName: "CBIOT2 m.fl.",
        campus: {
          name: "KTH Campus",
          label: "KTH Campus",
        },
        selectionCriteriaSv: "<p></p>",
        selectionCriteriaEn: "<p></p>",
        language: "Svenska",
        draftCourseRoundType: {
          code: "ORD",
          name: "Programutbildning",
          active: true,
          category: "PU",
        },
        courseRoundTerms: [
          {
            formattedPeriodsAndCredits: "P1 (7,5 hp)",
            term: {
              term: 20242,
            },
            startWeek: {
              year: 2024,
              week: 35,
            },
            endWeek: {
              year: 2024,
              week: 43,
            },
            creditsP1: 7.5,
          },
        ],
        applicationCodes: [
          {
            applicationCode: "50748",
            term: "20242",
            courseRoundType: {
              code: "ORD",
              name: "Programutbildning",
              active: true,
              category: "PU",
            },
            avgFri: false,
          },
        ],
        startTerm: {
          term: 20242,
        },
        isPU: true,
        isVU: false,
        startWeek: {
          year: 2024,
          week: 35,
        },
        endWeek: {
          year: 2024,
          week: 43,
        },
        startDate: "Aug 26, 2024 12:00:00 AM",
        firstTuitionDate: "2024-08-26",
        lastTuitionDate: "2024-10-27",
        studyPace: 50,
      },
    },
    {
      lectureCount: 21,
      excerciseCount: 28,
      usage: [
        {
          specCode: "TEMI",
          programmeCode: "CLGYM",
          progAdmissionTerm: {
            term: 20232,
          },
          studyYear: 2,
          title: "Civilingenjör och lärare",
          electiveCondition: {
            ordinal: 1,
            name: "O" as CourseRequiredForProgram,
            abbrLabel: "Obligatorisk",
          },
        },
        {
          programmeCode: "CDEPR",
          progAdmissionTerm: {
            term: 20242,
          },
          studyYear: 1,
          title: "Civilingenjörsutbildning i design och produktframtagning",
          electiveCondition: {
            ordinal: 1,
            name: "O" as CourseRequiredForProgram,
            abbrLabel: "Obligatorisk",
          },
        },
        {
          programmeCode: "CENMI",
          progAdmissionTerm: {
            term: 20242,
          },
          studyYear: 1,
          title: "Civilingenjörsutbildning i energi och miljö",
          electiveCondition: {
            ordinal: 1,
            name: "O" as CourseRequiredForProgram,
            abbrLabel: "Obligatorisk",
          },
        },
      ],
      timeslots: "",
      hasTimeslots: false,
      ldapResponsibles: [
        {
          kthid: "u1tqa5gd",
          givenName: "Maria",
          lastName: "Saprykina",
          email: "masha@kth.se",
          username: "masha",
        },
      ],
      ldapTeachers: [
        {
          kthid: "u1tqa5gd",
          givenName: "Maria",
          lastName: "Saprykina",
          email: "masha@kth.se",
          username: "masha",
        },
      ],
      round: {
        ladokRoundId: "5",
        ladokUID: "bab6676e-9a88-11ee-bfe5-0721067a4fbf",
        state: "APPROVED",
        tutoringTimeOfDay: {
          name: "DAG",
          key: "tutoringtime.DAG",
        },
        municipalityCode: "KTHCAMPUS",
        tutoringForm: {
          name: "NML",
          key: "tutoringform.NML",
        },
        shortName: "CDEPR1 m.fl.",
        campus: {
          name: "KTH Campus",
          label: "KTH Campus",
        },
        selectionCriteriaSv: "<p></p>",
        selectionCriteriaEn: "<p></p>",
        language: "Svenska",
        targetGroup: "<p>CDEPR1</p><p>CENMI1</p><p>CLGYM TEMI2</p>",
        draftCourseRoundType: {
          code: "ORD",
          name: "Programutbildning",
          active: true,
          category: "PU",
        },
        courseRoundTerms: [
          {
            formattedPeriodsAndCredits: "P1 (7,5 hp)",
            term: {
              term: 20242,
            },
            startWeek: {
              year: 2024,
              week: 35,
            },
            endWeek: {
              year: 2024,
              week: 43,
            },
            creditsP1: 7.5,
          },
        ],
        applicationCodes: [
          {
            applicationCode: "51505",
            term: "20242",
            courseRoundType: {
              code: "ORD",
              name: "Programutbildning",
              active: true,
              category: "PU",
            },
            avgFri: false,
          },
        ],
        startTerm: {
          term: 20242,
        },
        isPU: true,
        isVU: false,
        startWeek: {
          year: 2024,
          week: 35,
        },
        endWeek: {
          year: 2024,
          week: 43,
        },
        startDate: "Aug 26, 2024 12:00:00 AM",
        firstTuitionDate: "2024-08-26",
        lastTuitionDate: "2024-10-27",
        studyPace: 50,
      },
    },
    {
      lectureCount: 21,
      excerciseCount: 14,
      usage: [
        {
          programmeCode: "CMEDT",
          progAdmissionTerm: {
            term: 20242,
          },
          studyYear: 1,
          title: "Civilingenjörsutbildning i medicinsk teknik",
          electiveCondition: {
            ordinal: 1,
            name: "O" as CourseRequiredForProgram,
            abbrLabel: "Obligatorisk",
          },
        },
      ],
      timeslots: "",
      hasTimeslots: false,
      ldapResponsibles: [
        {
          kthid: "u15s7f5r",
          givenName: "Sonja",
          lastName: "Radosavljevic",
          email: "sonjara@kth.se",
          username: "sonjara",
        },
      ],
      ldapTeachers: [
        {
          kthid: "u15s7f5r",
          givenName: "Sonja",
          lastName: "Radosavljevic",
          email: "sonjara@kth.se",
          username: "sonjara",
        },
      ],
      round: {
        ladokRoundId: "6",
        ladokUID: "c3109e36-9a88-11ee-bfe5-0721067a4fbf",
        state: "APPROVED",
        tutoringTimeOfDay: {
          name: "DAG",
          key: "tutoringtime.DAG",
        },
        municipalityCode: "KTHCAMPUS",
        tutoringForm: {
          name: "NML",
          key: "tutoringform.NML",
        },
        shortName: "CMEDT1",
        campus: {
          name: "KTH Campus",
          label: "KTH Campus",
        },
        selectionCriteriaSv: "<p></p>",
        selectionCriteriaEn: "<p></p>",
        language: "Svenska",
        draftCourseRoundType: {
          code: "ORD",
          name: "Programutbildning",
          active: true,
          category: "PU",
        },
        courseRoundTerms: [
          {
            formattedPeriodsAndCredits: "P2 (7,5 hp)",
            term: {
              term: 20242,
            },
            startWeek: {
              year: 2024,
              week: 44,
            },
            endWeek: {
              year: 2025,
              week: 3,
            },
            creditsP2: 7.5,
          },
        ],
        applicationCodes: [
          {
            applicationCode: "51143",
            term: "20242",
            courseRoundType: {
              code: "ORD",
              name: "Programutbildning",
              active: true,
              category: "PU",
            },
            avgFri: false,
          },
        ],
        startTerm: {
          term: 20242,
        },
        isPU: true,
        isVU: false,
        startWeek: {
          year: 2024,
          week: 44,
        },
        endWeek: {
          year: 2025,
          week: 3,
        },
        startDate: "Oct 28, 2024 12:00:00 AM",
        firstTuitionDate: "2024-10-28",
        lastTuitionDate: "2025-01-13",
        studyPace: 50,
      },
    },
    {
      lectureCount: 21,
      excerciseCount: 14,
      usage: [
        {
          programmeCode: "CDATE",
          progAdmissionTerm: {
            term: 20242,
          },
          studyYear: 1,
          title: "Civilingenjörsutbildning i datateknik",
          electiveCondition: {
            ordinal: 1,
            name: "O" as CourseRequiredForProgram,
            abbrLabel: "Obligatorisk",
          },
        },
      ],
      timeslots: "",
      hasTimeslots: false,
      ldapResponsibles: [
        {
          kthid: "u1tqa5gd",
          givenName: "Maria",
          lastName: "Saprykina",
          email: "masha@kth.se",
          username: "masha",
        },
      ],
      ldapTeachers: [
        {
          kthid: "u1tqa5gd",
          givenName: "Maria",
          lastName: "Saprykina",
          email: "masha@kth.se",
          username: "masha",
        },
      ],
      round: {
        ladokRoundId: "7",
        ladokUID: "deea97c8-9a88-11ee-bfe5-0721067a4fbf",
        state: "APPROVED",
        tutoringTimeOfDay: {
          name: "DAG",
          key: "tutoringtime.DAG",
        },
        municipalityCode: "KTHCAMPUS",
        tutoringForm: {
          name: "NML",
          key: "tutoringform.NML",
        },
        shortName: "CDATE1",
        campus: {
          name: "KTH Campus",
          label: "KTH Campus",
        },
        selectionCriteriaSv: "<p></p>",
        selectionCriteriaEn: "<p></p>",
        language: "Svenska",
        targetGroup: "<p>CDATE1</p>",
        draftCourseRoundType: {
          code: "ORD",
          name: "Programutbildning",
          active: true,
          category: "PU",
        },
        courseRoundTerms: [
          {
            formattedPeriodsAndCredits: "P2 (7,5 hp)",
            term: {
              term: 20242,
            },
            startWeek: {
              year: 2024,
              week: 44,
            },
            endWeek: {
              year: 2025,
              week: 3,
            },
            creditsP2: 7.5,
          },
        ],
        applicationCodes: [
          {
            applicationCode: "50225",
            term: "20242",
            courseRoundType: {
              code: "ORD",
              name: "Programutbildning",
              active: true,
              category: "PU",
            },
            avgFri: false,
          },
        ],
        startTerm: {
          term: 20242,
        },
        isPU: true,
        isVU: false,
        startWeek: {
          year: 2024,
          week: 44,
        },
        endWeek: {
          year: 2025,
          week: 3,
        },
        startDate: "Oct 28, 2024 12:00:00 AM",
        firstTuitionDate: "2024-10-28",
        lastTuitionDate: "2025-01-13",
        studyPace: 50,
      },
    },
    {
      lectureCount: 21,
      excerciseCount: 28,
      usage: [
        {
          programmeCode: "CELTE",
          progAdmissionTerm: {
            term: 20242,
          },
          studyYear: 1,
          title: "Civilingenjörsutbildning i elektroteknik",
          electiveCondition: {
            ordinal: 1,
            name: "O" as CourseRequiredForProgram,
            abbrLabel: "Obligatorisk",
          },
        },
        {
          programmeCode: "CINEK",
          progAdmissionTerm: {
            term: 20242,
          },
          studyYear: 1,
          title: "Civilingenjörsutbildning i industriell ekonomi",
          electiveCondition: {
            ordinal: 1,
            name: "O" as CourseRequiredForProgram,
            abbrLabel: "Obligatorisk",
          },
        },
      ],
      timeslots: "",
      hasTimeslots: false,
      ldapResponsibles: [
        {
          kthid: "u1lvdahr",
          givenName: "Lars",
          lastName: "Filipsson",
          email: "lfn@kth.se",
          username: "lfn",
        },
      ],
      ldapTeachers: [
        {
          kthid: "u1lvdahr",
          givenName: "Lars",
          lastName: "Filipsson",
          email: "lfn@kth.se",
          username: "lfn",
        },
      ],
      round: {
        ladokRoundId: "8",
        ladokUID: "098f091e-9a89-11ee-bfe5-0721067a4fbf",
        state: "APPROVED",
        tutoringTimeOfDay: {
          name: "DAG",
          key: "tutoringtime.DAG",
        },
        municipalityCode: "KTHCAMPUS",
        tutoringForm: {
          name: "NML",
          key: "tutoringform.NML",
        },
        shortName: "CELTE1 m.fl.",
        campus: {
          name: "KTH Campus",
          label: "KTH Campus",
        },
        selectionCriteriaSv: "<p></p>",
        selectionCriteriaEn: "<p></p>",
        language: "Svenska",
        targetGroup: "<p>CELTE1</p><p>CINEK1</p>",
        draftCourseRoundType: {
          code: "ORD",
          name: "Programutbildning",
          active: true,
          category: "PU",
        },
        courseRoundTerms: [
          {
            formattedPeriodsAndCredits: "P2 (7,5 hp)",
            term: {
              term: 20242,
            },
            startWeek: {
              year: 2024,
              week: 44,
            },
            endWeek: {
              year: 2025,
              week: 3,
            },
            creditsP2: 7.5,
          },
        ],
        applicationCodes: [
          {
            applicationCode: "50166",
            term: "20242",
            courseRoundType: {
              code: "ORD",
              name: "Programutbildning",
              active: true,
              category: "PU",
            },
            avgFri: false,
          },
        ],
        startTerm: {
          term: 20242,
        },
        isPU: true,
        isVU: false,
        startWeek: {
          year: 2024,
          week: 44,
        },
        endWeek: {
          year: 2025,
          week: 3,
        },
        startDate: "Oct 28, 2024 12:00:00 AM",
        firstTuitionDate: "2024-10-28",
        lastTuitionDate: "2025-01-13",
        studyPace: 50,
      },
    },
    {
      lectureCount: 21,
      excerciseCount: 56,
      usage: [
        {
          specCode: "MAKE",
          programmeCode: "CLGYM",
          progAdmissionTerm: {
            term: 20232,
          },
          studyYear: 2,
          title: "Civilingenjör och lärare",
          electiveCondition: {
            ordinal: 1,
            name: "O" as CourseRequiredForProgram,
            abbrLabel: "Obligatorisk",
          },
        },
        {
          specCode: "TEDA",
          programmeCode: "CLGYM",
          progAdmissionTerm: {
            term: 20232,
          },
          studyYear: 2,
          title: "Civilingenjör och lärare",
          electiveCondition: {
            ordinal: 1,
            name: "O" as CourseRequiredForProgram,
            abbrLabel: "Obligatorisk",
          },
        },
        {
          programmeCode: "CMATD",
          progAdmissionTerm: {
            term: 20242,
          },
          studyYear: 1,
          title: "Civilingenjörsutbildning i materialdesign",
          electiveCondition: {
            ordinal: 1,
            name: "O" as CourseRequiredForProgram,
            abbrLabel: "Obligatorisk",
          },
        },
        {
          programmeCode: "CSAMH",
          progAdmissionTerm: {
            term: 20242,
          },
          studyYear: 1,
          title: "Civilingenjörsutbildning i samhällsbyggnad",
          electiveCondition: {
            ordinal: 1,
            name: "O" as CourseRequiredForProgram,
            abbrLabel: "Obligatorisk",
          },
        },
        {
          programmeCode: "CTKEM",
          progAdmissionTerm: {
            term: 20242,
          },
          studyYear: 1,
          title: "Civilingenjörsutbildning i teknisk kemi",
          electiveCondition: {
            ordinal: 1,
            name: "O" as CourseRequiredForProgram,
            abbrLabel: "Obligatorisk",
          },
        },
      ],
      timeslots: "",
      hasTimeslots: false,
      ldapResponsibles: [
        {
          kthid: "u1tyze7e",
          givenName: "Tommy",
          lastName: "Ekola",
          email: "ekola@kth.se",
          username: "ekola",
        },
      ],
      ldapTeachers: [
        {
          kthid: "u1tyze7e",
          givenName: "Tommy",
          lastName: "Ekola",
          email: "ekola@kth.se",
          username: "ekola",
        },
      ],
      round: {
        ladokRoundId: "9",
        ladokUID: "26a8fd08-9a89-11ee-bfe5-0721067a4fbf",
        state: "APPROVED",
        tutoringTimeOfDay: {
          name: "DAG",
          key: "tutoringtime.DAG",
        },
        municipalityCode: "KTHCAMPUS",
        tutoringForm: {
          name: "NML",
          key: "tutoringform.NML",
        },
        shortName: "CMATD1 m.fl.",
        campus: {
          name: "KTH Campus",
          label: "KTH Campus",
        },
        selectionCriteriaSv: "<p></p>",
        selectionCriteriaEn: "<p></p>",
        language: "Svenska",
        draftCourseRoundType: {
          code: "ORD",
          name: "Programutbildning",
          active: true,
          category: "PU",
        },
        courseRoundTerms: [
          {
            formattedPeriodsAndCredits: "P2 (7,5 hp)",
            term: {
              term: 20242,
            },
            startWeek: {
              year: 2024,
              week: 44,
            },
            endWeek: {
              year: 2025,
              week: 3,
            },
            creditsP2: 7.5,
          },
        ],
        applicationCodes: [
          {
            applicationCode: "50036",
            term: "20242",
            courseRoundType: {
              code: "ORD",
              name: "Programutbildning",
              active: true,
              category: "PU",
            },
            avgFri: false,
          },
        ],
        startTerm: {
          term: 20242,
        },
        isPU: true,
        isVU: false,
        startWeek: {
          year: 2024,
          week: 44,
        },
        endWeek: {
          year: 2025,
          week: 3,
        },
        startDate: "Oct 28, 2024 12:00:00 AM",
        firstTuitionDate: "2024-10-28",
        lastTuitionDate: "2025-01-13",
        studyPace: 50,
      },
    },
    {
      lectureCount: 21,
      excerciseCount: 28,
      usage: [
        {
          specCode: "TEMI",
          programmeCode: "CLGYM",
          progAdmissionTerm: {
            term: 20222,
          },
          studyYear: 2,
          title: "Civilingenjör och lärare",
          electiveCondition: {
            ordinal: 1,
            name: "O" as CourseRequiredForProgram,
            abbrLabel: "Obligatorisk",
          },
        },
        {
          programmeCode: "CDEPR",
          progAdmissionTerm: {
            term: 20232,
          },
          studyYear: 1,
          title: "Civilingenjörsutbildning i design och produktframtagning",
          electiveCondition: {
            ordinal: 1,
            name: "O" as CourseRequiredForProgram,
            abbrLabel: "Obligatorisk",
          },
        },
        {
          programmeCode: "CENMI",
          progAdmissionTerm: {
            term: 20232,
          },
          studyYear: 1,
          title: "Civilingenjörsutbildning i energi och miljö",
          electiveCondition: {
            ordinal: 1,
            name: "O" as CourseRequiredForProgram,
            abbrLabel: "Obligatorisk",
          },
        },
      ],
      timeslots: "",
      hasTimeslots: false,
      schemaUrl:
        "https://www.kth.se/social/course/SF1624/subgroup/ht-2023-cdepr1-mfl-2/calendar/",
      ldapResponsibles: [
        {
          kthid: "u1tqa5gd",
          givenName: "Maria",
          lastName: "Saprykina",
          email: "masha@kth.se",
          username: "masha",
        },
      ],
      ldapTeachers: [
        {
          kthid: "u1tqa5gd",
          givenName: "Maria",
          lastName: "Saprykina",
          email: "masha@kth.se",
          username: "masha",
        },
      ],
      round: {
        ladokRoundId: "1",
        ladokUID: "a7f6a5be-7d23-11ed-ba16-099432b5488e",
        state: "APPROVED",
        tutoringTimeOfDay: {
          name: "DAG",
          key: "tutoringtime.DAG",
        },
        municipalityCode: "KTHCAMPUS",
        tutoringForm: {
          name: "NML",
          key: "tutoringform.NML",
        },
        shortName: "CDEPR1 m.fl.",
        campus: {
          name: "KTH Campus",
          label: "KTH Campus",
        },
        selectionCriteriaSv: "<p></p>",
        selectionCriteriaEn: "<p></p>",
        language: "Svenska",
        targetGroup: "<p>CDEPR1</p><p>CENMI1</p><p>CLGYM TEMI2</p>",
        draftCourseRoundType: {
          code: "ORD",
          name: "Programutbildning",
          active: true,
          category: "PU",
        },
        courseRoundTerms: [
          {
            formattedPeriodsAndCredits: "P1 (7,5 hp)",
            term: {
              term: 20232,
            },
            startWeek: {
              year: 2023,
              week: 35,
            },
            endWeek: {
              year: 2023,
              week: 43,
            },
            creditsP1: 7.5,
          },
        ],
        applicationCodes: [
          {
            applicationCode: "51754",
            term: "20232",
            courseRoundType: {
              code: "ORD",
              name: "Programutbildning",
              active: true,
              category: "PU",
            },
            avgFri: false,
            admissionRoundCode: "AKH23",
          },
        ],
        startTerm: {
          term: 20232,
        },
        isPU: true,
        isVU: false,
        startWeek: {
          year: 2023,
          week: 35,
        },
        endWeek: {
          year: 2023,
          week: 43,
        },
        startDate: "Aug 28, 2023 12:00:00 AM",
        firstTuitionDate: "2023-08-28",
        lastTuitionDate: "2023-10-27",
        studyPace: 50,
      },
    },
    {
      lectureCount: 21,
      excerciseCount: 56,
      usage: [
        {
          specCode: "MAKE",
          programmeCode: "CLGYM",
          progAdmissionTerm: {
            term: 20222,
          },
          studyYear: 2,
          title: "Civilingenjör och lärare",
          electiveCondition: {
            ordinal: 1,
            name: "O" as CourseRequiredForProgram,
            abbrLabel: "Obligatorisk",
          },
        },
        {
          specCode: "TEDA",
          programmeCode: "CLGYM",
          progAdmissionTerm: {
            term: 20222,
          },
          studyYear: 2,
          title: "Civilingenjör och lärare",
          electiveCondition: {
            ordinal: 1,
            name: "O" as CourseRequiredForProgram,
            abbrLabel: "Obligatorisk",
          },
        },
        {
          programmeCode: "CMATD",
          progAdmissionTerm: {
            term: 20232,
          },
          studyYear: 1,
          title: "Civilingenjörsutbildning i materialdesign",
          electiveCondition: {
            ordinal: 1,
            name: "O" as CourseRequiredForProgram,
            abbrLabel: "Obligatorisk",
          },
        },
        {
          programmeCode: "CSAMH",
          progAdmissionTerm: {
            term: 20232,
          },
          studyYear: 1,
          title: "Civilingenjörsutbildning i samhällsbyggnad",
          electiveCondition: {
            ordinal: 1,
            name: "O" as CourseRequiredForProgram,
            abbrLabel: "Obligatorisk",
          },
        },
        {
          programmeCode: "CTKEM",
          progAdmissionTerm: {
            term: 20232,
          },
          studyYear: 1,
          title: "Civilingenjörsutbildning i teknisk kemi",
          electiveCondition: {
            ordinal: 1,
            name: "O" as CourseRequiredForProgram,
            abbrLabel: "Obligatorisk",
          },
        },
      ],
      timeslots: "",
      hasTimeslots: false,
      schemaUrl:
        "https://www.kth.se/social/course/SF1624/subgroup/ht-2023-cmatd1-mfl-2/calendar/",
      ldapResponsibles: [
        {
          kthid: "u1tyze7e",
          givenName: "Tommy",
          lastName: "Ekola",
          email: "ekola@kth.se",
          username: "ekola",
        },
      ],
      ldapTeachers: [
        {
          kthid: "u1tyze7e",
          givenName: "Tommy",
          lastName: "Ekola",
          email: "ekola@kth.se",
          username: "ekola",
        },
      ],
      round: {
        ladokRoundId: "2",
        ladokUID: "b52ebdc6-7d23-11ed-ba16-099432b5488e",
        state: "APPROVED",
        tutoringTimeOfDay: {
          name: "DAG",
          key: "tutoringtime.DAG",
        },
        municipalityCode: "KTHCAMPUS",
        tutoringForm: {
          name: "NML",
          key: "tutoringform.NML",
        },
        shortName: "CMATD1 m.fl.",
        campus: {
          name: "KTH Campus",
          label: "KTH Campus",
        },
        selectionCriteriaSv: "<p></p>",
        selectionCriteriaEn: "<p></p>",
        language: "Svenska",
        draftCourseRoundType: {
          code: "ORD",
          name: "Programutbildning",
          active: true,
          category: "PU",
        },
        courseRoundTerms: [
          {
            formattedPeriodsAndCredits: "P2 (7,5 hp)",
            term: {
              term: 20232,
            },
            startWeek: {
              year: 2023,
              week: 44,
            },
            endWeek: {
              year: 2024,
              week: 3,
            },
            creditsP2: 7.5,
          },
        ],
        applicationCodes: [
          {
            applicationCode: "51446",
            term: "20232",
            courseRoundType: {
              code: "ORD",
              name: "Programutbildning",
              active: true,
              category: "PU",
            },
            avgFri: false,
            admissionRoundCode: "AKH23",
          },
        ],
        startTerm: {
          term: 20232,
        },
        isPU: true,
        isVU: false,
        startWeek: {
          year: 2023,
          week: 44,
        },
        endWeek: {
          year: 2024,
          week: 3,
        },
        startDate: "Oct 30, 2023 12:00:00 AM",
        firstTuitionDate: "2023-10-30",
        lastTuitionDate: "2024-01-15",
        studyPace: 50,
      },
    },
    {
      lectureCount: 21,
      excerciseCount: 14,
      usage: [
        {
          programmeCode: "CDATE",
          progAdmissionTerm: {
            term: 20232,
          },
          studyYear: 1,
          title: "Civilingenjörsutbildning i datateknik",
          electiveCondition: {
            ordinal: 1,
            name: "O" as CourseRequiredForProgram,
            abbrLabel: "Obligatorisk",
          },
        },
      ],
      timeslots: "",
      hasTimeslots: false,
      schemaUrl:
        "https://www.kth.se/social/course/SF1624/subgroup/ht-2023-cdate1/calendar/",
      ldapResponsibles: [
        {
          kthid: "u1tqa5gd",
          givenName: "Maria",
          lastName: "Saprykina",
          email: "masha@kth.se",
          username: "masha",
        },
      ],
      ldapTeachers: [
        {
          kthid: "u1tqa5gd",
          givenName: "Maria",
          lastName: "Saprykina",
          email: "masha@kth.se",
          username: "masha",
        },
      ],
      round: {
        ladokRoundId: "3",
        ladokUID: "c0245ffa-7d23-11ed-ba16-099432b5488e",
        state: "APPROVED",
        tutoringTimeOfDay: {
          name: "DAG",
          key: "tutoringtime.DAG",
        },
        municipalityCode: "KTHCAMPUS",
        tutoringForm: {
          name: "NML",
          key: "tutoringform.NML",
        },
        shortName: "CDATE1",
        campus: {
          name: "KTH Campus",
          label: "KTH Campus",
        },
        selectionCriteriaSv: "<p></p>",
        selectionCriteriaEn: "<p></p>",
        language: "Svenska",
        targetGroup: "<p>CDATE1</p>",
        draftCourseRoundType: {
          code: "ORD",
          name: "Programutbildning",
          active: true,
          category: "PU",
        },
        courseRoundTerms: [
          {
            formattedPeriodsAndCredits: "P2 (7,5 hp)",
            term: {
              term: 20232,
            },
            startWeek: {
              year: 2023,
              week: 44,
            },
            endWeek: {
              year: 2024,
              week: 3,
            },
            creditsP2: 7.5,
          },
        ],
        applicationCodes: [
          {
            applicationCode: "51350",
            term: "20232",
            courseRoundType: {
              code: "ORD",
              name: "Programutbildning",
              active: true,
              category: "PU",
            },
            avgFri: false,
            admissionRoundCode: "AKH23",
          },
        ],
        startTerm: {
          term: 20232,
        },
        isPU: true,
        isVU: false,
        startWeek: {
          year: 2023,
          week: 44,
        },
        endWeek: {
          year: 2024,
          week: 3,
        },
        startDate: "Oct 30, 2023 12:00:00 AM",
        firstTuitionDate: "2023-10-30",
        lastTuitionDate: "2024-01-15",
        studyPace: 50,
      },
    },
    {
      lectureCount: 21,
      excerciseCount: 14,
      usage: [
        {
          programmeCode: "CMEDT",
          progAdmissionTerm: {
            term: 20232,
          },
          studyYear: 1,
          title: "Civilingenjörsutbildning i medicinsk teknik",
          electiveCondition: {
            ordinal: 1,
            name: "O" as CourseRequiredForProgram,
            abbrLabel: "Obligatorisk",
          },
        },
      ],
      timeslots: "",
      hasTimeslots: false,
      schemaUrl:
        "https://www.kth.se/social/course/SF1624/subgroup/ht-2023-cmedt1-2/calendar/",
      ldapResponsibles: [
        {
          kthid: "u15s7f5r",
          givenName: "Sonja",
          lastName: "Radosavljevic",
          email: "sonjara@kth.se",
          username: "sonjara",
        },
      ],
      ldapTeachers: [
        {
          kthid: "u15s7f5r",
          givenName: "Sonja",
          lastName: "Radosavljevic",
          email: "sonjara@kth.se",
          username: "sonjara",
        },
      ],
      round: {
        ladokRoundId: "4",
        ladokUID: "cd389c53-7d23-11ed-ba16-099432b5488e",
        state: "APPROVED",
        tutoringTimeOfDay: {
          name: "DAG",
          key: "tutoringtime.DAG",
        },
        municipalityCode: "KTHCAMPUS",
        tutoringForm: {
          name: "NML",
          key: "tutoringform.NML",
        },
        shortName: "CMEDT1",
        campus: {
          name: "KTH Campus",
          label: "KTH Campus",
        },
        selectionCriteriaSv: "<p></p>",
        selectionCriteriaEn: "<p></p>",
        language: "Svenska",
        draftCourseRoundType: {
          code: "ORD",
          name: "Programutbildning",
          active: true,
          category: "PU",
        },
        courseRoundTerms: [
          {
            formattedPeriodsAndCredits: "P2 (7,5 hp)",
            term: {
              term: 20232,
            },
            startWeek: {
              year: 2023,
              week: 44,
            },
            endWeek: {
              year: 2024,
              week: 3,
            },
            creditsP2: 7.5,
          },
        ],
        applicationCodes: [
          {
            applicationCode: "51279",
            term: "20232",
            courseRoundType: {
              code: "ORD",
              name: "Programutbildning",
              active: true,
              category: "PU",
            },
            avgFri: false,
            admissionRoundCode: "AKH23",
          },
        ],
        startTerm: {
          term: 20232,
        },
        isPU: true,
        isVU: false,
        startWeek: {
          year: 2023,
          week: 44,
        },
        endWeek: {
          year: 2024,
          week: 3,
        },
        startDate: "Oct 30, 2023 12:00:00 AM",
        firstTuitionDate: "2023-10-30",
        lastTuitionDate: "2024-01-15",
        studyPace: 50,
      },
    },
    {
      lectureCount: 21,
      excerciseCount: 14,
      usage: [
        {
          programmeCode: "CITEH",
          progAdmissionTerm: {
            term: 20232,
          },
          studyYear: 1,
          title: "Civilingenjörsutbildning i industriell teknik och hållbarhet",
          electiveCondition: {
            ordinal: 1,
            name: "O" as CourseRequiredForProgram,
            abbrLabel: "Obligatorisk",
          },
        },
      ],
      timeslots: "",
      hasTimeslots: false,
      schemaUrl:
        "https://www.kth.se/social/course/SF1624/subgroup/ht-2023-citeh1-2/calendar/",
      ldapResponsibles: [
        {
          kthid: "u1ylahac",
          givenName: "Albin",
          lastName: "Eriksson Östman",
          email: "albin01@kth.se",
          username: "albin01",
        },
      ],
      ldapTeachers: [
        {
          kthid: "u1ylahac",
          givenName: "Albin",
          lastName: "Eriksson Östman",
          email: "albin01@kth.se",
          username: "albin01",
        },
      ],
      round: {
        ladokRoundId: "5",
        ladokUID: "d82f76e2-7d23-11ed-ba16-099432b5488e",
        state: "APPROVED",
        tutoringTimeOfDay: {
          name: "DAG",
          key: "tutoringtime.DAG",
        },
        municipalityCode: "KTHCAMPUS",
        tutoringForm: {
          name: "NML",
          key: "tutoringform.NML",
        },
        shortName: "CITEH1",
        campus: {
          name: "KTH Campus",
          label: "KTH Campus",
        },
        selectionCriteriaSv: "<p></p>",
        selectionCriteriaEn: "<p></p>",
        language: "Svenska",
        draftCourseRoundType: {
          code: "ORD",
          name: "Programutbildning",
          active: true,
          category: "PU",
        },
        courseRoundTerms: [
          {
            formattedPeriodsAndCredits: "P2 (7,5 hp)",
            term: {
              term: 20232,
            },
            startWeek: {
              year: 2023,
              week: 44,
            },
            endWeek: {
              year: 2024,
              week: 3,
            },
            creditsP2: 7.5,
          },
        ],
        applicationCodes: [
          {
            applicationCode: "50075",
            term: "20232",
            courseRoundType: {
              code: "ORD",
              name: "Programutbildning",
              active: true,
              category: "PU",
            },
            avgFri: false,
            admissionRoundCode: "AKH23",
          },
        ],
        startTerm: {
          term: 20232,
        },
        isPU: true,
        isVU: false,
        startWeek: {
          year: 2023,
          week: 44,
        },
        endWeek: {
          year: 2024,
          week: 3,
        },
        startDate: "Oct 30, 2023 12:00:00 AM",
        firstTuitionDate: "2023-10-30",
        lastTuitionDate: "2024-01-15",
        studyPace: 50,
      },
    },
    {
      lectureCount: 21,
      excerciseCount: 28,
      usage: [
        {
          programmeCode: "CBIOT",
          progAdmissionTerm: {
            term: 20222,
          },
          studyYear: 2,
          title: "Civilingenjörsutbildning i bioteknik",
          electiveCondition: {
            ordinal: 1,
            name: "O" as CourseRequiredForProgram,
            abbrLabel: "Obligatorisk",
          },
        },
        {
          programmeCode: "CMAST",
          progAdmissionTerm: {
            term: 20232,
          },
          studyYear: 1,
          title: "Civilingenjörsutbildning i maskinteknik",
          electiveCondition: {
            ordinal: 1,
            name: "O" as CourseRequiredForProgram,
            abbrLabel: "Obligatorisk",
          },
        },
      ],
      timeslots: "",
      hasTimeslots: false,
      schemaUrl:
        "https://www.kth.se/social/course/SF1624/subgroup/ht-2023-cbiot2-mfl/calendar/",
      ldapResponsibles: [
        {
          kthid: "u1tqa5gd",
          givenName: "Maria",
          lastName: "Saprykina",
          email: "masha@kth.se",
          username: "masha",
        },
      ],
      ldapTeachers: [
        {
          kthid: "u1tqa5gd",
          givenName: "Maria",
          lastName: "Saprykina",
          email: "masha@kth.se",
          username: "masha",
        },
      ],
      round: {
        ladokRoundId: "6",
        ladokUID: "e5e12c14-7d23-11ed-ba16-099432b5488e",
        state: "APPROVED",
        tutoringTimeOfDay: {
          name: "DAG",
          key: "tutoringtime.DAG",
        },
        municipalityCode: "KTHCAMPUS",
        tutoringForm: {
          name: "NML",
          key: "tutoringform.NML",
        },
        shortName: "CBIOT2 m.fl.",
        campus: {
          name: "KTH Campus",
          label: "KTH Campus",
        },
        selectionCriteriaSv: "<p></p>",
        selectionCriteriaEn: "<p></p>",
        language: "Svenska",
        draftCourseRoundType: {
          code: "ORD",
          name: "Programutbildning",
          active: true,
          category: "PU",
        },
        courseRoundTerms: [
          {
            formattedPeriodsAndCredits: "P1 (7,5 hp)",
            term: {
              term: 20232,
            },
            startWeek: {
              year: 2023,
              week: 35,
            },
            endWeek: {
              year: 2023,
              week: 43,
            },
            creditsP1: 7.5,
          },
        ],
        applicationCodes: [
          {
            applicationCode: "50264",
            term: "20232",
            courseRoundType: {
              code: "ORD",
              name: "Programutbildning",
              active: true,
              category: "PU",
            },
            avgFri: false,
            admissionRoundCode: "AKH23",
          },
        ],
        startTerm: {
          term: 20232,
        },
        isPU: true,
        isVU: false,
        startWeek: {
          year: 2023,
          week: 35,
        },
        endWeek: {
          year: 2023,
          week: 43,
        },
        startDate: "Aug 28, 2023 12:00:00 AM",
        firstTuitionDate: "2023-08-28",
        lastTuitionDate: "2023-10-27",
        studyPace: 50,
      },
    },
    {
      lectureCount: 21,
      excerciseCount: 28,
      usage: [
        {
          programmeCode: "CELTE",
          progAdmissionTerm: {
            term: 20232,
          },
          studyYear: 1,
          title: "Civilingenjörsutbildning i elektroteknik",
          electiveCondition: {
            ordinal: 1,
            name: "O" as CourseRequiredForProgram,
            abbrLabel: "Obligatorisk",
          },
        },
        {
          programmeCode: "CINEK",
          progAdmissionTerm: {
            term: 20232,
          },
          studyYear: 1,
          title: "Civilingenjörsutbildning i industriell ekonomi",
          electiveCondition: {
            ordinal: 1,
            name: "O" as CourseRequiredForProgram,
            abbrLabel: "Obligatorisk",
          },
        },
      ],
      timeslots: "",
      hasTimeslots: false,
      schemaUrl:
        "https://www.kth.se/social/course/SF1624/subgroup/ht-2023-celte1-mfl-2/calendar/",
      ldapResponsibles: [
        {
          kthid: "u1lvdahr",
          givenName: "Lars",
          lastName: "Filipsson",
          email: "lfn@kth.se",
          username: "lfn",
        },
      ],
      ldapTeachers: [
        {
          kthid: "u1lvdahr",
          givenName: "Lars",
          lastName: "Filipsson",
          email: "lfn@kth.se",
          username: "lfn",
        },
      ],
      round: {
        ladokRoundId: "7",
        ladokUID: "f0a86bb1-7d23-11ed-ba16-099432b5488e",
        state: "APPROVED",
        tutoringTimeOfDay: {
          name: "DAG",
          key: "tutoringtime.DAG",
        },
        municipalityCode: "KTHCAMPUS",
        tutoringForm: {
          name: "NML",
          key: "tutoringform.NML",
        },
        shortName: "CELTE1 m.fl.",
        campus: {
          name: "KTH Campus",
          label: "KTH Campus",
        },
        selectionCriteriaSv: "<p></p>",
        selectionCriteriaEn: "<p></p>",
        language: "Svenska",
        targetGroup: "<p>CELTE1</p><p>CINEK1</p>",
        draftCourseRoundType: {
          code: "ORD",
          name: "Programutbildning",
          active: true,
          category: "PU",
        },
        courseRoundTerms: [
          {
            formattedPeriodsAndCredits: "P2 (7,5 hp)",
            term: {
              term: 20232,
            },
            startWeek: {
              year: 2023,
              week: 44,
            },
            endWeek: {
              year: 2024,
              week: 3,
            },
            creditsP2: 7.5,
          },
        ],
        applicationCodes: [
          {
            applicationCode: "50818",
            term: "20232",
            courseRoundType: {
              code: "ORD",
              name: "Programutbildning",
              active: true,
              category: "PU",
            },
            avgFri: false,
            admissionRoundCode: "AKH23",
          },
        ],
        startTerm: {
          term: 20232,
        },
        isPU: true,
        isVU: false,
        startWeek: {
          year: 2023,
          week: 44,
        },
        endWeek: {
          year: 2024,
          week: 3,
        },
        startDate: "Oct 30, 2023 12:00:00 AM",
        firstTuitionDate: "2023-10-30",
        lastTuitionDate: "2024-01-15",
        studyPace: 50,
      },
    },
    {
      lectureCount: 21,
      excerciseCount: 28,
      usage: [
        {
          programmeCode: "CMETE",
          progAdmissionTerm: {
            term: 20232,
          },
          studyYear: 1,
          title: "Civilingenjörsutbildning i medieteknik",
          electiveCondition: {
            ordinal: 1,
            name: "O" as CourseRequiredForProgram,
            abbrLabel: "Obligatorisk",
          },
        },
        {
          programmeCode: "COPEN",
          progAdmissionTerm: {
            term: 20232,
          },
          studyYear: 1,
          title: "Civilingenjörsutbildning öppen ingång",
          electiveCondition: {
            ordinal: 1,
            name: "O" as CourseRequiredForProgram,
            abbrLabel: "Obligatorisk",
          },
        },
      ],
      timeslots: "",
      hasTimeslots: false,
      schemaUrl:
        "https://www.kth.se/social/course/SF1624/subgroup/ht-2023-cmete1-mfl-2/calendar/",
      ldapResponsibles: [
        {
          kthid: "u1lvdahr",
          givenName: "Lars",
          lastName: "Filipsson",
          email: "lfn@kth.se",
          username: "lfn",
        },
      ],
      ldapTeachers: [
        {
          kthid: "u1lvdahr",
          givenName: "Lars",
          lastName: "Filipsson",
          email: "lfn@kth.se",
          username: "lfn",
        },
      ],
      round: {
        ladokRoundId: "8",
        ladokUID: "fb94225b-7d23-11ed-ba16-099432b5488e",
        state: "APPROVED",
        tutoringTimeOfDay: {
          name: "DAG",
          key: "tutoringtime.DAG",
        },
        municipalityCode: "KTHCAMPUS",
        tutoringForm: {
          name: "NML",
          key: "tutoringform.NML",
        },
        shortName: "CMETE1 m.fl.",
        campus: {
          name: "KTH Campus",
          label: "KTH Campus",
        },
        selectionCriteriaSv: "<p></p>",
        selectionCriteriaEn: "<p></p>",
        language: "Svenska",
        draftCourseRoundType: {
          code: "ORD",
          name: "Programutbildning",
          active: true,
          category: "PU",
        },
        courseRoundTerms: [
          {
            formattedPeriodsAndCredits: "P2 (7,5 hp)",
            term: {
              term: 20232,
            },
            startWeek: {
              year: 2023,
              week: 44,
            },
            endWeek: {
              year: 2024,
              week: 3,
            },
            creditsP2: 7.5,
          },
        ],
        applicationCodes: [
          {
            applicationCode: "50619",
            term: "20232",
            courseRoundType: {
              code: "ORD",
              name: "Programutbildning",
              active: true,
              category: "PU",
            },
            avgFri: false,
            admissionRoundCode: "AKH23",
          },
        ],
        startTerm: {
          term: 20232,
        },
        isPU: true,
        isVU: false,
        startWeek: {
          year: 2023,
          week: 44,
        },
        endWeek: {
          year: 2024,
          week: 3,
        },
        startDate: "Oct 30, 2023 12:00:00 AM",
        firstTuitionDate: "2023-10-30",
        lastTuitionDate: "2024-01-15",
        studyPace: 50,
      },
    },
    {
      lectureCount: 21,
      excerciseCount: 14,
      usage: [
        {
          programmeCode: "CINTE",
          progAdmissionTerm: {
            term: 20232,
          },
          studyYear: 1,
          title: "Civilingenjörsutbildning i informationsteknik",
          electiveCondition: {
            ordinal: 1,
            name: "O" as CourseRequiredForProgram,
            abbrLabel: "Obligatorisk",
          },
        },
      ],
      timeslots: "",
      hasTimeslots: false,
      schemaUrl:
        "https://www.kth.se/social/course/SF1624/subgroup/ht-2023-cinte1/calendar/",
      ldapResponsibles: [
        {
          kthid: "u1tyze7e",
          givenName: "Tommy",
          lastName: "Ekola",
          email: "ekola@kth.se",
          username: "ekola",
        },
      ],
      ldapTeachers: [
        {
          kthid: "u1tyze7e",
          givenName: "Tommy",
          lastName: "Ekola",
          email: "ekola@kth.se",
          username: "ekola",
        },
      ],
      round: {
        ladokRoundId: "9",
        ladokUID: "17f8cf46-7d24-11ed-ba16-099432b5488e",
        state: "APPROVED",
        tutoringTimeOfDay: {
          name: "DAG",
          key: "tutoringtime.DAG",
        },
        municipalityCode: "KISTA",
        tutoringForm: {
          name: "NML",
          key: "tutoringform.NML",
        },
        shortName: "CINTE1",
        campus: {
          name: "KTH Kista",
          label: "KTH Kista",
        },
        selectionCriteriaSv: "<p></p>",
        selectionCriteriaEn: "<p></p>",
        language: "Svenska",
        targetGroup: "<p>CINTE1</p>",
        draftCourseRoundType: {
          code: "ORD",
          name: "Programutbildning",
          active: true,
          category: "PU",
        },
        courseRoundTerms: [
          {
            formattedPeriodsAndCredits: "P2 (7,5 hp)",
            term: {
              term: 20232,
            },
            startWeek: {
              year: 2023,
              week: 44,
            },
            endWeek: {
              year: 2024,
              week: 3,
            },
            creditsP2: 7.5,
          },
        ],
        applicationCodes: [
          {
            applicationCode: "50124",
            term: "20232",
            courseRoundType: {
              code: "ORD",
              name: "Programutbildning",
              active: true,
              category: "PU",
            },
            avgFri: false,
            admissionRoundCode: "AKH23",
          },
        ],
        startTerm: {
          term: 20232,
        },
        isPU: true,
        isVU: false,
        startWeek: {
          year: 2023,
          week: 44,
        },
        endWeek: {
          year: 2024,
          week: 3,
        },
        startDate: "Oct 30, 2023 12:00:00 AM",
        firstTuitionDate: "2023-10-30",
        lastTuitionDate: "2024-01-15",
        studyPace: 50,
      },
    },
  ],
  mainSubjects: ["Matematik", "Teknik"],
  examinationSets: {
    "20072": {
      startingTerm: {
        term: 20072,
      },
      examinationRounds: [
        {
          examCode: "TEN1",
          title: "Tentamen",
          gradeScaleCode: "AF",
          credits: 7.5,
          creditUnitLabel: "Högskolepoäng",
          creditUnitAbbr: "hp",
          ladokUID: "7f20dbb6-73d8-11e8-b4e0-063f9afb40e3",
        },
      ],
    },
  },
  publicSyllabusVersions: [
    {
      edition: 1,
      validFromTerm: {
        term: 20192,
      },
      inStateApproved: true,
      courseSyllabus: {
        discontinuationText:
          "När kurs inte längre ges har student möjlighet att examineras under ytterligare två läsår.",
        goals:
          "<p>Efter genomg&#229;ngen kurs ska studenten kunna</p><ul><li> <p>Anv&#228;nda begrepp, satser och metoder f&#246;r att l&#246;sa, och presentera l&#246;sningen av, problem inom de delar av linj&#228;r algebra som beskrivs av kursinneh&#229;llet.</p></li><li> <p>L&#228;sa och tillgodog&#246;ra sig matematisk text.</p></li></ul>",
        content:
          "<p>Vektorer, matriser, linj&#228;ra ekvationssystem, Gausselimination, vektorgeometri med skal&#228;rprodukt och vektorprodukt, determinanter, vektorrum, linj&#228;rt oberoende, baser, basbyten, linj&#228;r avbildning, minsta-kvadratmetoden, egenv&#228;rden, egenvektorer, kvadratiska former, ortogonalitet, inre-produktrum, Gram-Schmidts metod.</p>",
        eligibility:
          "<p>Grundl&#228;ggande beh&#246;righet.&#160;</p><p><strong><em>&#160;</em></strong></p>",
        literatureComment:
          "<p>Kurslitteraturen ansl&#229;s p&#229; kursens hemsida senast fyra veckor innan kursstart.</p>",
        examComments:
          "Examinator beslutar, baserat på rekommendation från KTH:s handläggare av stöd till studenter med funktionsnedsättning, om eventuell anpassad examination för studenter med dokumenterad, varaktig funktionsnedsättning. <br><br>Examinator får medge annan examinationsform vid omexamination av enstaka studenter.<p>Examinator beslutar, i samr&#229;d med KTH:s samordnare f&#246;r funktionsneds&#228;ttning (Funka), om eventuell anpassad examination f&#246;r studenter med dokumenterad, varaktig funktionsneds&#228;ttning.&#160;</p>",
        reqsForFinalGrade:
          "<p>Skriftlig tentamen, eventuellt med m&#246;jlighet till kontinuerlig examination.</p>",
        establishment: "Kursplan för SF1624 gäller från och med HT19",
        languageOfInstruction:
          "Undervisningsspråk anges i kurstillfällesinformationen i kurs- och programkatalogen.",
        ethicalApproach:
          "<ul><li>Vid grupparbete har alla i gruppen ansvar för gruppens arbete.</li><li>Vid examination ska varje student ärligt redovisa hjälp som erhållits och källor som använts.</li><li>Vid muntlig examination ska varje student kunna redogöra för hela uppgiften och hela lösningen.</li></ul>",
        courseSyllabusVersionValidFromTerm: {
          term: 20192,
        },
      },
    },
    {
      edition: 2,
      validFromTerm: {
        term: 20102,
      },
      inStateApproved: true,
      courseSyllabus: {
        discontinuationText:
          "När kurs inte längre ges har student möjlighet att examineras under ytterligare två läsår.",
        goals:
          "<p>Efter genomg&#229;ngen kurs ska studenten f&#246;r godk&#228;nt betyg kunna&#160;&#160;</p><ul><li>Anv&#228;nda de grundl&#228;ggande begreppen och probleml&#246;sningsmetoderna inom linj&#228;r algebra och geometri. S&#228;rskilt inneb&#228;r det att kunna:<br />- F&#246;rst&#229;, tolka och anv&#228;nda grundbegreppen: vektorrummet Rn, underrum av Rn, linj&#228;rt beroende och oberoende, bas, dimension, linj&#228;r avbildning, matris, determinant, egenv&#228;rde och egenvektor.<br />- L&#246;sa geometriska problem i tv&#229; och tre dimensioner med hj&#228;lp av exempelvis vektorer, skal&#228;rprodukt, vektorprodukt, trippelprodukt och projektion.<br />- Anv&#228;nda Gauss-Jordans metod f&#246;r att exempelvis l&#246;sa linj&#228;ra ekvationssystem, ber&#228;kna inversmatriser, determinanter och avg&#246;ra fr&#229;gor om linj&#228;rt oberoende.<br />-&#160; Anv&#228;nda matris- och determinantkalkyl f&#246;r att hantera fr&#229;gest&#228;llningar kring linj&#228;ra avbildningar och linj&#228;ra ekvationssystem.<br />- Anv&#228;nda minsta-kvadratmetoden f&#246;r att exempelvis l&#246;sa problem med &#246;verbest&#228;mda linj&#228;ra ekvationssystem.<br />- Anv&#228;nda olika baser f&#246;r vektorrum f&#246;r att hantera vektorer och linj&#228;ra avbildningar, samt att hantera basbyten och linj&#228;ra koordinattransformationer.<br />- Ber&#228;kna egenv&#228;rden och egenvektorer och anv&#228;nda detta f&#246;r att exempelvis diagonalisera matriser, studera kvadratiska former, andragradskurvor i planet och andragradsytor i rummet.<br />- Anv&#228;nda den Euklidiska inre produkten f&#246;r att hantera fr&#229;gor om avst&#229;nd, ortogonalitet och projektion, samt till&#228;mpa Gram-Schmidts metod f&#246;r att ber&#228;kna ortogonala baser f&#246;r underrum.</li><li>St&#228;lla upp enklare matematiska modeller d&#228;r grundbegreppen inom linj&#228;r algebra och geometri kommer till anv&#228;ndning, diskutera s&#229;dana modellers relevans, rimlighet och noggrannhet, samt k&#228;nna till hur matematisk programvara kan anv&#228;ndas f&#246;r att ber&#228;kningar och visualisering.</li><li>L&#228;sa och tillgodog&#246;ra sig matematisk text om exempelvis vektorer, matriser, linj&#228;ra avbildningar och deras till&#228;mpningar, kommunicera matematiska resonemang och ber&#228;kningar inom detta omr&#229;de muntligt och skriftligt p&#229; ett s&#229;dant s&#228;tt att de &#228;r l&#228;tta att f&#246;lja.</li></ul><p>F&#246;r h&#246;gre betyg ska studenten dessutom kunna:</p><ul><li>Hantera allm&#228;nna vektorrum, exempelvis funktionsrum eller vektorrum av matriser.</li><li>Anv&#228;nda andra inre produkter &#228;n den Euklidiska inre produkten.</li><li>H&#228;rleda viktiga samband inom linj&#228;r algebra och geometri.</li><li>Generalisera och anpassa metoderna f&#246;r att anv&#228;nda i delvis nya sammanhang.</li><li>L&#246;sa problem som kr&#228;ver syntes av material och id&#233;er fr&#229;n hela kursen.</li><li>Redog&#246;ra f&#246;r teorin bakom begrepp som exempelvis egenv&#228;rde och ortogonalitet.</li></ul>",
        content:
          "<p>Vektorer, matriser, linj&#228;ra ekvationssystem, Gausselimination, vektorgeometri med skal&#228;rprodukt och vektorprodukt, determinanter, vektorrum, linj&#228;rt oberoende, baser, basbyten, minsta-kvadratmetoden, egenv&#228;rden, egenvektorer, kvadratiska former, ortogonalitet, inre-produktrum, Gram-Schmidts metod</p>",
        eligibility:
          "<p>Grundl&#228;ggande och s&#228;rskild beh&#246;righet f&#246;r civilingenj&#246;rsprogram.</p><p><strong><em>Obligatorisk f&#246;r &#229;k1, kan ej l&#228;sas av andra studenter</em></strong></p>",
        examComments:
          "Examinator beslutar, baserat på rekommendation från KTH:s handläggare av stöd till studenter med funktionsnedsättning, om eventuell anpassad examination för studenter med dokumenterad, varaktig funktionsnedsättning. <br><br>Examinator får medge annan examinationsform vid omexamination av enstaka studenter.",
        reqsForFinalGrade:
          "<p>Skriftlig tentamen, eventuellt med m&#246;jlighet till kontinuerlig examination.</p>",
        establishment: "Kursplan för SF1624 gäller från och med HT10",
        languageOfInstruction:
          "Undervisningsspråk anges i kurstillfällesinformationen i kurs- och programkatalogen.",
        ethicalApproach:
          "<ul><li>Vid grupparbete har alla i gruppen ansvar för gruppens arbete.</li><li>Vid examination ska varje student ärligt redovisa hjälp som erhållits och källor som använts.</li><li>Vid muntlig examination ska varje student kunna redogöra för hela uppgiften och hela lösningen.</li></ul>",
        courseSyllabusVersionValidFromTerm: {
          term: 20102,
        },
      },
    },
    {
      edition: 1,
      validFromTerm: {
        term: 20092,
      },
      inStateApproved: true,
      courseSyllabus: {
        discontinuationText:
          "När kurs inte längre ges har student möjlighet att examineras under ytterligare två läsår.",
        goals:
          "<p>Efter genomg&#229;ngen kurs ska studenten vara f&#246;rtrogen med grundl&#228;ggande algebra och linj&#228;r algebra. Det inneb&#228;r att studenten ska kunna:</p><p>-R&#228;kna med komplexa tal</p><p>-L&#246;sa polynomekvationer med hj&#228;lp av faktorsatsen</p><p>-Genomf&#246;ra enklare induktionsbevis</p><p>-F&#246;rst&#229;, tolka och anv&#228;nda grundbegreppen: det linj&#228;ra rummet R^n, linj&#228;rt beroende och oberoende, bas, linj&#228;r avbildning, matris, determinant, egenv&#228;rde och egenvektor</p><p>-L&#246;sa linj&#228;ra ekvationssystem med Gauss-Jordans metod</p><p>-F&#246;rst&#229; och beh&#228;rska grundl&#228;ggande matriskalkyl och determinantkalkyl</p><p>-Anv&#228;nda minstakvadratmetoden f&#246;r att l&#246;sa &#246;verbest&#228;mda ekvationssystem.</p><p>-Ber&#228;kna egenv&#228;rden och motsvarande egenvektorer och anv&#228;nda dem f&#246;r att diagonalisera matriser</p><p>-Anv&#228;nda skal&#228;rprodukt och vektorprodukt f&#246;r att l&#246;sa geometriska problem i planet och rummet</p><p>Dessutom ska studenten ha till&#228;gnat sig n&#229;gra &#246;vergripande kunskaper och insikter, till exempel</p><p>-Ha f&#229;tt en inledande tr&#228;ning p&#229; att genomf&#246;ra matematiska resonemang och presentera matematik muntligt och skriftligt</p><p>-Ha f&#229;tt n&#229;gon tr&#228;ning p&#229; att st&#228;lla upp matematiska modeller f&#246;r verkliga f&#246;rlopp i termer av de grundl&#228;ggande begreppen, tolka resultat och g&#246;ra rimlighetsbed&#246;mningar</p><p>-Ha inblick i hur n&#229;gra matematiska verktyg och matematiskt t&#228;nkande kommer till anv&#228;ndning inom n&#229;gra till&#228;mpningar som ligger utbildningen n&#228;ra</p>",
        content:
          "<p>Komplexa tal, polynom, induktionsbevis. Linj&#228;ra ekvationssystem, matriser och determinanter; Cramers regel. Invers matris. Vektorprodukt, skal&#228;rprodukt och geometri i R2 och R3 , r&#228;ta linjer och plan. Gram-Schmidts metod och projektioner. Linj&#228;ra avbildningar, egenv&#228;rden och egenvektorer, Basbyten och matrisrepresentation av linj&#228;ra avbildningar. Diagonalisering av matriser.</p>",
        eligibility:
          "<p>Allm&#228;n och s&#228;rskild beh&#246;righet f&#246;r civilingenj&#246;rsprogram.</p><p><strong><em>Obligatorisk f&#246;r &#229;k1, kan ej l&#228;sas av andra studenter</em></strong></p>",
        examComments:
          "Examinator beslutar, baserat på rekommendation från KTH:s handläggare av stöd till studenter med funktionsnedsättning, om eventuell anpassad examination för studenter med dokumenterad, varaktig funktionsnedsättning. <br><br>Examinator får medge annan examinationsform vid omexamination av enstaka studenter.",
        reqsForFinalGrade:
          "<p>Skriftlig tentamen, eventuellt med m&#246;jlighet till kontinuerlig examination.</p>",
        establishment: "Kursplan för SF1624 gäller från och med HT09",
        languageOfInstruction:
          "Undervisningsspråk anges i kurstillfällesinformationen i kurs- och programkatalogen.",
        ethicalApproach:
          "<ul><li>Vid grupparbete har alla i gruppen ansvar för gruppens arbete.</li><li>Vid examination ska varje student ärligt redovisa hjälp som erhållits och källor som använts.</li><li>Vid muntlig examination ska varje student kunna redogöra för hela uppgiften och hela lösningen.</li></ul>",
        courseSyllabusVersionValidFromTerm: {
          term: 20092,
        },
      },
    },
    {
      edition: 1,
      validFromTerm: {
        term: 20082,
      },
      inStateApproved: true,
      courseSyllabus: {
        discontinuationText:
          "När kurs inte längre ges har student möjlighet att examineras under ytterligare två läsår.",
        goals:
          "<p>Efter genomg&#229;ngen kurs ska studenten vara f&#246;rtrogen med grundl&#228;ggande algebra och linj&#228;r algebra. Det inneb&#228;r att studenten ska kunna: </p><p>-R&#228;kna med komplexa tal </p><p>-L&#246;sa polynomekvationer med hj&#228;lp av faktorsatsen </p><p>-Genomf&#246;ra enklare induktionsbevis </p><p>-F&#246;rst&#229;, tolka och anv&#228;nda grundbegreppen: det linj&#228;ra rummet R^n, linj&#228;rt beroende och oberoende, bas, linj&#228;r avbildning, matris, determinant, egenv&#228;rde och egenvektor </p><p>-L&#246;sa linj&#228;ra ekvationssystem med Gauss-Jordans metod </p><p>-F&#246;rst&#229; och beh&#228;rska grundl&#228;ggande matriskalkyl och determinantkalkyl </p><p>-Anv&#228;nda minstakvadratmetoden f&#246;r att l&#246;sa &#246;verbest&#228;mda ekvationssystem. </p><p>-Ber&#228;kna egenv&#228;rden och motsvarande egenvektorer och anv&#228;nda dem f&#246;r att diagonalisera matriser </p><p>-Anv&#228;nda skal&#228;rprodukt och vektorprodukt f&#246;r att l&#246;sa geometriska problem i planet och rummet </p><p>Dessutom ska studenten ha till&#228;gnat sig n&#229;gra &#246;vergripande kunskaper och insikter, till exempel </p><p>-Ha f&#229;tt en inledande tr&#228;ning p&#229; att genomf&#246;ra matematiska resonemang och presentera matematik muntligt och skriftligt </p><p>-Ha f&#229;tt n&#229;gon tr&#228;ning p&#229; att st&#228;lla upp matematiska modeller f&#246;r verkliga f&#246;rlopp i termer av de grundl&#228;ggande begreppen, tolka resultat och g&#246;ra rimlighetsbed&#246;mningar </p><p>-Ha inblick i hur n&#229;gra matematiska verktyg och matematiskt t&#228;nkande kommer till anv&#228;ndning inom n&#229;gra till&#228;mpningar som ligger utbildningen n&#228;ra</p>",
        content:
          "<p>Komplexa tal, polynom, induktionsbevis. Linj&#228;ra ekvationssystem, matriser och determinanter; Cramers regel. Invers matris. Vektorprodukt, skal&#228;rprodukt och geometri i R2 och R3 , r&#228;ta linjer och plan. Gram-Schmidts metod och projektioner. Linj&#228;ra avbildningar, egenv&#228;rden och egenvektorer, Basbyten och matrisrepresentation av linj&#228;ra avbildningar. Diagonalisering av matriser.</p>",
        eligibility:
          "<p>Allm&#228;n och s&#228;rskild beh&#246;righet f&#246;r civilingenj&#246;rsprogram.</p><p><strong><em>Obligatorisk f&#246;r &#229;k1, kan ej l&#228;sas av andra studenter</em></strong></p>",
        literature:
          "<p>Andersson Lennart m.fl.: Linj&#228;r algebra med geometri. </p>",
        examComments:
          "Examinator beslutar, baserat på rekommendation från KTH:s handläggare av stöd till studenter med funktionsnedsättning, om eventuell anpassad examination för studenter med dokumenterad, varaktig funktionsnedsättning. <br><br>Examinator får medge annan examinationsform vid omexamination av enstaka studenter.",
        reqsForFinalGrade:
          "<p>Skriftlig tentamen, eventuellt med m&#246;jlighet till kontinuerlig examination.</p>",
        establishment: "Kursplan för SF1624 gäller från och med HT08",
        languageOfInstruction:
          "Undervisningsspråk anges i kurstillfällesinformationen i kurs- och programkatalogen.",
        ethicalApproach:
          "<ul><li>Vid grupparbete har alla i gruppen ansvar för gruppens arbete.</li><li>Vid examination ska varje student ärligt redovisa hjälp som erhållits och källor som använts.</li><li>Vid muntlig examination ska varje student kunna redogöra för hela uppgiften och hela lösningen.</li></ul>",
        courseSyllabusVersionValidFromTerm: {
          term: 20082,
        },
      },
    },
  ],
  socialCoursePageUrl: "https://www.kth.se/social/course/SF1624/",
  formattedGradeScales: {
    AF: "A, B, C, D, E, FX, F",
  },
};
