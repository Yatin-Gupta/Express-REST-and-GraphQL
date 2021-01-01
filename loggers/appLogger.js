const winston = require('winston');
const path = require('path');
const projectRoot = path.join(process.mainModule.filename, "..");

if (process.env.NODE_ENV === 'production') {
  // Disabling console.log in PRODUCTION Environment
  console.log = function () { };
}

const logger = winston.createLogger({
    level: 'http',
    format: winston.format.json(),
    transports: [
      //
      // - Write all logs with level `error` and below to `error.log`
      // - Write all logs with level `http` and below to `combined.log`
      //
      new winston.transports.File({ filename: path.join(projectRoot, 'logs', 'error.log'), level: 'error' }),
      new winston.transports.File({ filename: path.join(projectRoot, 'logs', 'combined.log') }),
    ],
  });
   
  //
  // If we're not in production then log to the `console` with the format:
  // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
  //
  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
  }

  module.exports = logger;
