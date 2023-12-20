import event from "./fixtures/01_utbildningsinformation.KurstillfalleTillStatusEvent_1.json";
import { handler } from "../../src/functions/ladok-events/kurstillfalleTillStatusEvent";
import { MockDb } from "./utils/mockDb";
import { MockContext } from "./utils/mockContext";

describe("RegistreringEvent", () => {

  test("can be executed", async () => {
    const mockDb = new MockDb();
    const mockContext = new MockContext();
    await handler(mockDb, event.message, mockContext);
  });

  test("logs invocation", async () => {
    const mockDb = new MockDb();
    const mockContext = new MockContext();
    await handler(mockDb, event.message, mockContext);

    expect(mockContext.log.mock.calls.length).toBe(1);
    expect(mockContext.log.mock.lastCall[0]).toBe(`KurstillfalleTillStatusEvent: ${event.message.UtbildningstillfalleUID} ${event.message.Status}`);
  });
  
  test.skip("writes correct data to db", async () => {
    const mockDb = new MockDb();
    const mockContext = new MockContext();
    await handler(mockDb, event.message, mockContext);

    expect(mockDb.collection()._lastResult).toMatchSnapshot();
  });
});
