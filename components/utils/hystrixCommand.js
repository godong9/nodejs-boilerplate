const axios = require('axios');
const hystrixjs = require('hystrixjs');

const CommandFactory = hystrixjs.commandFactory;

const DEFAULT_HYSTRIX_OPTION = {
  enabled: false,
  forceOpen: false,
  apiKey: 'default',
  errorThresholdPercentage: 30,
  timeout: 1000,
  sleep: 5000
};

function _request(axiosRequest, url, axiosParams, hystrixParams) {
  if (!hystrixParams.enabled) {
    return axiosRequest(url, axiosParams);
  }

  const command = CommandFactory.getOrCreate(hystrixParams.apiKey)
    .circuitBreakerErrorThresholdPercentage(hystrixParams.errorThresholdPercentage)
    .timeout(hystrixParams.timeout)
    .run(axiosRequest)
    .circuitBreakerSleepWindowInMilliseconds(hystrixParams.sleep)
    .circuitBreakerForceOpened(hystrixParams.forceOpen)
    .build();

  return command.execute(url, axiosParams);
}

class HystrixCommand {
  static requestGet(url, params = {}, options = {}) {
    return _request(axios.get, url, params, Object.assign({}, DEFAULT_HYSTRIX_OPTION, options));
  }

  static requestPost(url, params = {}, options = {}) {
    return _request(axios.post, url, params, Object.assign({}, DEFAULT_HYSTRIX_OPTION, options));
  }

  static requestPut(url, params = {}, options = {}) {
    return _request(axios.put, url, params, Object.assign({}, DEFAULT_HYSTRIX_OPTION, options));
  }

  static requestDelete(url, params = {}, options = {}) {
    return _request(axios.delete, url, params, Object.assign({}, DEFAULT_HYSTRIX_OPTION, options));
  }
}

module.exports = HystrixCommand;
