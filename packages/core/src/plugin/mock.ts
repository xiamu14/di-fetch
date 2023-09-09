import { PluginType, RequestOptions, Method } from "../type";

export type Rule = {
  endpoint: RegExp;
  method: Method;
  response: unknown;
};

export const mockPlugin: (rules: Rule[]) => PluginType =
  (rules) => (interceptor) => {
    interceptor("willFetch", (requestOptions: RequestOptions) => {
      const mockData = rules.find(
        (it) =>
          it.endpoint.test(requestOptions.path) &&
          it.method === requestOptions.method
      );
      if (mockData) {
        return {
          requestOptions,
          response: mockData.response as any,
          shouldFetch: false,
        };
      }
      return {
        requestOptions,
      };
    });
  };
