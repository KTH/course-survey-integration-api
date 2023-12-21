import { Db } from "mongodb";

class MockCollection {
  // This is the result of the last db operation
  _lastResult: any = undefined;
  // Methods that we use in our code need to be mocked here
  async insertOne(doc: any) {
    this._lastResult = doc;
    return {
      acknowledged: true,
      insertedId: "mockId",
    };
  }
}

export class MockDb implements Db {
  // These are just dummy props to satisfy the type system
  query: jest.Mock;
  databaseName: string = "";
  options: any = {};
  secondaryOk: boolean = false;
  readConcern: any = undefined;
  namespace: any = undefined;
  createCollection: any = undefined;
  command: any = undefined;
  aggregate: any = undefined;
  admin: any = undefined;
  stats: any = undefined;
  listCollections: any = undefined;
  renameCollection: any = undefined;
  dropCollection: any = undefined;
  dropDatabase: any = undefined;
  collections: any = undefined;
  createIndex: any = undefined;
  removeUser: any = undefined;
  setProfilingLevel: any = undefined;
  profilingLevel: any = undefined;
  indexInformation: any = undefined;
  watch: any = undefined;
  runCursorCommand: any = undefined;
  readPreference: any = undefined;
  bsonOptions: any = undefined;
  writeConcern: any = undefined;
  
  constructor() {
    this.query = jest.fn();
  }

  // Methods that we actually need to mock
  _collection: any = undefined;
  collection(name: string = ""): any {
    this._collection ??= new MockCollection();
    return this._collection;
  }
}