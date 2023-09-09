export { default as FetchEngine } from "./FetchEngine";
import FetchEntity from "./FetchEntity";
export { serializeDataPlugin } from "./plugin/serializeData";
export { mockPlugin } from "./plugin/mock";
export { debugPlugin } from "./plugin/debug";
export { type Client } from "./type";
export async function fetch(options: any) {
  const fetchEntity = new FetchEntity();
  const response = await fetchEntity.fetch(options);
  return response;
}
