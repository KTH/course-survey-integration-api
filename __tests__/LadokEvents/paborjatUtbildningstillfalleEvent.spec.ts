import { UgIntegrationMock } from "ug-integration/src/indexMock";
import event from "../../__fixtures__/events/01_studiedeltagande.PaborjatUtbildningstillfalleEvent_1.json";
import handler from "../../src/functions/ladok-events/paborjatUtbildningstillfalleEvent";
import { MockContext } from "../utils/mockContext";
import { MockDatabase } from "../utils/mockDatabase";
import { KoppsIntegrationMock } from "kopps-integration/src/indexMock";
import { LadokIntegrationMock } from "ladok-integration/src/indexMock";

KoppsIntegrationMock.getCourseInformation(
  event.message.UtbildningstillfalleUID,
  {
    title: "Programmeringsteknik för F",
    titleOther: "Programming in F",
    courseCode: "DD1321",
    periods: ["P1"],
    goals: "The course aims to give basic knowledge of programming in F#.",
    startTerm: "20221",
    code: "51210",
    electiveConditions: []
  },
);

LadokIntegrationMock.getCourseRoundInformation(
  event.message.UtbildningstillfalleUID,
  {
    name: {
      sv: "Programmeringsteknik för F",
      en: "Programming in F",
    },
    courseCode: "DD1321",
    organisation: {
      code: "SCI",
    },
    organisationUnit: {
      code: "SCID",
      name: {
        sv: "Institutionen för datavetenskap",
        en: "School of Computer Science",
      },
    },
    courseInstanceCode: "51210",
    startDate: "2023-01-17",
    endDate: "2023-03-17",
    credits: 7.5,
    modules: [
      {
        code: "F1",
        name: {
          sv: "Programmeringsteknik för F",
          en: "Programming in F",
        },
        credits: 7.5,
        gradingScheme: {
          code: "TH",
          grades: [
            {
              validFinalGrade: true,
              code: "P",
            },
            {
              validFinalGrade: false,
              code: "F",
            },
          ],
        },
      },
    ],
    gradingScheme: {
      code: "TH",
      grades: [
        {
          validFinalGrade: true,
          code: "P",
        },
        {
          validFinalGrade: false,
          code: "F",
        },
      ],
    },
  },
);

UgIntegrationMock.getUgUser("u1responsible", {
  email: "cr@email.com",
  kthid: "u1responsible",
  givenName: "Course",
  surname: "Responsible",
});

UgIntegrationMock.getUgUser("u1examiner", {
  email: "ex@email.com",
  kthid: "u1examiner",
  givenName: "Course",
  surname: "Examiner",
});

UgIntegrationMock.getUgUser("u1teacher1", {
  email: "t1@email.com",
  kthid: "u1teacher1",
  givenName: "First",
  surname: "Teacher",
});

UgIntegrationMock.getUgUser("u1teacher2", {
  email: "t2@email.com",
  kthid: "u1teacher2",
  givenName: "Second",
  surname: "Teacher",
});

UgIntegrationMock.getUgSchool("SCI", {
  name: "SCI",
  kthid: "u1school",
  description: {
    sv: "Skolan för datavetenskap och kommunikation",
    en: "School of Computer Science and Communication",
  },
});

UgIntegrationMock.getUgCourseResponsible("DD1321", "20221", "51210", [
  "u1responsible",
]);

UgIntegrationMock.getUgCourseExaminers("DD1321", ["u1examiner"]);

UgIntegrationMock.getUgCourseTeachers("DD1321", "20221", "51210", [
  "u1teacher1",
  "u1teacher2",
]);

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
      `PaborjatUtbildningstillfalleEvent: ${event.message.UtbildningstillfalleUID}`,
    );
  });

  test("fetches course info from KOPPS", async () => {
    const mockDb = new MockDatabase();
    const mockContext = new MockContext(event.userProps);
    await handler(event.message, mockContext, mockDb);
    // TODO: We meed to mock the KOPPS API
    expect(mockDb._result).toMatchSnapshot();
  });

  test("fetches course info from LADOK", async () => {
    const mockDb = new MockDatabase();
    const mockContext = new MockContext(event.userProps);
    await handler(event.message, mockContext, mockDb);
    // TODO: We meed to mock the LADOK REST API
    expect(mockDb._result).toMatchSnapshot();
  });

  test("fetches course info from UG", async () => {
    const mockDb = new MockDatabase();
    const mockContext = new MockContext(event.userProps);
    await handler(event.message, mockContext, mockDb);
    // TODO: We meed to mock the UG REST API
    expect(mockDb._result).toMatchSnapshot();
  });

  test("writes correct data to db", async () => {
    const mockDb = new MockDatabase();
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
