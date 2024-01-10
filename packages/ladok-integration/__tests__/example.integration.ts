import { getCourseRoundInformation } from "../src";

describe("Get information from a course round", () => {
  test("example from documentation", async () => {
    const info = await getCourseRoundInformation(
      "41717c91-4028-11ee-bf53-2115569549a8",
    );
    expect(info).toMatchSnapshot();
  });
});
