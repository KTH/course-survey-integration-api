import { InvocationContext } from "@azure/functions";
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
  
  log: jest.Mock;
  done: jest.Mock;
  res: {
    status: jest.Mock;
    body: jest.Mock;
  };
  
  constructor() {
    this.log = jest.fn();
    this.done = jest.fn();
    this.res = {
      status: jest.fn(),
      body: jest.fn(),
    };
  }
}