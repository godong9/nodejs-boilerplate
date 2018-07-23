const axios = require("axios");
const ax = axios.create();
// ax.defaults.timeout = 5000;

const testApiCall = function() {
  return ax.get("http://10.64.86.136:3000/test", {});
};

const testApiCallWrapper = async function() {
  console.log("CALL API");
  await testApiCall()
    .then(() => console.log("SUCCESS"))
    .catch(e => console.log("ERROR"));
};

const testAsyncAwait = async function() {
  await testApiCallWrapper();
};

async function main() {
  console.log("START");
  await testAsyncAwait();
  console.log("END");
}

main();
