import Taro from "@tarojs/taro";
import { FetchEngine } from "di-fetch";
import { Client } from "di-fetch/build/type";
import { produce } from "immer";

const client: Client = async (options) => {
  const next = produce(options, (draft) => {
    draft["url"] = draft.path;
  });
  const response = await Taro.request(next as unknown as any);
  return response.data;
};

export const fetchEngine = new FetchEngine({
  baseUrl: "https://petstore.swagger.io/v2",
  client,
});
