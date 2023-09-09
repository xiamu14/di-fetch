import { PartReqOptions, PluginType } from "../type";
type Filters = PartReqOptions[];
export const debugPlugin: (filters: Filters) => PluginType =
  (filters: Filters) => (interceptor) => {
    interceptor("initFetch", (partReqOptions) => {
      console.log("initFetch", { filters, partReqOptions });

      return {
        debug: filters.some(
          (it) =>
            it.method === partReqOptions.method &&
            it.path === partReqOptions.path
        ),
      };
    });
  };
