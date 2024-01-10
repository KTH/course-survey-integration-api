import event from "./fixtures/events/01_studiedeltagande.PaborjadUtbildningEvent_1.json";
import { handler } from "../../src/functions/ladok-events/paborjadUtbildningEvent";
import { MockContext } from "./utils/mockContext";
import { MockDatabase } from "./utils/mockDatabase";

describe("RegistreringEvent", () => {

  test("can be executed", async () => {
    const mockDb = new MockDatabase();
    const mockContext = new MockContext(event.userProps);
    await handler(event.message, mockContext, mockDb);
  });

  test("logs invocation", async () => {
    const mockDb = new MockDatabase();
    const mockContext = new MockContext(event.userProps);
    await handler(event.message, mockContext, mockDb);

    expect(mockContext.log.mock.calls.length).toBe(1);
    expect(mockContext.log.mock.lastCall[0]).toBe(`PaborjadUtbildningEvent: ${event.message.UtbildningstillfalleUID}`);
  });

  test.skip("fetches course info from KOPPS", async () => {
    const mockDb = new MockDatabase();
    const mockContext = new MockContext(event.userProps);
    await handler(event.message, mockContext, mockDb);
    // TODO: We meed to mock the KOPPS API
    expect(mockDb._result).toMatchSnapshot();
  });

  test.skip("fetches course info from LADOK", async () => {
    const mockDb = new MockDatabase();
    const mockContext = new MockContext(event.userProps);
    await handler(event.message, mockContext, mockDb);
    // TODO: We meed to mock the LADOK REST API
    expect(mockDb._result).toMatchSnapshot();
  });

  test.skip("fetches course info from UG", async () => {
    const mockDb = new MockDatabase();
    const mockContext = new MockContext(event.userProps);
    await handler(event.message, mockContext, mockDb);
    // TODO: We meed to mock the UG REST API
    expect(mockDb._result).toMatchSnapshot();
  });
  
  test("writes correct data to db", async () => {
    const mockDb = new MockDatabase();
    const mockContext = new MockContext(event.userProps);
    await handler(event.message, mockContext, mockDb);

    expect(mockDb._result).toMatchSnapshot();
  });
});
