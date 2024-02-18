import {
  PluginType,
  RequestOptions,
  Method,
  ProcessedRequestOptions,
} from "../type";

export type Rule = {
  urlReg: RegExp;
  method: Method;
  response: unknown;
};

export const mockPlugin: (rules: Rule[]) => PluginType =
  (rules) => (interceptor) => {
    interceptor(
      "willFetch",
      (requestOptions: ProcessedRequestOptions<unknown>) => {
        const mockData = rules.find(
          (it) =>
            it.urlReg.test(requestOptions.url) &&
            it.method === requestOptions.method
        );
        if (mockData) {
          return {
            requestOptions,
            response: mockData.response as any,
            skipFetch: true,
          };
        }
        return {
          requestOptions,
        };
      }
    );
  };
