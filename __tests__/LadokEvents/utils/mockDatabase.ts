import { Database, DbCollectionName } from "../../../src/functions/utils";

export class MockDatabase implements Database {
  _result: Record<DbCollectionName, any>;
  _mockData: Record<DbCollectionName, any>;
  _client: any;

  constructor(mockData: Record<DbCollectionName, any> | undefined = undefined) {
    this._mockData = mockData ?? {} as Record<DbCollectionName, any>;
    this._result = {} as Record<DbCollectionName, any>;
  }

  async connect(): Promise<void> {
    // Do nothing
  }
  async close(): Promise<void> {
    // Do nothing
  }

  async fetchById(id: string, collectionName: DbCollectionName): Promise<any> {
    // TODO: Read mock data
    const data = this._mockData[collectionName]
    const outp = Array.isArray(data) ? data : [data];
    return outp.filter((doc: any) => doc.id === id)[0];
  }

  async queryByProperty(propName: string, value: string, collectionName: DbCollectionName): Promise<any[]> {
    const data = this._mockData[collectionName]
    const outp = Array.isArray(data) ? data : [data];
    return outp.filter((doc: any) => doc[propName] === value);
  }

  async countByPropertyQuery(propName: string, value: string, collectionName: DbCollectionName): Promise<number> {
    return 1;
  }

  async insert(doc: any, collectionName: DbCollectionName): Promise<void> {
    this._result[collectionName] = doc;
  }

  async update(id: string, partial: any, collectionName: DbCollectionName): Promise<void> {
    if (id === this._result[collectionName].id) {
      this._result[collectionName] = { ...this._result[collectionName], ...partial };
    } else if (id === this._mockData[collectionName].id) {
      this._result[collectionName] = { ...this._mockData[collectionName], ...partial };
    } else {
      this._result[collectionName] = { ...partial };
    }
  }
}