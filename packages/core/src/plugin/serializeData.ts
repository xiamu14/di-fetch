import { PluginType, ProcessedRequestOptions } from "../type";
import { produce } from "immer";

export const serializeDataPlugin: PluginType = (interceptor) => {
  interceptor(
    "willFetch",
    (requestOptions: ProcessedRequestOptions<unknown>) => {
      const next = produce(requestOptions, (draft) => {
        if (draft.method === "GET" && draft.data) {
          const queries = Object.entries(draft.data)
            .map(([k, v]) => `${k}=${v}`)
            .join("&");
          draft.url = draft.url + "?" + queries;
        }
      });
      return {
        requestOptions: next,
      };
    }
  );
};
