import { ObjectId } from "mongodb";
import { Database, DbCollectionName, TMessageEntity, TQueryOptions, TTransAction } from "../../src/functions/db";

type TQuery = {
  query: string;
  docs: any[];
};

export class MockDatabase implements Database {
  _result: Record<DbCollectionName, any>;
  _transactionLog: { action: string, collectionName: string, relatedId: string, createdAt: string, delta: Record<string, any> }[];
  _incomingMessageLog: Record<string, any>;
  _mockData: Record<DbCollectionName, any>;
  _client: any;
  _queryOptions: (TQueryOptions | undefined)[];

  // I would have prefered narrowing keys in mockData to type DbCollectionName but
  // the syntax Record<DbCollectionName, any> requires all keys from DbCollectionName
  // to be present.
  /**
   * @param mockData an array of objects that can be queried by .filter(), either a document or a TQuery (only used for query()).
   */
  constructor(mockData: Record<string, any> | undefined = undefined) {
    this._mockData = mockData ?? ({} as Record<DbCollectionName, TQuery | any>);
    this._result = {} as Record<DbCollectionName, any>;
    this._transactionLog = [];
    this._incomingMessageLog = {}; // Ladok3FeedEvents
    this._queryOptions = [ ]
  }

  async _logTransaction(action: TTransAction, collectionName: string, doc: any, _id?: string | ObjectId): Promise<void> {
    this._transactionLog.push({ action, collectionName: collectionName, relatedId: "__dummy_id__", createdAt: "1884-01-01 Test Dummy", delta: { ...doc } })
  }

  async _logIncomingMessage(
    invocationId: string,
    doc: TMessageEntity,
  ): Promise<void> {
    this._incomingMessageLog[invocationId] = { ...doc }; // Ladok3FeedEvents
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

    return outp.filter((doc: any) => _getVal(doc, propName) === value);
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
    await this._logTransaction("insert", collectionName, { ...doc }, "__dummy_id__");
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
      // Not found!
      // this._result[collectionName] = { ...partial };
    }
    await this._logTransaction("update", collectionName, { ...partial });
  }

  async upsert(
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
      await this._logTransaction("insert", collectionName, { id, ...partial }, "__dummy_id__");
      return;
    }
    
    await this._logTransaction("update", collectionName, { id, ...partial });
  }
}

function _getVal(doc: any, propName: string): any {
  if (doc) {
    let tmp = doc;
    let propLst: string[] = propName?.split(".");
    while (propLst.length > 0) {
      const p = propLst.shift();
      if (p === undefined) break;
      tmp = tmp?.[p];
    }
    return tmp;
  }
}