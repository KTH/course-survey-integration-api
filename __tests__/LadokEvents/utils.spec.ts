import { hashStudentId } from "../../src/functions/ladok-events/utils";

describe("hashStudentId", () => {
  test("creates a stable hash", async () => {
    const res1 = await hashStudentId("e806c109-ce0e-11e7-ab7e-c364338b4317");
    const res2 = await hashStudentId("e806c109-ce0e-11e7-ab7e-c364338b4317");
    expect(res1).toEqual(res2);
  });
});
