import event from "../../__fixtures__/events/01_studiedeltagande.PaborjatUtbildningstillfalleEvent_1.json";
import handler from "../../src/functions/ladok-events/paborjatUtbildningstillfalleEvent";
import { MockContext } from "../../__tests__/utils/mockContext";
import { MockDatabase } from "../../__tests__/utils/mockDatabase";
import assert from "node:assert";

assert(
  process.env.KOPPS_API_URL === "https://api-r.referens.sys.kth.se/api/kopps/v2/",
  "KOPPS_API_URL is not pointing to test environment",
);


// TODO: These tests are broken, but I am living them active so we consider fixing them later
// could be data that has changed since we created the fixtures

describe("PaborjadUtbildningEvent -- REF", () => {
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
