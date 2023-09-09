import { PluginType, RequestOptions } from "../type";
import { produce } from "immer";

export const serializeDataPlugin: PluginType = (interceptor) => {
  interceptor("willFetch", (requestOptions: RequestOptions) => {
    const next = produce(requestOptions, (draft) => {
      if (draft.method === "GET" && draft.data) {
        const queries = Object.entries(draft.data)
          .map(([k, v]) => `${k}=${v}`)
          .join("&");
        draft.path = draft.path + "?" + queries;
      }
    });
    return {
      requestOptions: next,
    };
  });
};
