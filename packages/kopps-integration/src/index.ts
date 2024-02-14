import { getCourseDetailedInformation, getCourseRoundSummary } from "./api";
import { getCourseRoundInformation, getPeriods, getSyllabus } from "./utils";

/** Get course round information from its Laodk UID */
export async function getCourseInformation(ladokUid: string) {
  const roundSummary = await getCourseRoundSummary(ladokUid);
  const detailedInformation = await getCourseDetailedInformation(
    roundSummary.course_code,
  );
  const roundInformation = getCourseRoundInformation(
    detailedInformation,
    ladokUid,
  );
  const term = roundInformation.round.startTerm.term;
  const syllabus = getSyllabus(
    detailedInformation.publicSyllabusVersions,
    term,
  );

  return {
    course: {
      name: {
        sv: detailedInformation.course.title,
        en: detailedInformation.course.titleOther,
      },
      code: detailedInformation.course.courseCode,
    },
    round: {
      /** Start year and term. Formatted as XXXXY */
      startTerm: term.toString(10),

      /** Deprecated unique identifier for course rounds (one-digit) */
      code: roundInformation.round.ladokRoundId,
      /**
       * Period information sorted from the "oldest" to the "latest".
       * Example: if the course round includes the periods 2023-P5, 2024-P1 and 2025-P2
       * the function will return [5, 1, 2] in that order
       */
      periods: getPeriods(roundInformation),
    },
    syllabus: {
      goals: syllabus.courseSyllabus.goals,
    },
  };
}
