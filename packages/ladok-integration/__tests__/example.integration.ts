import { getCourseRoundInformation, getProgramParticipation } from "../src";

describe("Get information from a course round", () => {
  test("example from documentation", async () => {
    const info = await getCourseRoundInformation(
      "41717c91-4028-11ee-bf53-2115569549a8",
    );
    expect(info).toMatchSnapshot();
  });
});

describe("Get information from a program participation", () => {
  test("example from documentation", async () => {
    const info = await getProgramParticipation(
      "63a138cf-f042-11eb-8cb6-0bb93b844502",
      "090498f8-4df3-11eb-bec3-d5a2938f4dea",
    );
    expect(info).toMatchSnapshot();
  });
});
