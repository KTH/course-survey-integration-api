import event from "../../__fixtures__/events/01_utbildningsinformation.ModulTillStatusEvent_1.json";
import handler from "../../src/functions/ladok-events/modulTillStatusEvent";
import { MockContext } from "../../__tests__/utils/mockContext";
import { MockDatabase } from "../../__tests__/utils/mockDatabase";

const DB_MOCK_INPUT = {
  CourseRound: {
    id: event.message.OverliggandeUtbildningsinstansUID,
  },
};

describe("ModulTillStatusEvent", () => {
  test("can be executed", async () => {
    const mockDb = new MockDatabase(DB_MOCK_INPUT);
    const mockContext = new MockContext(event.userProps);
    await handler(event.message, mockContext, mockDb);
  });

  test("writes correct data to db", async () => {
    const mockDb = new MockDatabase(DB_MOCK_INPUT);
    const mockContext = new MockContext(event.userProps);
    await handler(event.message, mockContext, mockDb);

    expect(mockDb._result).toMatchSnapshot();
  });
});
