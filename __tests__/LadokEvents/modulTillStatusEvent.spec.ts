import event from "./fixtures/events/01_utbildningsinformation.ModulTillStatusEvent_1.json";
import { handler } from "../../src/functions/ladok-events/modulTillStatusEvent";
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
    expect(mockContext.log.mock.lastCall[0]).toBe(`ModulTillStatusEvent: ${event.message.UtbildningsinstansUID} ${event.message.Status}`);
  });
  
  test.skip("writes correct data to db", async () => {
    const mockDb = new MockDatabase();
    const mockContext = new MockContext(event.userProps);
    const outp = await handler(event.message, mockContext, mockDb);

    expect(outp).toMatchSnapshot();
  });
});
