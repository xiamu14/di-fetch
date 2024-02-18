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
export type RequestData = Record<string, ValidValue> | undefined;

export interface RequestOptions<Req> {
  path: string;
  method: Method;
  data: Req;
  headers?: HeadersObject;
  debug?: false;
}

export type ProcessedRequestOptions<Req> = Omit<RequestOptions<Req>, "path"> & {
  url: string;
};

export type PartReqOptions = Pick<RequestOptions<unknown>, "path" | "method">;

/** fetch 生命周期钩子函数 */
export type Hooks = {
  initFetch: (partReqOptions: PartReqOptions) => {
    debug?: boolean;
  };
  willFetch: (requestOptions: ProcessedRequestOptions<unknown>) => {
    requestOptions: ProcessedRequestOptions<unknown>;
    skipFetch?: boolean;
    response?: unknown;
  };
  didFetch: (
    response: unknown,
    error: unknown
  ) => { response: unknown; error?: unknown };
};

/** fetch 生命周期 */
export type HookType = keyof Hooks;
export type DataObject = Record<string, any>;

export type Client = <Req extends RequestData, Res>(
  options: ProcessedRequestOptions<Req>
) => Promise<Res>;

export type Interceptor = <T extends HookType>(
  hook: T,
  hookFunction: Hooks[T]
) => void;

export type Interceptors = {
  [x in HookType]: Hooks[x][];
};

export type PluginType = (interceptor: Interceptor) => void;

export type Use = (plugin: PluginType) => void;
