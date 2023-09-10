import Taro from "@tarojs/taro";
import { FetchEngine, debugPlugin, Client, HTTPErrorsPlugin } from "di-fetch";

const client: Client = async (options) => {
  const response = await Taro.request(options as unknown as any);
  return response as any;
};

export const fetchEngine = new FetchEngine({
  baseUrl: "https://petstore.swagger.io/v2",
  client,
});

fetchEngine.use(debugPlugin([{ path: "/pet/findByStatus", method: "GET" }]));
fetchEngine.use(HTTPErrorsPlugin);
