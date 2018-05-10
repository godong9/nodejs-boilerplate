const express = require('express');
const router = express.Router();

/* GET contents listing. */
router.get('/', (req, res, next) => {
  res.send('respond with contents resource');
});

module.exports = router;
