import event from "./fixtures/01_studiedeltagande.RegistreringEvent_1.json";
import appConfig, { handler } from "../../src/functions/ladok-events/registreringEvent";
import { MockContext } from "./utils/mockContext";
import { MockDatabase } from "./utils/mockDatabase";

describe("RegistreringEvent", () => {

  test("can be executed", async () => {
    const mockDb = new MockDatabase(null);
    const mockContext = new MockContext(event.userProps, appConfig);
    await handler(event.message, mockContext, mockDb);
  });

  test("logs invocation", async () => {
    const mockDb = new MockDatabase(null);
    const mockContext = new MockContext(event.userProps, appConfig);
    await handler(event.message, mockContext, mockDb);

    expect(mockContext.log.mock.calls.length).toBe(1);
    expect(mockContext.log.mock.lastCall[0]).toBe(`RegistreringEvent: ${event.message.KurstillfalleUID} ${event.message.StudentUID}`);
  });

  test.skip("fetches student data from UG", async () => {
    const mockDb = new MockDatabase(null);
    const mockContext = new MockContext(event.userProps, appConfig);
    await handler(event.message, mockContext, mockDb);
    // TODO: We meed to mock the UG REST API
    expect(mockContext.extraInputs._getInput("TBD")).toMatchSnapshot();
  });

  test("writes correct data to db", async () => {
    const mockDb = new MockDatabase(null);
    const mockContext = new MockContext(event.userProps, appConfig);
    await handler(event.message, mockContext, mockDb);

    expect(mockDb._result).toMatchSnapshot();
  });
});
