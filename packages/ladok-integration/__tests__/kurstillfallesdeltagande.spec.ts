import { getKurstillfallesdeltagande } from "../src/api";
import { Kurstillfallesdeltagande } from "../src/types";
import data from "./fixtures/kurstillfallesdeltagande_student.json";
import { ApiSchemaError } from "../src/errors";
import { ZodError } from "zod";
import { inspect } from "node:util";

// TODO: Write test that parses data and throws error (I hope...)

describe("Kurstillfallesdeltagande", () => {
  test("Test that data can be parsed", async () => {
    const outp = Kurstillfallesdeltagande.parse(data);
    expect(outp).not.toBeUndefined();
  });
});

describe("ApiSchemaError", () => {
  test("Test that we print issues properly", async () => {
    const testError = { Tillfallesdeltaganden: [{ Ubildningskod: undefined }] };
    try {
      Kurstillfallesdeltagande.parse(testError);
    } catch (err) {
      const error = new ApiSchemaError("kurstillfallesdeltagande", err as ZodError);
      const errOutp = inspect(error);
      expect(errOutp.includes("path: [Array],")).toEqual(false);
    }
  });
});

