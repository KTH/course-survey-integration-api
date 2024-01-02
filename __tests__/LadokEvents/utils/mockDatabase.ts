import { Database } from "../../../src/functions/utils";

export class MockDatabase implements Database {
  _result: any;
  _mockData: any;
  _client: any;

  constructor(mockData: any) {
    this._mockData = mockData;
  }

  async connect(): Promise<void> {
    // Do nothing
  }
  async close(): Promise<void> {
    // Do nothing
  }

  async read(id: string, collectionName: string): Promise<any> {
    // TODO: Read mock data
    return this._mockData;
  }

  async write(doc: any, collectionName: string): Promise<void> {
    this._result = doc;
  }
}