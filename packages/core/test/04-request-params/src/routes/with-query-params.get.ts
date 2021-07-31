import { RequestParams } from "packages/core/src/RequestParams";

export default function (requestParams: RequestParams) {
  return requestParams.query;
}
