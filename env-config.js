/**
  This file will expose environment variables to the client.

  ...Try not to expose the wrong things :)
*/

require("dotenv").config();
const { reduce } = require("ramda");

const envVars = ["SPOTIFY_LOGIN_REDIRECT_URL", "SPOTIFY_CLIENT_ID", "DEV"];

module.exports = reduce(
  (prev, curr) => ({
    ...prev,
    [`process.env.${curr}`]: process.env[curr]
  }),
  {}
)(envVars);
