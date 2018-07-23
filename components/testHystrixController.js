const express = require('express');
const axios = require('axios');
const hystrixjs = require('hystrixjs');

const router = express.Router();
const CommandsFactory = hystrixjs.commandFactory;

let apiTestCounter1 = 1;
let apiTestCounter2 = 1;

function getTestApi1() {
  return axios.get('http://127.0.0.1:3000/test/api1');
}

function getTestApi2() {
  return axios.get('http://127.0.0.1:3000/test/api2');
}

function testApiFallback() {
  return Promise.resolve({ data: { result: 'fallback' } });
}

router.get('/', (req, res) => {
  const API_KEY_1 = 'test_api1';
  const API_KEY_2 = 'test_api2';
  const ERROR_THRESHOLD = 30;
  const CONCURRENCY = 10;
  const TIMEOUT = 500;
  const SLEEP = 5000;

  CommandsFactory.resetCache();

  const command1 = CommandsFactory.getOrCreate(API_KEY_1)
    .circuitBreakerErrorThresholdPercentage(ERROR_THRESHOLD) //
    .timeout(TIMEOUT)
    .run(getTestApi1)
    .circuitBreakerRequestVolumeThreshold(CONCURRENCY)
    .circuitBreakerSleepWindowInMilliseconds(SLEEP)
    .statisticalWindowLength(1000)
    .statisticalWindowNumberOfBuckets(10)
    .percentileWindowLength(1000)
    .percentileWindowNumberOfBuckets(10)
    .fallbackTo(testApiFallback)
    // .errorHandler(isErrorHandler)
    // .circuitBreakerForceOpened(true)
    .build();

  const command2 = CommandsFactory.getOrCreate(API_KEY_2)
    .circuitBreakerErrorThresholdPercentage(ERROR_THRESHOLD) //
    .timeout(TIMEOUT)
    .run(getTestApi2)
    .circuitBreakerRequestVolumeThreshold(CONCURRENCY)
    .circuitBreakerSleepWindowInMilliseconds(SLEEP)
    .statisticalWindowLength(1000)
    .statisticalWindowNumberOfBuckets(10)
    .percentileWindowLength(1000)
    .percentileWindowNumberOfBuckets(10)
    .fallbackTo(testApiFallback)
    // .errorHandler(isErrorHandler)
    // .circuitBreakerForceOpened(true)
    .build();

  const requestPromise1 = command1.execute();
  const requestPromise2 = command2.execute();


  Promise.all([requestPromise1, requestPromise2])
    .then(responses => {
      console.log(`responses.length: ${responses.length}`);
      res.send({ result: 'Success' });
    })
    .catch(e => {
      res.send({ error: e.toString() });
    });
});

router.get('/api1', (req, res) => {
  apiTestCounter1 += 1;

  if (apiTestCounter1 % 2 === 0) {
    setTimeout(() => {
      res.send({ result: 'hystrixJS api1 test' });
    }, 1000);
  } else if (apiTestCounter1 % 3 === 0) {
    res.status(404).send({ error: 'error' });
  } else {
    res.send({ result: 'hystrixJS api1 test' });
  }
});

router.get('/api2', (req, res) => {
  apiTestCounter2 += 1;

  if (apiTestCounter2 % 2 === 0) {
    res.status(404).send({ error: 'error' });
  } else {
    res.send({ result: 'hystrixJS api2 test' });
  }

});

module.exports = router;
