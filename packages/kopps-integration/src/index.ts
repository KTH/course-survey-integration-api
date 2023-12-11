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
      periods: getPeriods(roundInformation),
    },
    syllabus: {
      goals: syllabus.courseSyllabus.goals,
    },
  };
}
