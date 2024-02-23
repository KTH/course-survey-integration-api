import { InvalidLadokUidError, SyllabusNotFoundError } from "./errors";
import type {
  KoppsCourseDetailedInformation,
  KoppsCourseRoundInfo,
  KoppsSyllabus,
} from "./types";

const PERIODS = ["P0", "P1", "P2", "P3", "P4", "P5"] as const;
type Periods = (typeof PERIODS)[number];

/**
 * Return the periods in a round object. Periods are sorted from oldest to
 * latest by the term where the period belongs.
 */
export function getPeriods(roundObject: KoppsCourseRoundInfo) {
  const periods: Periods[] = [];
  const sortedTerms = roundObject.round.courseRoundTerms.sort(
    (t1, t2) => t1.term.term - t2.term.term,
  );

  for (const c of sortedTerms) {
    // Add the number to the "periods" array if the number of credits is higher than 0
    for (const p of PERIODS) {
      const numberOfCredits = c[`credits${p}`];
      if (numberOfCredits && numberOfCredits > 0) {
        periods.push(p);
      }
    }
  }

  return periods;
}

/** Return the course round information given a Ladok UID */
export function getCourseRoundInformation(
  detailedInformation: KoppsCourseDetailedInformation,
  ladokUid: string,
): KoppsCourseRoundInfo {
  const roundInformation = detailedInformation.roundInfos.find(
    (r) => r.round.ladokUID === ladokUid,
  )!;

  if (!roundInformation) {
    throw new InvalidLadokUidError(ladokUid);
  }

  return roundInformation;
}

/** Return the most recent syllabus that is valid in the given term */
export function getSyllabus(
  allSyllabus: KoppsSyllabus[],
  term: number,
): KoppsSyllabus {
  // Filter-out the invalid ones
  const validSyllabus = allSyllabus.filter((s) => s.validFromTerm.term <= term);

  if (validSyllabus.length === 0) {
    throw new SyllabusNotFoundError(term);
  }

  // Take the latest
  return validSyllabus.sort(
    (s1, s2) => s2.validFromTerm.term - s1.validFromTerm.term,
  )[0];
}
