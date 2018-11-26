import queryString from "query-string";
import { propOr, pathOr, pipe, addIndex, map, curry } from "ramda";

const getLocationHash = pathOr("", ["location", "hash"]);
const getAccessToken = propOr(false, "access_token");

export const checkUserIsLoggedIn = pipe(
  getLocationHash,
  queryString.parse,
  getAccessToken
);

export const takeRandX = curry((count, arr) => {
  const arr2 = [...arr];
  const chosen = [];

  for (let i = 0; i < count; i += 1) {
    chosen.push(arr2.splice(Math.floor(Math.random() * arr2.length), 1));
  }

  return chosen;
});

export const mapIndexed = addIndex(map);
