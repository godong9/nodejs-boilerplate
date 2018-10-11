const _ = require('lodash');
const express = require('express');
const router = express.Router();
const hystrixjs = require("hystrixjs");

const userController = require('./users/usersController');
const contentsController = require('./contents/contentsController');
const testController = require('./testController');

const hystrixStream = hystrixjs.hystrixSSEStream;
const metricsFactory = hystrixjs.metricsFactory;

// users API controller
router.use('/users', userController);

// contents API controller
router.use('/contents', contentsController);

router.use('/test', testController);

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

router.get("/hystrix.stream", (req, res) => {
  res.header("Content-Type", "text/event-stream;charset=UTF-8");
  res.header("Cache-Control", "no-cache, no-store, max-age=0, must-revalidate");
  res.header("Pragma", "no-cache");

  return hystrixStream.toObservable().subscribe(
    sseData => {
      res.write(`data: ${sseData}\n\n`);
    },
    error => {
    },
    () => res.end()
  );
});

router.get("/hystrix.json", (req, res) => {
  const metricsResponse = [];
  const allMetrics = Array.from(metricsFactory.getAllMetrics());

  // 수집된 메트릭이 있는 경우에만 처리
  if (allMetrics.length > 0) {
    _.forEach(allMetrics, metrics => {
      const json = hystrixStream.toCommandJson(metrics);
      metricsResponse.push(JSON.parse(json));
    });
  }

  res.send(metricsResponse);
});


module.exports = router;
