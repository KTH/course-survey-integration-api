import {
  getUgCourseResponsibleAndTeachers,
  getUgUser,
} from "../src/index";

describe("Test that your credential has proper permissions", () => {

  test("can get course responsible and teacher", async () => {
    const [ responsible, teachers ] = await getUgCourseResponsibleAndTeachers("SF1625", "2022", "2");
    
    expect(responsible?.startsWith("u1")).toEqual(true);
    expect(responsible?.length).toEqual(8);

    expect(teachers?.length).toBeGreaterThan(0);
    expect(teachers?.[0]?.startsWith("u1")).toEqual(true);
  });

  test("can get user", async () => {
    const res = await getUgUser("u1famwov")
    expect(res?.email).toBeDefined();
    expect(res?.givenName).toBeDefined();
    expect(res?.surname).toBeDefined();
    expect(res?.kthid).toBeDefined();
  });
});
