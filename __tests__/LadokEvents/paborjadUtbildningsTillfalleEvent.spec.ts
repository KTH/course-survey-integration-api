import event from "../../__fixtures__/events/01_studiedeltagande.PaborjatUtbildningstillfalleEvent_1.json";
import { handler } from "../../src/functions/ladok-events/paborjatUtbildningstillfalleEvent";
import { MockContext } from "./utils/mockContext";
import { MockDatabase } from "./utils/mockDatabase";
import { KoppsIntegrationMock } from "kopps-integration/src/indexMock";
import { LadokIntegrationMock } from "ladok-integration/src/indexMock";

KoppsIntegrationMock.getCourseInformation(event.message.UtbildningstillfalleUID, {
  title: "Programmeringsteknik för F",
  titleOther: "Programming in F",
  courseCode: "DD1321",
  periods: ["P1"],
  goals: "The course aims to give basic knowledge of programming in F#.",
});

LadokIntegrationMock.getCourseRoundInformation(event.message.UtbildningstillfalleUID, {
  name: "Programmeringsteknik för F",
  courseCode: "DD1321",
  organisation: "SCI",
  organisationUnit: "Datalogi",
  credits: "7.5",
  modules: [
    {
      code: "F1",
      name: "Programmeringsteknik för F",
      credits: "7.5",
    },
  ],
  gradingScheme: [
    {
      code: "TH",
      grades: [
        {
          validFinalGrade: true,
          code: "P",
        },
        {
          validFinalGrade: true,
          code: "F",
        },
      ],
    },
  ],
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
    expect(mockContext.log.mock.lastCall[0]).toBe(`PaborjadUtbildningEvent: ${event.message.UtbildningstillfalleUID}`);
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
