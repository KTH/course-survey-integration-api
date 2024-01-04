import event from "./fixtures/events/01_utbildningsinformation.KurstillfalleTillStatusEvent_1.json";
import { handler } from "../../src/functions/ladok-events/kurstillfalleTillStatusEvent";
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
    expect(mockContext.log.mock.lastCall[0]).toBe(`KurstillfalleTillStatusEvent: ${event.message.UtbildningstillfalleUID} ${event.message.Status}`);
  });
  
  test.skip("writes correct data to db", async () => {
    const mockContext = new MockContext(event.userProps);
    const outp = await handler(event.message, mockContext);
    expect(outp).toMatchSnapshot();
  });
});
