export type Method = "GET" | "POST" | "DELETE" | "PUT" | "PATCH";
export type RequestCache =
  | "default"
  | "force-cache"
  | "no-cache"
  | "no-store"
  | "only-if-cached"
  | "reload";

/** 'application/json' need serve support */
type ContentType =
  | "application/json"
  | "multipart/form-data"
  | "text/plain"
  | "application/x-www-form-urlencoded";

type PartHeaders = {
  "Content-Type"?: ContentType;
  Authorization?: `Bearer ${string}`;
};

export type HeadersObject = PartHeaders & Record<string, string>;

type ValidSingleValue = string | number | boolean;
type ValidValue = ValidSingleValue | Record<string, ValidSingleValue>;
export type Data = Record<string, ValidValue> | undefined;
export interface RequestOptions {
  path: string;
  method: Method;
  headers?: HeadersObject;
  data: Data;
}

/** fetch 生命周期钩子函数 */
export type Hooks = {
  willFetch: <R>(requestOptions: RequestOptions) => {
    requestOptions: RequestOptions;
    shouldFetch?: boolean;
    response?: R;
  };
  didFetch: <R>(
    response: R,
    error: unknown
  ) => { response: R; error?: unknown };
};

/** fetch 生命周期 */
export type HookType = keyof Hooks;

export type Client = <D extends Data, R>(options: {
  path: string;
  method: Method;
  headers?: HeadersObject;
  data: D;
}) => Promise<R>;

export type Interceptor = <T extends HookType>(
  hook: HookType,
  hookFunction: Hooks[T]
) => void;

export type PluginType = (interceptor: Interceptor) => void;

export type Use = (plugin: PluginType) => void;
