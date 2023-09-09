export { default as FetchEngine } from "./FetchEngine";
import FetchEntity from "./FetchEntity";
export { serializeDataPlugin } from "./plugin/serializeData";
export { mockPlugin } from "./plugin/mock";

export async function fetch(options: any) {
  const fetchEntity = new FetchEntity();
  console.log(
    "%c [start]",
    "color:white;background: rgb(83,143,204);padding:4px",
    options
  );
  const response = await fetchEntity.fetch(options);
  return response;
}
