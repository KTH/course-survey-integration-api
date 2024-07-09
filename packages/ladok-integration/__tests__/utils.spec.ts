import { diffTerms, findStudiestruktur, getTermFromDate, isLicentiatuppsats } from "../src/utils";
import { isUtbytesinstans, isUtbytesstudent, isKurspaketering, isDoktorsavhandling, isUppdragsutbildning } from "../src/utils";
import utbInstDoktorsprog from "./fixtures/utbildningsinstans-doktorsprog.json";
import utbInstKurspaketering from "./fixtures/utbildningsinstans-kurspaketering.json";
import utbInstProgram from "./fixtures/utbildningsinstans-program.json";
import utbInstSkola from "./fixtures/utbildningsinstans-skola.json";
import utbInstUtbprog from "./fixtures/utbildningsinstans-utbprog.json";
import utbInstUtbkursWithCode from "./fixtures/utbildningsinstans-utbkurs-kod.json";
import utbInstUtbkursWithoutCode from "./fixtures/utbildningsinstans-utbkurs-ingen-kod.json";
import utbInstDocItm from "./fixtures/utbildningsinstand-doctoral-thesis-itm.json";
import utbInstUtbStudent from "./fixtures/utbildningsinstans-utbstudent.json";
import utbInstUppdragsutbildning from "./fixtures/utbildningsinstans-uppdragsutb.json";
import utbInstLicSci from "./fixtures/utbildningsinstans-lic-paper-sci.json";

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

describe("isKurspaketering", () => {
  test("can detect DOKTORSPROG", () => {
    const res = isKurspaketering(utbInstDoktorsprog);
    expect(res).toBe(true);
  });

  test("can detect KURSPAKETERING", () => {
    const res = isKurspaketering(utbInstKurspaketering);
    expect(res).toBe(true);
  });

  test("can detect PROGRAM", () => {
    const res = isKurspaketering(utbInstProgram);
    expect(res).toBe(true);
  });

  test("can detect SKOLA", () => {
    const res = isKurspaketering(utbInstSkola);
    expect(res).toBe(true);
  });

  test("can detect UTBPROG", () => {
    const res = isKurspaketering(utbInstUtbprog);
    expect(res).toBe(true);
  });
});

describe("isDoktorsavhandling", () => {
  test("can detect for ITM-school", () => {
    const res = isDoktorsavhandling(utbInstDocItm);
    expect(res).toBe(true);
  });
});

describe("isLicentiatuppsats", () => {
  test("can detect for ITM-school", () => {
    const res = isLicentiatuppsats(utbInstLicSci);
    expect(res).toBe(true);
  });
});

describe("isUtbyteskurs", () => {
  test("can detect by utbildning.attribut.kod", () => {
    const res = isUtbytesinstans(utbInstUtbkursWithCode);
    expect(res).toBe(true);
  });
  
  test("can detect by engelsk.benamning", () => {
    const res = isUtbytesinstans(utbInstUtbkursWithoutCode);
    expect(res).toBe(true);
  });
});

describe("isUtbytesstudent", () => {
  test("can detect", () => {
    const res = isUtbytesstudent(utbInstUtbStudent);
    expect(res).toBe(true);
  });
});

describe("isUppdragsutbildning", () => {
  test("can detect", () => {
    const res = isUppdragsutbildning(utbInstUppdragsutbildning);
    expect(res).toBe(true);
  });
});
