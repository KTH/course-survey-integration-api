import { UgIntegrationMock } from "ug-integration/src/indexMock";
import event from "../../__fixtures__/events/01_studiedeltagande.PaborjatUtbildningstillfalleEvent_1.json";
import { handler } from "../../src/functions/ladok-events/paborjatUtbildningstillfalleEvent";
import { MockContext } from "./utils/mockContext";
import { MockDatabase } from "./utils/mockDatabase";
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
    courseInstanceCode: "DD1321-20221",
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

UgIntegrationMock.getUgCourseResponsibleAndTeachers("SF1625", "2022", "2", [
  "u1responsible",
  ["u1teacher1", "u1teacher2"],
]);

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

  test.skip("fetches course info from KOPPS", async () => {
    const mockDb = new MockDatabase();
    const mockContext = new MockContext(event.userProps);
    await handler(event.message, mockContext, mockDb);
    // TODO: We meed to mock the KOPPS API
    expect(mockDb._result).toMatchSnapshot();
  });

  test.skip("fetches course info from LADOK", async () => {
    const mockDb = new MockDatabase();
    const mockContext = new MockContext(event.userProps);
    await handler(event.message, mockContext, mockDb);
    // TODO: We meed to mock the LADOK REST API
    expect(mockDb._result).toMatchSnapshot();
  });

  test.skip("fetches course info from UG", async () => {
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
});
