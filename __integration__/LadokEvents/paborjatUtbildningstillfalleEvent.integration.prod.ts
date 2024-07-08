import handler from "../../src/functions/ladok-events/paborjatUtbildningstillfalleEvent";
import { MockContext } from "../../__tests__/utils/mockContext";
import { MockDatabase } from "../../__tests__/utils/mockDatabase";

import exchangeEvent from "../../__fixtures__/eventsFromLadok/PaborjatUtbildningstillfalleEvent_exchange.json";
import researchSchoolEvent from "../../__fixtures__/eventsFromLadok/PaborjatUtbildningstillfalleEvent_research_school.json";
import doctoralProgramEvent from "../../__fixtures__/eventsFromLadok/PaborjatUtbildningstillfalleEvent_doctoral_program.json";
import doctoralThesisEvent from "../../__fixtures__/eventsFromLadok/PaborjatUtbildningstillfalleEvent_doctoral_thesis.json";

const IS_PROD_ENV = process.env.LADOK_API_BASEURL === "https://api.ladok.se";
if (!IS_PROD_ENV)
  throw new Error("These tests ruse messages and data from PROD");

describe("PaborjadUtbildningEvent -- PROD", () => {
  test("can handle exchange", async () => {
    const mockDb = new MockDatabase();
    const mockContext = new MockContext(exchangeEvent.userProperties);
    await handler(exchangeEvent.message, mockContext, mockDb);

    expect(mockDb._result).toMatchSnapshot();
  });

  test("can handle school", async () => {
    const mockDb = new MockDatabase();
    const mockContext = new MockContext(researchSchoolEvent.userProperties);
    await handler(researchSchoolEvent.message, mockContext, mockDb);

    expect(mockDb._result).toMatchSnapshot();
  });

  test("can handle doctoral program", async () => {
    const mockDb = new MockDatabase();
    const mockContext = new MockContext(doctoralProgramEvent.userProperties);
    await handler(doctoralProgramEvent.message, mockContext, mockDb);

    expect(mockDb._result).toMatchSnapshot();
  });

  test("can handle doctoral thesis", async () => {
    const mockDb = new MockDatabase();
    const mockContext = new MockContext(doctoralThesisEvent.userProperties);
    await handler(doctoralThesisEvent.message, mockContext, mockDb);

    expect(mockDb._result).toMatchSnapshot();
  });
});
