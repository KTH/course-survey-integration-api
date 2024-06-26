import { getCourseRoundInformation, getCourseRoundLanguage, getProgramParticipation } from "../src";
import { getCurrentUser, getUtbildningstillfalle } from "../src/api";

describe("Check user exists", () => {
  test("Test that the user exist", async () => {
    const user = await getCurrentUser();
    expect(user.LarosateID).toEqual(29);
  });
});

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

describe("Get default language for course", () => {
  test("example from documentation", async () => {
    const info = await getCourseRoundLanguage(
      "090498f8-4df3-11eb-bec3-d5a2938f4dea",
    );
    expect(info).toMatchSnapshot();
  });
  test("example from documentation", async () => {
    const info = await getUtbildningstillfalle(
      "090498f8-4df3-11eb-bec3-d5a2938f4dea",
    );
    expect(info).toMatchSnapshot();
  });
});
