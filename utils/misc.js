import queryString from "query-string"
import { propOr, pathOr, pipe } from "ramda"

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