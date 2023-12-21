import event from "./fixtures/01_studiedeltagande.PaborjadUtbildningEvent_1.json";
import { handler } from "../../src/functions/ladok-events/paborjadUtbildningEvent";
import { MockContext } from "./utils/mockContext";

describe("RegistreringEvent", () => {

  test("can be executed", async () => {
    const mockContext = new MockContext(event.userProps);
    await handler(event.message, mockContext);
  });

  test("logs invocation", async () => {
    const mockContext = new MockContext(event.userProps);
    await handler(event.message, mockContext);

    expect(mockContext.log.mock.calls.length).toBe(1);
    expect(mockContext.log.mock.lastCall[0]).toBe(`PaborjadUtbildningEvent: ${event.message.UtbildningstillfalleUID} ${event.message.StudentUID}`);
  });

  test.skip("fetches course info from KOPPS", async () => {
    const mockContext = new MockContext(event.userProps);
    const outp = await handler(event.message, mockContext);
    // TODO: We meed to mock the KOPPS API
    expect(outp).toMatchSnapshot();
  });

  test.skip("fetches course info from LADOK", async () => {
    const mockContext = new MockContext(event.userProps);
    const outp = await handler(event.message, mockContext);
    // TODO: We meed to mock the LADOK REST API
    expect(outp).toMatchSnapshot();
  });

  test.skip("fetches course info from UG", async () => {
    const mockContext = new MockContext(event.userProps);
    const outp = await handler(event.message, mockContext);
    // TODO: We meed to mock the UG REST API
    expect(outp).toMatchSnapshot();
  });
  
  test.skip("writes correct data to db", async () => {
    const mockContext = new MockContext(event.userProps);
    const outp = await handler(event.message, mockContext);

    expect(outp).toMatchSnapshot();
  });
});
