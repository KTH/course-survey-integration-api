import event from "../../__fixtures__/events/01_studiedeltagande.PaborjatUtbildningstillfalleEvent_1.json";
import handler from "../../src/functions/ladok-events/paborjatUtbildningstillfalleEvent";
import { MockContext } from "../../__tests__/utils/mockContext";
import { MockDatabase } from "../../__tests__/utils/mockDatabase";

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
