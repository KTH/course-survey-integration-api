import event1 from "../../__fixtures__/events/01_studiedeltagande.RegistreringEvent_1.json";
import event2 from "../../__fixtures__/events/04_manuallycreated.RegistreringEvent.json";
import handler from "../../src/functions/ladok-events/registreringEvent";
import { MockContext } from "../../__tests__/utils/mockContext";
import { MockDatabase } from "../../__tests__/utils/mockDatabase";
import { studentParticipations1 } from "../../__fixtures__/entities/01_studentParticipations";

describe("RegistreringEvent INTEGRATION", () => {
  test("can be executed", async () => {
    const mockDb = new MockDatabase();
    const mockContext = new MockContext(event1.userProps);
    await handler(event1.message, mockContext, mockDb);
  });

  test("writes correct data to db", async () => {
    const mockDb = new MockDatabase({
      StudentParticipation: studentParticipations1,
    });
    const mockContext = new MockContext(event1.userProps);
    await handler(event1.message, mockContext, mockDb);

    expect(mockDb._result).toMatchSnapshot();
  });

  test("handles program information correctly", async () => {
    const mockDb = new MockDatabase();
    const mockContext = new MockContext(event2.userProps);
    await handler(event2.message, mockContext, mockDb);
    mockDb._result.StudentParticipation.name = "<HIDDEN>";
    mockDb._result.StudentParticipation.email = "<HIDDEN>@kth.se";
    mockDb._result.StudentParticipation.canvasSisId = "<HIDDEN>";

    expect(mockDb._result).toMatchSnapshot();
  });
});
