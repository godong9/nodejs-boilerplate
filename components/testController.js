const express = require('express');
const moment = require('moment');
const _ = require('lodash');
const fs = require('fs');
const Crawler = require('crawler');

const router = express.Router();


router.get('/hang', (req, res) => {
  console.log('CALL hang api');
});


module.exports = router;
