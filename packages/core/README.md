```ts
import { FetchEngine, fetch, serializeDataPlugin, mockPlugin } from "di-fetch";

const fetchEngine = new FetchEngine({
  baseUrl: configKit.apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
    "x-app-id": appid,
    "x-app-version": configKit.config.currentVersion ?? "",
  },
  client: taro.request,
});

fetchEngine.setHeaders({
  Authorization: `Bearer ${token}`,
});

function mockApi({ interceptor, instance }) {
  interceptor("willFetch", (request) => {
    if (request.url.includes("")) {
      instance.response = {};
      instance.complete();
    } else {
      instance.next();
    }
  });
}
function expiredToken({ interceptor }) {
  interceptor("didFetch", (response) => {
    // token 过期
    if (response.code === 300) {
      goPage("index", { method: "relaunch" });
    } else {
      return response;
    }
  });
}

fetchEngine.use(mockPlugin([{
    endpoint: //,
    method: 'GET',
    response: {}
  }]));
fetchEngine.use(expiredToken);
fetchEngine.use(serializeDataPlugin);


```
