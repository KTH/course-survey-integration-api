import * as index from "../src/index";
import * as indexMock from "../src/indexMock";


describe("Test mock", () => {
  test("all exported functions are mocked", async () => {
    const mockKeys = Object.keys(indexMock).filter((key) => typeof (indexMock as any)[key] === "function");
    Object.keys(index).forEach((key) => {
      if (typeof (index as any)[key] === "function") {
        expect(mockKeys[mockKeys.indexOf(key)]).toEqual(key);
      }
    });
  });
});
