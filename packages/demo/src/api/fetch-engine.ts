import Taro from "@tarojs/taro";
import { FetchEngine, debugPlugin, Client, HTTPErrorsPlugin } from "di-fetch";

export const fetchEngine = new FetchEngine({
  baseUrl: "https://petstore.swagger.io/v2",
  client: Taro.request as Client,
});

fetchEngine.use(
  debugPlugin([{ path: "/pet/findByStatus", method: "GET" }], true)
);
fetchEngine.use(HTTPErrorsPlugin);
