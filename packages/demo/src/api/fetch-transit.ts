// custom-instance.ts

import { fetch } from "di-fetch";

type Method = "get" | "post" | "put" | "delete" | "patch";

export const fetchTransit = async <T>(options: {
  url: string;
  method: Method;
  params?: any;
  data?: unknown;
  headers?: unknown;
  responseType?: string;
}): Promise<T> => {
  const { url: path, ...data } = options;

  const response = await fetch({
    path,
    ...data,
    debug: true,
  });

  return response as any;
};

export default fetchTransit;

// // In some case with react-query and swr you want to be able to override the return error type so you can also do it here like this
export type ErrorType<Error> = Error;
// // In case you want to wrap the body type (optional)
// // (if the custom instance is processing data before sending it, like changing the case for example)
export type BodyType<BodyData> = BodyData;
