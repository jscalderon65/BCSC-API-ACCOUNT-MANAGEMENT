import { Logger } from '@nestjs/common';
import { MongooseModuleOptions } from '@nestjs/mongoose';
import { MESSAGES } from 'src/common/constants/messages';
import { MONGO_URI } from 'src/common/constants/mongo-db';

const CONNECTION_MESSAGES = MESSAGES.CONNECTION_MESSAGES;

export const mongooseConnection: MongooseModuleOptions = {
  uri: MONGO_URI,
  connectionFactory: (connection) => {
    const logger = new Logger('Mongoose');
    connection.on('connected', () => {
      logger.log(CONNECTION_MESSAGES.MONGO_CORRECT_CONNECTION);
    });

    connection.on('disconnected', () => {
      logger.log(CONNECTION_MESSAGES.MONGO_END_CONNECTION);
    });

    connection._events.connected();

    return connection;
  },
};
