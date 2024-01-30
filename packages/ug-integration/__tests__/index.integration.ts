import {
  getUgCourseResponsibleAndTeachers,
  getUgSchool,
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
  
  test("can get school", async () => {
    const res = await getUgSchool("eecs")
    expect(res?.kthid).toBeDefined();
    expect(res?.description).toBeDefined();
    expect(res?.description.sv ?? res?.description.en).toBeDefined();
  });
});
