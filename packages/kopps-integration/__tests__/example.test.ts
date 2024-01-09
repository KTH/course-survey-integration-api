import { getCourseInformation } from "../src";

describe.skip("Gets information from the course DD1321", () => {
  test("example from documentation", async () => {
    const info = await getCourseInformation(
      "41717c91-4028-11ee-bf53-2115569549a8",
    );
    expect(info).toMatchSnapshot();
  });
});
