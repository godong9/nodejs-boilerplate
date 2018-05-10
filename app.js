const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const morgan = require('morgan');

const logger = require('./helpers/logger');
const HttpCode = require('./helpers/httpCode');

const indexController = require('./components/indexController');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// use helmet
app.use(helmet());
app.disable('x-powered-by');

// morgan logger setting
app.use(morgan('short', { stream: logger.stream }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// route settings
app.use('/', indexController);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

/* eslint-disable no-unused-vars */
// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  logger.error(err);

  // render the error page
  res.status(err.status || HttpCode.INTERNAL_SERVER_ERROR);
  res.render('error');
});

process
  .on('unhandledRejection', (reason, p) => {
    logger.error('Unhandled Rejection at:', p, 'reason:', reason);
  });

module.exports = app;
