import { FetchEngine, debugPlugin } from "di-fetch";
import {
  Client,
  PluginType,
  ProcessedRequestOptions,
  RequestData,
} from "di-fetch/build/type";

const client: Client = async <Req extends RequestData, Res>(
  req: ProcessedRequestOptions<Req>
) => {
  const { url, method, data, ...rest } = req;
  if (method === "POST") {
    const res = await fetch(url, {
      method,
      body: JSON.stringify(data),
      ...rest,
    });
    const result = await res.json();
    // console.log('result', result)
    return result;
  }
  const searchParams = new URLSearchParams(data as Record<string, string>);

  const res = await fetch(`${url}?${searchParams.toString()}`, rest);
  const result = await res.json();
  // console.log('result', result)
  return result;
};

export const fetchEngine = new FetchEngine({
  baseUrl: "https://api.github.com/users",
  client,
});

// 在浏览器环境纠正请求协议和网址一致
const protocolPlugin: PluginType = (interceptor) => {
  interceptor(
    "willFetch",
    (requestOptions: ProcessedRequestOptions<unknown>) => {
      console.log("options", requestOptions);
      return {
        requestOptions: requestOptions,
      };
    }
  );
};

fetchEngine.use(debugPlugin([{ path: "/xiamu14", method: "GET" }], true));
fetchEngine.use(protocolPlugin);
