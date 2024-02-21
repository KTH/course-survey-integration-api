const fs = require("fs");
const assert = require("assert");

module.exports = async function (globalConfig, projectConfig) {
  // console.log(globalConfig.testPathPattern);
  // console.log(projectConfig.cache);

  // Set reference to mongod in order to close the server during teardown.
  const file = fs.readFileSync(".env");
  const rows = file.toString().split("\n");
  for (const row of rows) {
    if (row.startsWith("#")) continue;
    const [key, value] = row.split(" #")[0].split("=");
    if (value === undefined || value.trim().length === 0) continue;
    globalThis.process.env[key] = value.trim();
  }

  const env = globalThis.process.env;
  assert(
    env.LADOK_API_BASEURL !== undefined,
    "LADOK_API_BASEURL is not defined",
  );
  assert(
    env.LADOK_API_PFX_BASE64 !== undefined,
    "LADOK_API_PFX_BASE64 is not defined",
  );
  assert(
    env.LADOK_API_PFX_PASSPHRASE !== undefined,
    "LADOK_API_PFX_PASSPHRASE is not defined",
  );
  assert(
    env.KOPPS_API_URL === "https://api-r.referens.sys.kth.se/api/kopps/v2/",
    "KOPPS_API_URL is not pointing to test environment",
  );
  assert(
    env.KOPPS_API_SUBSCRIPTION_KEY === undefined,
    "KOPPS_API_SUBSCRIPTION_KEY should not be defined",
  );
};
