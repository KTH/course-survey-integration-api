import event from "../../__fixtures__/events/01_utbildningsinformation.KurstillfalleTillStatusEvent_1.json";
import { handler } from "../../src/functions/ladok-events/kurstillfalleTillStatusEvent";
import { MockContext } from "../../__tests__/LadokEvents/utils/mockContext";
import { MockDatabase } from "../../__tests__/LadokEvents/utils/mockDatabase";

const DB_MOCK_INPUT = {
  "CourseRound": {
    "id": "41717c91-4028-11ee-bf53-2115569549a8",
  }
}

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
