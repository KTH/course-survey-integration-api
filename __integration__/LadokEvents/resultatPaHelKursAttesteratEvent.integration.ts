import event from "../../__fixtures__/events/03_resultat.ResultatPaHelKursAttesteratEvent_1.json";
import handler from "../../src/functions/ladok-events/resultatPaHelKursAttesteratEvent";
import { MockContext } from "../../__tests__/utils/mockContext";
import { MockDatabase } from "../../__tests__/utils/mockDatabase";

describe("ResultatPaHelKursAttesteratEvent", () => {
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
