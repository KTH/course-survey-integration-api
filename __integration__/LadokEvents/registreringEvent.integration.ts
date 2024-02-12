import event1 from "../../__fixtures__/events/01_studiedeltagande.RegistreringEvent_1.json";
import event2 from "../../__fixtures__/events/01_studiedeltagande.RegistreringEvent_2.json";
import appConfig, {
  handler,
} from "../../src/functions/ladok-events/registreringEvent";
import { MockContext } from "../../__tests__/LadokEvents/utils/mockContext";
import { MockDatabase } from "../../__tests__/LadokEvents/utils/mockDatabase";
import studentParticipation_01 from "../../__fixtures__/entities/01_studentParticipation.json";

describe("RegistreringEvent INTEGRATION", () => {
  test("can be executed", async () => {
    const mockDb = new MockDatabase();
    const mockContext = new MockContext(event1.userProps, appConfig);
    await handler(event1.message, mockContext, mockDb);
  });

  test("writes correct data to db", async () => {
    const mockDb = new MockDatabase({
      StudentParticipation: studentParticipation_01,
    });
    const mockContext = new MockContext(event1.userProps, appConfig);
    await handler(event1.message, mockContext, mockDb);

    expect(mockDb._result).toMatchSnapshot();
  });

  test("handles program information correctly", async () => {
    const mockDb = new MockDatabase();
    const mockContext = new MockContext(event2.userProps, appConfig);
    await handler(event2.message, mockContext, mockDb);
    mockDb._result.StudentParticipation.name = "<HIDDEN>";
    mockDb._result.StudentParticipation.email = "<HIDDEN>@kth.se";
    mockDb._result.StudentParticipation.canvasSisId = "<HIDDEN>";

    expect(mockDb._result).toMatchSnapshot();
  });
});
