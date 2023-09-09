import { Client, HeadersObject, Interceptor, Interceptors, Use } from "./type";

// 实现一个单例
export default class FetchEngine {
  headers?: HeadersObject;
  baseUrl: string;
  interceptors: Interceptors = { initFetch: [], willFetch: [], didFetch: [] };
  client: Client;
  static instance: FetchEngine;
  static getInstance() {
    return FetchEngine.instance;
  }
  constructor(options: {
    client: Client;
    baseUrl: string;
    headers?: HeadersObject;
  }) {
    if (!FetchEngine.instance) {
      this.client = options.client;
      this.baseUrl = options.baseUrl;
      this.headers = options.headers ?? {};
      FetchEngine.instance = this;
    }
    return FetchEngine.instance;
  }
  setHeaders(headers: HeadersObject) {
    this.headers = { ...this.headers, ...headers };
  }
  interceptor: Interceptor = (hook, hookFunction) => {
    this.interceptors[hook].push(hookFunction);
  };
  use: Use = (plugin) => {
    plugin(this.interceptor);
  };
}
