import event from "../../__fixtures__/events/01_utbildningsinformation.ModulTillStatusEvent_1.json";
import handler from "../../src/functions/ladok-events/modulTillStatusEvent";
import { MockContext } from "../utils/mockContext";
import { MockDatabase } from "../utils/mockDatabase";

const DB_MOCK_INPUT = {
  CourseRound: {
    id: "e51b9585-9501-11ee-a0ce-a9a57d284dbd",
    modules: [
      {
        id: "6b741a04-9505-11ee-a0ce-a9a57d284dbd",
      },
    ],
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
      `ModulTillStatusEvent: ${event.message.OverliggandeUtbildningsinstansUID} ${event.message.Utbildningskod} ${event.message.Status}`,
    );
  });

  test.skip("writes correct data to db", async () => {
    const mockDb = new MockDatabase(DB_MOCK_INPUT);
    const mockContext = new MockContext(event.userProps);
    const outp = await handler(event.message, mockContext, mockDb);

    expect(outp).toMatchSnapshot();
  });
});
