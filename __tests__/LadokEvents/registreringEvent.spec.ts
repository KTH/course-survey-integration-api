import event from "../../__fixtures__/events/01_studiedeltagande.RegistreringEvent_1.json";
import appConfig, { handler } from "../../src/functions/ladok-events/registreringEvent";
import { MockContext } from "./utils/mockContext";
import { MockDatabase } from "./utils/mockDatabase";
import studentParticipation_01 from "../../__fixtures__/entities/01_studentParticipation.json";

describe("RegistreringEvent", () => {

  test("can be executed", async () => {
    const mockDb = new MockDatabase();
    const mockContext = new MockContext(event.userProps, appConfig);
    await handler(event.message, mockContext, mockDb);
  });

  test("logs invocation", async () => {
    const mockDb = new MockDatabase();
    const mockContext = new MockContext(event.userProps, appConfig);
    await handler(event.message, mockContext, mockDb);

    expect(mockContext.log.mock.calls.length).toBe(1);
    expect(mockContext.log.mock.lastCall[0]).toBe(`RegistreringEvent: ${event.message.KurstillfalleUID} ${event.message.StudentUID}`);
  });

  test.skip("fetches student data from UG", async () => {
    const mockDb = new MockDatabase();
    const mockContext = new MockContext(event.userProps, appConfig);
    await handler(event.message, mockContext, mockDb);
    // TODO: We meed to mock the UG REST API
    expect(mockDb._result).toMatchSnapshot();
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
