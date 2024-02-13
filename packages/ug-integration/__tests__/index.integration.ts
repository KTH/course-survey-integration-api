import {
  getUgCourseResponsible,
  getUgMembers,
  getUgSchool,
  getUgUser,
  getUgUserByLadokId,
} from "../src/index";

describe("Test that your credential has proper permissions", () => {
  test("can get course responsible and teacher", async () => {
    const responsible = await getUgCourseResponsible("SF1625", "20241", "1");
    const teachers = await getUgCourseResponsible("SF1625", "20241", "1");

    expect(responsible[0].startsWith("u1")).toEqual(true);
    expect(responsible.length).toEqual(1);

    expect(teachers.length).toBeGreaterThan(0);
    expect(teachers[0].startsWith("u1")).toEqual(true);
  });

  test("can get user", async () => {
    const res = await getUgUser("u1famwov");
    expect(res?.email).toBeDefined();
    expect(res?.givenName).toBeDefined();
    expect(res?.surname).toBeDefined();
    expect(res?.kthid).toBeDefined();
  });

  test("can get user from Ladok UID", async () => {
    const res = await getUgUserByLadokId(
      "5cbe0fe1-6317-11ec-b965-d92444244ba1",
    );
    expect(res?.email).toBeDefined();
    expect(res?.givenName).toBeDefined();
    expect(res?.surname).toBeDefined();
    expect(res?.kthid).toBeDefined();
  });

  test("can get school", async () => {
    const res = await getUgSchool("eecs");
    expect(res?.kthid).toBeDefined();
    expect(res?.description).toBeDefined();
    expect(res?.description?.sv ?? res?.description?.en).toBeDefined();
  });

  test("can get group", async () => {
    const res = await getUgMembers("edu.courses.SF.SF1624.examiner");
  });
});
