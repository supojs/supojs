import { RequestParams } from "packages/core/src/RequestParams";

export default function (params: RequestParams) {
  return params.query;
}
