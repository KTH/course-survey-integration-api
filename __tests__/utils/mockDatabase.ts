import { Database, DbCollectionName, TQueryOptions } from "../../src/functions/db";

type TQuery = {
  query: string;
  docs: any[];
};

export class MockDatabase implements Database {
  _result: Record<DbCollectionName, any>;
  _mockData: Record<DbCollectionName, any>;
  _client: any;
  _queryOptions: (TQueryOptions | undefined)[];

  // I would have prefered narrowing keys to DbCollectionName but
  // the syntax Record<DbCollectionName, any> requires all keys
  // from DbCollectionName to be present.
  /**
   * @param mockData an array of objects that can be queried by .filter(), either a document or a TQuery (only used for query()).
   */
  constructor(mockData: Record<string, any> | undefined = undefined) {
    this._mockData = mockData ?? ({} as Record<DbCollectionName, TQuery | any>);
    this._result = {} as Record<DbCollectionName, any>;
    this._queryOptions = [ ]
  }

  async connect(): Promise<void> {
    // Do nothing
  }
  async close(): Promise<void> {
    // Do nothing
  }

  async fetchById(id: string, collectionName: DbCollectionName): Promise<any> {
    // TODO: Read mock data
    const data = this._mockData[collectionName];
    const outp = Array.isArray(data) ? data : [data];
    return outp.filter((doc: any) => doc?.id === id)[0];
  }

  async queryByProperty(
    propName: string,
    value: string,
    collectionName: DbCollectionName,
    options?: TQueryOptions
  ): Promise<any[]> {
    this._queryOptions.push(options);
    const data = this._mockData[collectionName];
    const outp = Array.isArray(data) ? data : [data];
    
    if (typeof value === "object") {
      // We don't need to mock proper queries
      return outp;
    }

    return outp.filter((doc: any) => doc?.[propName] === value);
  }

  /**
   * Checks this._mockData[collectionName][JSON.stringify(query)] for a match.
   * @param query
   * @param collectionName
   * @returns
   */
  async query(
    query: any,
    collectionName: DbCollectionName,
    options?: TQueryOptions,
  ): Promise<any[]> {
    this._queryOptions.push(options);
    const data = this._mockData[collectionName];
    const outp = Array.isArray(data) ? data : [data];
    return outp
      .filter((res: TQuery) => res.query === JSON.stringify(query))
      .map((res: TQuery) => res.docs);
  }

  async countByPropertyQuery(
    propName: string,
    value: string,
    collectionName: DbCollectionName,
  ): Promise<number> {
    const res = await this.queryByProperty(propName, value, collectionName);
    return res.length;
  }

  async insert(doc: any, collectionName: DbCollectionName): Promise<void> {
    this._result[collectionName] = doc;
  }

  async update(
    id: string,
    partial: any,
    collectionName: DbCollectionName,
  ): Promise<void> {
    if (id === this._result[collectionName]?.id) {
      this._result[collectionName] = {
        ...this._result[collectionName],
        ...partial,
      };
    } else if (id === this._mockData[collectionName]?.id) {
      this._result[collectionName] = {
        ...this._mockData[collectionName],
        ...partial,
      };
    } else {
      this._result[collectionName] = { ...partial };
    }
  }
}
