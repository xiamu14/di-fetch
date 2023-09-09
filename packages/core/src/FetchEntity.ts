import FetchEngine from "./FetchEngine";
import { DataObject, RequestData, RequestOptions } from "./type";

export default class FetchEntity {
  engine: FetchEngine;
  response: unknown;
  error: unknown;
  debug: Boolean;
  constructor(option?: { debug?: boolean }) {
    this.engine = FetchEngine.getInstance();
    if (option) {
      this.debug = option.debug ?? false;
    }
  }
  async fetch<Req extends RequestData, Res>(
    options: RequestOptions<Req>
  ): Promise<Res> {
    const {
      headers: globalHeaders,
      baseUrl,
      interceptors,
      client,
    } = this.engine;
    const { initFetch, willFetch, didFetch } = interceptors;
    const { path, method, headers: instanceHeaders, data } = options;

    // ---- exec initFetch hooks ----
    for (const plugin of initFetch) {
      const result = plugin({ path, method });

      if (result?.debug) {
        this.debug = result.debug;
        console.group(`${path} [${method}]`);
      }
    }
    // ---- end ----

    let next = true;
    // this.debug = debug ?? false;
    // willFetch
    const url = `${baseUrl}${path}`;

    const headers = { ...globalHeaders, ...instanceHeaders };
    // ---- combine global options and instance options ----
    let requestOptions = { method, headers, url, data };
    this.log("info", "requestOptions", requestOptions);

    // ---- end ----

    // ---- exec willFetch hooks ----
    for (const plugin of willFetch) {
      const result = plugin(requestOptions);
      requestOptions = result?.requestOptions as any;
      if (!result?.shouldFetch) {
        this.response = result?.response;
        next = false;
        break;
      }
    }
    // ---- end ----
    if (next) {
      // fetching
      try {
        this.response = await client<Req, Res>(requestOptions);
        this.log("info", "response", this.response as DataObject);
      } catch (error) {
        this.error = error;
      } finally {
        // ---- exec didFetch hooks ----
        for (const plugin of didFetch) {
          const result = plugin(this.response as Res, this.error);
          this.response = result.response;
          this.error = result.error;
        }
        // ---- end ----
      }
    }
    if (this.debug) {
      console.groupEnd();
    }
    // return
    if (this.error) {
      throw this.error;
    }
    return this.response as Res;
  }
  log(level: "info" | "warn" | "error", group: string, data: DataObject) {
    if (this.debug) {
      const colors = { info: "#4096ff", error: "#ff4d4f", warn: "#ffa940" };
      console[level](
        `%c [${group}]`,
        `color:white;background: ${colors[level]};padding:4px`,
        data
      );
    }
  }
}
