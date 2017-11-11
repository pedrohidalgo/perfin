const logger = require('caterpillar').create({level: 6});

const human = require('caterpillar-human').create();

logger.pipe(human).pipe(process.stdout);

export default class MyLogger {
  static info(message) {
    logger.log('info', message);
  }

  static debug(message) {
    logger.log('debug', message);
  }

  static error(message) {
    logger.log('error', message);
  }
}