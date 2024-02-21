import event from "../../__fixtures__/events/03_resultat.AttesteratResultatMakuleratEvent.json";
import { handler } from "../../src/functions/ladok-events/attesteratResultatMakuleratEvent";
import { MockContext } from "../../__tests__/LadokEvents/utils/mockContext";
import { MockDatabase } from "../../__tests__/LadokEvents/utils/mockDatabase";

describe("AttesteratResultatMakuleratEvent", () => {
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
