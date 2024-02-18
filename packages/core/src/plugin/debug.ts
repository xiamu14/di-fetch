import { PartReqOptions, PluginType } from "../type";
import cliColor from "cli-color";

type Filters = PartReqOptions[];
export const debugPlugin: (filters: Filters, debug?: boolean) => PluginType =
  (filters: Filters, debug?: boolean) => (interceptor) => {
    interceptor("initFetch", (partReqOptions) => {
      if (debug) {
        console.log(cliColor.xterm(69)("[debugFilters]"));
        console.log(
          JSON.stringify({
            filters,
            partReqOptions,
          })
        );
      }
      return {
        debug: filters.some(
          (it) =>
            it.method === partReqOptions.method &&
            it.path === partReqOptions.path
        ),
      };
    });
  };
