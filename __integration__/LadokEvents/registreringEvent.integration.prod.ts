import handler from "../../src/functions/ladok-events/registreringEvent";
import { MockContext } from "../../__tests__/utils/mockContext";
import { MockDatabase } from "../../__tests__/utils/mockDatabase";
import student from "../../__fixtures__/eventsFromLadok/RegistreringEvent_student.json";

const IS_PROD_ENV = process.env.LADOK_API_BASEURL === "https://api.ladok.se";
if (!IS_PROD_ENV)
  throw new Error("These tests use messages and data from PROD");


describe("RegistreringEvent -- PROD", () => {
  test("handles doctoral participation by skipping", async () => {
    const mockDb = new MockDatabase();
    const mockContext = new MockContext(student.userProperties);
    await handler(student.message, mockContext, mockDb);
    // mockDb._result.StudentParticipation.name = "<HIDDEN>";
    // mockDb._result.StudentParticipation.email = "<HIDDEN>@kth.se";
    // mockDb._result.StudentParticipation.canvasSisId = "<HIDDEN>";

    expect(mockDb._result).toMatchSnapshot();
  });
});
