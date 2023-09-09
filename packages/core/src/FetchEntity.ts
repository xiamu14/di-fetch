import FetchEngine from "./FetchEngine";
import { Data, HeadersObject, Method } from "./type";

export default class FetchEntity {
  control: FetchEngine;
  response: unknown;
  error: unknown;
  debug: Boolean;
  constructor() {
    this.control = FetchEngine.getInstance();
  }
  async fetch<D extends Data, Res>(options: {
    path: string;
    method: Method;
    headers?: HeadersObject;
    data: D;
    debug?: boolean;
  }): Promise<Res> {
    console.log(
      "%c [start]0",
      "color:white;background: rgb(83,143,204);padding:4px",
      this.control
    );
    const {
      headers: globalHeaders,
      baseUrl,
      interceptors,
      client,
    } = this.control;

    const { willFetch, didFetch } = interceptors;

    const { path, method, headers: instanceHeaders, data, debug } = options;
    let next = true;
    this.debug = debug ?? false;
    // willFetch
    const endpoint = `${baseUrl}${path}`;

    const headers = { ...globalHeaders, ...instanceHeaders };
    // ---- combine global options and instance options ----
    let requestOptions = { method, headers, path: endpoint, data };
    this.log("info", requestOptions);

    // ---- end ----

    // ---- exec willFetch hooks ----
    for (const plugin of willFetch) {
      const result = plugin<Res>(requestOptions);
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
        this.response = await client(requestOptions);
      } catch (error) {
        this.error = error;
      } finally {
        // ---- exec didFetch hooks ----
        for (const plugin of didFetch) {
          const result = plugin<Res>(this.response as Res, this.error);
          this.response = result.response;
          this.error = result.error;
        }
        // ---- end ----
      }
    }

    // return
    if (this.error) {
      throw this.error;
    }
    return this.response as Res;
  }
  log(
    level: "info" | "warn" | "error",
    data: Record<string | number | symbol, unknown>
  ) {
    console.log(
      "%c [start]1",
      "color:white;background: rgb(83,143,204);padding:4px",
      this.debug
    );
    if (this.debug) {
      const colors = { info: "#4096ff", error: "#ff4d4f", warn: "#ffa940" };
      console[level](
        "%c",
        `color:white;background: ${colors[level]};padding:4px`,
        JSON.stringify(
          data,
          (key, value) => {
            switch (true) {
              case value === null:
                return "null";
              case typeof value === "undefined":
                return "undefined";
              case typeof value === "symbol":
                return value.toString();
              case typeof value === "function":
                return value.toString();
              default:
                break;
            }
            return value;
          },
          2
        )
      );
    }
  }
}
