import Taro from "@tarojs/taro";
import { FetchEngine, debugPlugin, Client } from "di-fetch";

const client: Client = async (options) => {
  const response = await Taro.request(options as unknown as any);
  return response.data;
};

export const fetchEngine = new FetchEngine({
  baseUrl: "https://petstore.swagger.io/v2",
  headers: {
    Authorization: "Bearer xx",
  },
  client,
});

fetchEngine.use(debugPlugin([{ path: "/pet/1", method: "GET" }]));
