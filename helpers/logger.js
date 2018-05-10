const winston = require('winston');
const config = require('config');
const moment = require('moment');
const dailyLogRotate = require('winston-daily-rotate-file');

const logger = new winston.Logger({});
const timestampOptions = {
  timestamp: () => moment().format()
};

winston.transports.DailyLogRotate = dailyLogRotate;

logger.configure({
  transports: [
    new winston.transports.Console(Object.assign({}, config.get('logger').console, timestampOptions)),
    new winston.transports.DailyRotateFile(Object.assign({}, config.get('logger').rotate, timestampOptions))
  ]
});

logger.stream = {
  write: (message) => {
    logger.info(message);
  }
};

module.exports = logger;
