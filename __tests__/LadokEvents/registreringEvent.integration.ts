import event from "./fixtures/events/01_studiedeltagande.RegistreringEvent_1.json";
import appConfig, { handler } from "../../src/functions/ladok-events/registreringEvent";
import { MockContext } from "./utils/mockContext";
import { MockDatabase } from "./utils/mockDatabase";
import studentParticipation_01 from "./fixtures/entities/01_studentParticipation.json";

describe("RegistreringEvent INTEGRATION", () => {

  test("can be executed", async () => {
    const mockDb = new MockDatabase();
    const mockContext = new MockContext(event.userProps, appConfig);
    await handler(event.message, mockContext, mockDb);
  });

  test("writes correct data to db", async () => {
    const mockDb = new MockDatabase({
      StudentParticipation: studentParticipation_01,
    });
    const mockContext = new MockContext(event.userProps, appConfig);
    await handler(event.message, mockContext, mockDb);

    expect(mockDb._result).toMatchSnapshot();
  });
});
