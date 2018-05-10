const express = require('express');
const router = express.Router();

const userController = require('./users/usersController');
const contentsController = require('./contents/contentsController');

// users API controller
router.use('/users', userController);

// contents API controller
router.use('/contents', contentsController);

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

module.exports = router;
