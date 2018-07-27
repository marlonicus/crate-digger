import queryString from "query-string"
import { propOr, pathOr, pipe, addIndex, map } from "ramda"

const getLocationHash = pathOr("", ["location", "hash"])
const getAccessToken = propOr(false, "access_token")
const getTestMode = propOr(false, "test")

export const checkUserIsLoggedIn = pipe(
	getLocationHash,
	queryString.parse,
	getAccessToken,
)

export const checkTestMode = pipe(
	getLocationHash,
	queryString.parse,
	getTestMode,
)

export const mapIndexed = addIndex(map)

export const getRandomColor = () => {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
