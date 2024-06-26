import event from "../../__fixtures__/events/01_utbildningsinformation.KurstillfalleTillStatusEvent_1.json";
import handler from "../../src/functions/ladok-events/kurstillfalleTillStatusEvent";
import { MockContext } from "../utils/mockContext";
import { MockDatabase } from "../utils/mockDatabase";

const DB_MOCK_INPUT = {
  CourseRound: {
    id: "41717c91-4028-11ee-bf53-2115569549a8",
  },
};

describe("RegistreringEvent", () => {
  test("can be executed", async () => {
    const mockDb = new MockDatabase(DB_MOCK_INPUT);
    const mockContext = new MockContext(event.userProps);
    await handler(event.message, mockContext, mockDb);
  });

  test("logs invocation", async () => {
    const mockDb = new MockDatabase(DB_MOCK_INPUT);
    const mockContext = new MockContext(event.userProps);
    await handler(event.message, mockContext, mockDb);

    expect(mockContext.log.mock.calls.length).toBe(1);
    expect(mockContext.log.mock.lastCall[0]).toBe(
      `KurstillfalleTillStatusEvent: ${event.message.UtbildningstillfalleUID} ${event.message.Status}`,
    );
  });

  test("writes correct data to db", async () => {
    const mockDb = new MockDatabase(DB_MOCK_INPUT);
    const mockContext = new MockContext(event.userProps);
    await handler(event.message, mockContext, mockDb);
    expect(mockDb._result).toMatchSnapshot();
  });

  test("stores a transaction log", async () => {
    // This is done in case we register the retraction message prior to the actual result message
    const mockDb = new MockDatabase(DB_MOCK_INPUT);
    const mockContext = new MockContext(event.userProps);
    await handler(event.message, mockContext, mockDb);

    expect(mockDb._transactionLog).toMatchSnapshot();
  });
});
