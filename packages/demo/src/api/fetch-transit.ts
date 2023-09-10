// custom-instance.ts

import { HTTPErrors, fetch } from "di-fetch";

type Method = "get" | "post" | "put" | "delete" | "patch";

export const fetchTransit = async <Res>(options: {
  url: string;
  method: Method;
  params?: unknown;
  data?: unknown;
  headers?: unknown;
}): Promise<Res> => {
  const { url: path, params, data, method, ...restOptions } = options;

  const response = await fetch({
    path,
    data: data || params,
    method: method.toUpperCase(),
    ...restOptions,
  });

  return response as Res;
};

export default fetchTransit;

// // In some case with react-query and swr you want to be able to override the return error type so you can also do it here like this
export type ErrorType<Error> = HTTPErrors;
// // In case you want to wrap the body type (optional)
// // (if the custom instance is processing data before sending it, like changing the case for example)
export type BodyType<BodyData> = BodyData;
