import { HttpRequest, HttpRequestParams, HttpRequestUser } from "@azure/functions";
import { ReadableStream } from 'stream/web';
import { Blob } from 'buffer';
import { FormData } from 'undici';

export class MockRequest implements HttpRequest {
  method: string;
  url: string;
  headers: Headers;
  query: URLSearchParams;
  params: HttpRequestParams;
  user: HttpRequestUser | null;
  body: ReadableStream | null;
  bodyUsed: boolean;
  // arrayBuffer: () => Promise<ArrayBuffer>;
  // blob: () => Promise<Blob>;
  // formData: () => Promise<FormData>;
  // json: () => Promise<unknown>;
  // text: () => Promise<string>;

  constructor({
    // Add more properties as needed
    params = {},
  } = {}) {
    this.params = params;
    this.method = "GET";
    this.url = "http://localhost";
    this.headers = new Headers();
    this.query = new URLSearchParams();
    this.user = null;
    this.body = null;
    this.bodyUsed = false;
  }

  async arrayBuffer() {
    return Promise.resolve(new ArrayBuffer(0));
  }

  async blob() {
    const blob = new Blob([], { type: 'text/plain' });
    return Promise.resolve(blob);
  }

  async formData() {
    return Promise.resolve(new FormData());
  }

  async json() {
    return Promise.resolve({});
  }

  async text() {
    return Promise.resolve("");
  } 
}
