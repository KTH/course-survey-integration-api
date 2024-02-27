import { InvocationContext } from "@azure/functions";
import { TLadokEventUserProperties } from "../../src/functions/ladok-events/types";
export class MockContext implements InvocationContext {
  invocationId: any = undefined;
  functionName: any = undefined;
  extraInputs: any = undefined;
  extraOutputs: any = undefined;
  trace: any = undefined;
  debug: any = undefined;
  info: any = undefined;
  warn: any = undefined;
  error: any = undefined;
  options: any = undefined;

  triggerMetadata?: Record<string, unknown> = undefined;

  log: jest.Mock;
  done: jest.Mock;
  res: {
    status: jest.Mock;
    body: jest.Mock;
  };

  constructor(
    userProperties?: TLadokEventUserProperties,
    appConfig?: Record<string, unknown>,
  ) {
    if (userProperties) {
      this.triggerMetadata = {
        userProperties,
      };
    }

    if (appConfig) {
      const { extraInputs = [], extraOutputs = [], ...rest } = appConfig;
      this.extraInputs = new ExtraInputs(extraInputs);
      this.extraOutputs = new ExtraOutputs(extraOutputs);
    }

    this.log = jest.fn();
    this.done = jest.fn();
    this.res = {
      status: jest.fn(),
      body: jest.fn(),
    };
  }
}

class ExtraOutputs {
  _outputs: any[] = [];
  _results: any[];
  constructor(outputs: unknown = []) {
    this._outputs = outputs as any[];
    this._results = [];
  }

  /**
   * Store the result of a function in the _result array
   * @param outp
   * @param doc
   */
  set(outp: any, doc: any) {
    const index = this._outputs?.indexOf(outp);
    this._results[index] = doc;
  }

  /**
   * Retrieve the result of a function from the _result array using the output
   * config object as key
   * @param outp
   * @returns
   */
  _getResult(outp: any) {
    const index = this._outputs?.indexOf(outp);
    return this._results[index];
  }
}

class ExtraInputs {
  _inputs: any[] = [];
  _results: any[];
  constructor(inputs: unknown = []) {
    this._inputs = inputs as any[];
    this._results = [];
  }
}
