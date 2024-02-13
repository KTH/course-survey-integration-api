import {
  getCourseRoundInformation,
  getPeriods,
  getSyllabus,
} from "../src/utils";
import type { KoppsCourseRoundInfo, KoppsSyllabus } from "../src/types";
import { SF1624 } from "./fixtures/detailedInformation";

describe("getPeriods", () => {
  test("works with one term", () => {
    const round: KoppsCourseRoundInfo = {
      round: {
        courseRoundTerms: [
          { creditsP0: 1, creditsP1: 2, term: { term: 20232 } },
        ],
        ladokUID: "",
        startTerm: { term: 0 },
      },
    };

    expect(getPeriods(round)).toStrictEqual([0, 1]);
  });

  test("works with no terms", () => {
    const round: KoppsCourseRoundInfo = {
      round: {
        courseRoundTerms: [],
        ladokUID: "",
        startTerm: { term: 0 },
      },
    };

    expect(getPeriods(round)).toStrictEqual([]);
  });

  test("works with two terms", () => {
    const round: KoppsCourseRoundInfo = {
      round: {
        courseRoundTerms: [
          { creditsP2: 2, term: { term: 20231 } },
          { creditsP3: 1, term: { term: 20232 } },
        ],
        ladokUID: "",
        startTerm: { term: 0 },
      },
    };

    expect(getPeriods(round)).toStrictEqual([2, 3]);
  });

  test("works with terms that span multiple years", () => {
    const round: KoppsCourseRoundInfo = {
      round: {
        courseRoundTerms: [
          { creditsP5: 1, term: { term: 20231 } },
          { creditsP1: 1, term: { term: 20241 } },
          { creditsP1: 1, term: { term: 20251 } },
          { creditsP1: 1, term: { term: 20261 } },
        ],
        ladokUID: "",
        startTerm: { term: 0 },
      },
    };

    expect(getPeriods(round)).toStrictEqual([5, 1, 1, 1]);
  });

  test("order in courseRoundTerm array is ignored", () => {
    const round: KoppsCourseRoundInfo = {
      round: {
        courseRoundTerms: [
          { creditsP3: 1, term: { term: 20232 } },
          { creditsP2: 2, term: { term: 20231 } },
        ],
        ladokUID: "",
        startTerm: { term: 0 },
      },
    };

    // Note: "2" must come before "3"
    expect(getPeriods(round)).toStrictEqual([2, 3]);
  });

  test("periods are sorted by term", () => {
    const round: KoppsCourseRoundInfo = {
      round: {
        courseRoundTerms: [
          { creditsP5: 2, term: { term: 20231 } },
          { creditsP0: 1, term: { term: 20232 } },
        ],
        ladokUID: "",
        startTerm: { term: 0 },
      },
    };

    // P5 should come first because term is 20231
    // P0 should come after because term is 20232
    expect(getPeriods(round)).toStrictEqual([5, 0]);
  });

  test("periods with 0 credits are ignored", () => {
    const round: KoppsCourseRoundInfo = {
      round: {
        courseRoundTerms: [
          { creditsP5: 0, creditsP4: 1, term: { term: 20231 } },
          { creditsP0: 1, term: { term: 20232 } },
        ],
        ladokUID: "",
        startTerm: { term: 0 },
      },
    };

    expect(getPeriods(round)).toStrictEqual([4, 0]);
  });
});

describe("getSyllabus", () => {
  test("return latest when all are valid", () => {
    const s1: KoppsSyllabus = {
      validFromTerm: { term: 20171 },
      courseSyllabus: { goals: "A" },
    };
    const s2: KoppsSyllabus = {
      validFromTerm: { term: 20181 },
      courseSyllabus: { goals: "A" },
    };

    expect(getSyllabus([s1, s2], 20181)).toStrictEqual(s2);
  });

  test("filter-out the ones later than the argument", () => {
    const s1: KoppsSyllabus = {
      validFromTerm: { term: 20171 },
      courseSyllabus: { goals: "A" },
    };
    const s2: KoppsSyllabus = {
      validFromTerm: { term: 20181 },
      courseSyllabus: { goals: "A" },
    };

    expect(getSyllabus([s1, s2], 20171)).toStrictEqual(s1);
    expect(getSyllabus([s1, s2], 20172)).toStrictEqual(s1);
  });

  test("error if no syllabus is valid", () => {
    const s1: KoppsSyllabus = {
      validFromTerm: { term: 20171 },
      courseSyllabus: { goals: "A" },
    };
    const s2: KoppsSyllabus = {
      validFromTerm: { term: 20181 },
      courseSyllabus: { goals: "A" },
    };

    expect(() => {
      getSyllabus([s1, s2], 20151);
    }).toThrow();
  });
});

describe("getCourseRoundInformation", () => {
  test("return the correct round info", () => {
    expect(
      getCourseRoundInformation(SF1624, "0772a941-98c8-11ee-888d-8a62d8d3440a"),
    ).toMatchSnapshot();
  });
});
