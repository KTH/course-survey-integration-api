import event from "../../__fixtures__/events/01_studiedeltagande.RegistreringEvent_1.json";
import handler from "../../src/functions/ladok-events/registreringEvent";
import { MockContext } from "../utils/mockContext";
import { MockDatabase } from "../utils/mockDatabase";
import { UgIntegrationMock } from "ug-integration/src/indexMock";
import { LadokIntegrationMock } from "ladok-integration/src/indexMock";
import { studentParticipations1 } from "../../__fixtures__/entities/01_studentParticipations";

UgIntegrationMock.getUgUserByLadokId("bbcce853-4df3-11e8-a562-6ec76bb54b9f", {
  email: "email@email.com",
  kthid: "u1dummyuser",
  givenName: "Dummy",
  surname: "User",
});

LadokIntegrationMock.getProgramParticipation("bbcce853-4df3-11e8-a562-6ec76bb54b9f-41717c91", "4028-11ee-bf53-2115569549a8", {
    code: "dummyProgramCode",
    name: { sv: "Dummy Program SV", en: "Dummy Program EN"},
    startTerm: "20231",
    studyYear: 2023,
    specialization: undefined,
});

LadokIntegrationMock.getEduInstance("41717c91-4028-11ee-bf53-2115569549a8", {
  ladokUID: "4028-11ee-bf53-2115569549a8-dummy-prog",
  isCoursePackage: false,
  isDoctoralThesis: false,
  isExchangeCourse: false,
  isExchangeStudent: false,
  isIndustrialEdu: false,
  isLicPaper: false,
  isDeprecatedStudyOrder: false,
});

describe("RegistreringEvent", () => {
  test("can be executed", async () => {
    const mockDb = new MockDatabase();
    const mockContext = new MockContext(event.userProps);
    await handler(event.message, mockContext, mockDb);
  });

  test("logs invocation", async () => {
    const mockDb = new MockDatabase();
    const mockContext = new MockContext(event.userProps);
    await handler(event.message, mockContext, mockDb);

    expect(mockContext.log.mock.calls.length).toBe(1);
    expect(mockContext.log.mock.lastCall[0]).toBe(
      `RegistreringEvent: ${event.message.KurstillfalleUID} ${event.message.StudentUID}`,
    );
  });

  test("fetches student data from UG", async () => {
    const mockDb = new MockDatabase();
    const mockContext = new MockContext(event.userProps);
    await handler(event.message, mockContext, mockDb);
    expect(mockDb._result).toMatchSnapshot();
  });

  test("writes correct data to db", async () => {
    const studentParticipation1 = studentParticipations1[0];
    const mockDb = new MockDatabase({
      StudentParticipation: studentParticipation1,
    });
    const mockContext = new MockContext(event.userProps);
    await handler(event.message, mockContext, mockDb);

    expect(mockDb._result).toMatchSnapshot();
  });

  test("stores a transaction log", async () => {
    // This is done in case we register the retraction message prior to the actual result message
    const mockDb = new MockDatabase();
    const mockContext = new MockContext(event.userProps);
    await handler(event.message, mockContext, mockDb);

    expect(mockDb._transactionLog).toMatchSnapshot();
  });
});
