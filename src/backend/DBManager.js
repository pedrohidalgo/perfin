import mongoose from 'mongoose';
import logger from './misc/MyLogger';

export default class DBManager {

  static connect() {
    mongoose.Promise = require('bluebird');
    mongoose.connect('mongodb://localhost:27018/perfin', {
      useMongoClient: true,
    });
  }

  static cleanUpDatabase(disconnect = false) {
    if (mongoose.connection.readyState === 1) {
      // mongoose.connection.db.dropCollection('Category');

      if (disconnect) {
        mongoose.connection.db.dropDatabase(function(err) {
          logger.error('error dropping database: ' + err);
          mongoose.disconnect();
        });
      } else {
        mongoose.connection.dropDatabase();
      }
    }
  }

}
