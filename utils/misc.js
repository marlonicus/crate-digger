import queryString from "query-string";
import { propOr, pathOr, pipe, addIndex, map } from "ramda";

const getLocationHash = pathOr("", ["location", "hash"]);
const getAccessToken = propOr(false, "access_token");
const getTestMode = propOr(false, "test");

export const checkUserIsLoggedIn = pipe(
  getLocationHash,
  queryString.parse,
  getAccessToken
);

export const checkTestMode = pipe(
  getLocationHash,
  queryString.parse,
  getTestMode
);

export const mapIndexed = addIndex(map);
