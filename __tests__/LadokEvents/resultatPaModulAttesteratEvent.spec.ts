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

describe("ResultatPaModulAttesteratEvent", () => {
  test("can be executed", async () => {
    const mockDb = new MockDatabase(mockDbData);
    const mockContext = new MockContext(event.userProps);
    await handler(event.message, mockContext, mockDb);
  });

  test("creates a new result", async () => {
    const mockDb = new MockDatabase(mockDbData);
    const mockContext = new MockContext(event.userProps);
    await handler(event.message, mockContext, mockDb);
  });

  test("updates a retracted result", async () => {
    // This is done in case we register the retraction message prior to the actual result message
    const mockDb = new MockDatabase(mockDbData);
    const mockContext = new MockContext(event.userProps);
    await handler(event.message, mockContext, mockDb);
  });


});
