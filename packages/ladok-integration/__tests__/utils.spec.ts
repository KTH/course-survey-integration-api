import { diffTerms, findStudiestruktur, getTermFromDate } from "../src/utils";

describe("getTermFromDate", () => {
  test("Dates january to june are considered spring term", () => {
    expect(getTermFromDate("2023-01-02")).toBe("20231");
    expect(getTermFromDate("2024-02-02")).toBe("20241");
    expect(getTermFromDate("2024-06-30")).toBe("20241");
  });

  test("Dates july to december are considered autumn term", () => {
    expect(getTermFromDate("2023-07-01")).toBe("20232");
    expect(getTermFromDate("2024-08-02")).toBe("20242");
    expect(getTermFromDate("2024-12-31")).toBe("20242");
  });
});

describe("diffTerms", () => {
  test("return positive if first argument is later than second", () => {
    expect(diffTerms("20241", "20232")).toBe(1);
    expect(diffTerms("20242", "20232")).toBe(2);
  });

  test("return negative if the second argument is later than the first", () => {
    expect(diffTerms("20241", "20251")).toBe(-2);
    expect(diffTerms("20241", "20261")).toBe(-4);
  });

  test("return 0 if passed terms are the same", () => {
    expect(diffTerms("20231", "20231")).toBe(0);
    expect(diffTerms("20241", "20241")).toBe(0);
  });
});

describe("findStudiestruktur", () => {
  const struktur = [
    { Referens: "r1", Barn: [] },
    {
      Referens: "r2",
      Barn: [
        { Referens: "r3", Barn: [] },
        { Referens: "r4", Barn: [] },
      ],
    },
    { Referens: "r5", Barn: [] },
  ];

  test("return the correct leaf and the path to it", () => {
    expect(findStudiestruktur("r1", struktur)).toEqual([{ Referens: "r1" }]);
    expect(findStudiestruktur("r2", struktur)).toEqual([{ Referens: "r2" }]);
    expect(findStudiestruktur("r3", struktur)).toEqual([
      { Referens: "r2" },
      { Referens: "r3" },
    ]);
    expect(findStudiestruktur("r4", struktur)).toEqual([
      { Referens: "r2" },
      { Referens: "r4" },
    ]);
    expect(findStudiestruktur("r5", struktur)).toEqual([{ Referens: "r5" }]);
  });

  test("return empty array if nothing is found", () => {
    expect(findStudiestruktur("r0", struktur)).toEqual([]);
  });
});
