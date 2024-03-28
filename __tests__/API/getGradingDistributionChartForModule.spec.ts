import handler from "../../src/functions/api/getGradingDistributionChartForModule";
import { MockContext } from "../utils/mockContext";
import { MockDatabase } from "../utils/mockDatabase";
import { MockRequest } from "../utils/mockRequest";

// Mock data
import { courseRound1 } from "../../__fixtures__/entities/01_courseRound";
import { courseRound2 } from "../../__fixtures__/entities/02_courseRound";
import { studentParticipations1 } from "../../__fixtures__/entities/01_studentParticipations";
import { studentParticipations2 } from "../../__fixtures__/entities/02_studentParticipations";
import { reportedResults1 } from "../../__fixtures__/entities/01_reportedResults";
import { reportedResults2 } from "../../__fixtures__/entities/02_reportedResults";

const mockDbData = {
  CourseRound: [
    courseRound1,
    courseRound2,
  ],
  ReportedResult: [
    ...reportedResults1,
    ...reportedResults2,

  ],
  StudentParticipation: [
    ...studentParticipations1,
    ...studentParticipations2,
  ],
}

describe("/api/course-rounds/{id}/modules/{moduleCode}/grading-distribution.png", () => {
  test("can be executed", async () => {
    const mockDb = new MockDatabase(mockDbData);
    const mockContext = new MockContext();
    const mockRequest = new MockRequest({ params: { id: "01-1", moduleCode: "TEN1" } });
    const outp = await handler(mockRequest, mockContext, mockDb);
    // Snapshot testing didn't work b/c the blob has different size locally and in CI/CD-pipeline
    expect(outp.body).toBeInstanceOf(Blob);
    expect((outp.body as any).size).toBeGreaterThan(1000);
  });
});
