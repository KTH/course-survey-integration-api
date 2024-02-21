const assert = require("assert");
require("dotenv").config();

module.exports = async function (globalConfig, projectConfig) {
  const env = globalThis.process.env;
  assert(
    env.OAUTH_SERVER_BASE_URI !== undefined,
    "OAUTH_SERVER_BASE_URI is not defined",
  );
  assert(
    env.UG_REST_API_BASEURL !== undefined,
    "UG_REST_API_BASEURL is not defined",
  );
  assert(
    env.UG_REST_API_CLIENT_ID !== undefined,
    "UG_REST_API_CLIENT_ID is not defined",
  );
  assert(
    env.UG_REST_API_CLIENT_SECRET !== undefined,
    "UG_REST_API_CLIENT_SECRET is not defined",
  );
};
