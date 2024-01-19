import event from "../../__tests__/LadokEvents/fixtures/events/01_studiedeltagande.PaborjadUtbildningEvent_1.json";
import { handler } from "../../src/functions/ladok-events/paborjadUtbildningEvent";
import { MockContext } from "../../__tests__/LadokEvents/utils/mockContext";
import { MockDatabase } from "../../__tests__/LadokEvents/utils/mockDatabase";

describe("PaborjadUtbildningEvent", () => {

  test("can be executed", async () => {
    const mockDb = new MockDatabase();
    const mockContext = new MockContext(event.userProps);
    await handler(event.message, mockContext, mockDb);
  });

  test("writes correct data to db", async () => {
    const mockDb = new MockDatabase();
    const mockContext = new MockContext(event.userProps);
    await handler(event.message, mockContext, mockDb);

    expect(mockDb._result).toMatchSnapshot();
  });
});
