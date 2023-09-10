import { PartReqOptions, PluginType } from "../type";
type Filters = PartReqOptions[];
export const debugPlugin: (filters: Filters, debug?: boolean) => PluginType =
  (filters: Filters, debug?: boolean) => (interceptor) => {
    interceptor("initFetch", (partReqOptions) => {
      debug &&
        console.log("[debugPlugin]", "color: green", {
          filters,
          partReqOptions,
        });

      return {
        debug: filters.some(
          (it) =>
            it.method === partReqOptions.method &&
            it.path === partReqOptions.path
        ),
      };
    });
  };
