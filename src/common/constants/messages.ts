import { PORT, TIME_ZONE } from 'src/common/constants/config-app';
import { MONGO_DB } from 'src/common/constants/mongo-db';
export const MESSAGES = {
  APP_RUNNING_STATUS: 'App running on port: ' + PORT + ' and TZ: ' + TIME_ZONE,
  ERROR_MESSAGES: {
    GENERIC_SERVER_ERROR_MESSAGE: 'Internal server error',
  },
  CONNECTION_MESSAGES: {
    MONGO_CORRECT_CONNECTION: 'DB successfully connected to ' + MONGO_DB,
    MONGO_END_CONNECTION: 'DB disconnected',
  },
};
