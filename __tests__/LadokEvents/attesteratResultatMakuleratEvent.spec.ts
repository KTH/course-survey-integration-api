import event from "../../__fixtures__/events/05_resultat.AttesteratResultatMakuleratEvent_1.json";
import handler from "../../src/functions/ladok-events/attesteratResultatMakuleratEvent";
import { MockContext } from "../utils/mockContext";
import { MockDatabase } from "../utils/mockDatabase";
import { reportedResults1 } from "../../__fixtures__/entities/01_reportedResults";

const mockDbData = {
  ReportedResult: [
    ...reportedResults1,
  ],
}

// TODO: Match AttesteratResultatMakuleratEvent_1 "ResultatUID" with "ResultatUID" in reportedResults1

describe("AttesteratResultatMakuleratEvent", () => {
  test("can be executed", async () => {
    const mockDb = new MockDatabase(mockDbData);
    const mockContext = new MockContext(event.userProps);
    await handler(event.message, mockContext, mockDb);
  });

  test("marks an existing result as retracted", async () => {
    const mockDb = new MockDatabase(mockDbData);
    const mockContext = new MockContext(event.userProps);
    await handler(event.message, mockContext, mockDb);

    expect(mockDb._result).toMatchSnapshot();
  });

  test("creates a result that is retracted", async () => {
    // This is done in case we register the retraction message prior to the actual result message
    const mockDb = new MockDatabase(mockDbData);
    const mockContext = new MockContext(event.userProps);
    await handler(event.message, mockContext, mockDb);

    expect(mockDb._result).toMatchSnapshot();
  });

});
