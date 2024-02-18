export { default as FetchEngine } from "./FetchEngine";
import FetchEntity from "./FetchEntity";
export { serializeDataPlugin } from "./plugin/serializeData";
export { mockPlugin } from "./plugin/mock";
export { debugPlugin } from "./plugin/debug";
export {
  HTTPErrorsPlugin,
  isHTTPErrors,
  HTTPErrors,
} from "./plugin/HTTPErrors";
export { isBrowser, isNodeJs } from "./utils";

export { type Client } from "./type";

export async function fetchX<P>(data: any) {
  const fetchEntity = new FetchEntity();
  const response = await fetchEntity.fetch<any, P>(data);
  return response;
}
