import { PORT, TIME_ZONE } from 'src/common/constants/config-app';
import { MONGO_DB } from 'src/common/constants/mongo-db';
export const MESSAGES = {
  APP_RUNNING_STATUS: 'App running on port: ' + PORT + ' and TZ: ' + TIME_ZONE,
  ERROR_MESSAGES: {
    GENERIC_SERVER_ERROR_MESSAGE: 'Internal server error',
  },
  RESPONSE_MESSAGES: {
    NOT_FOUND_BY_ID: (ENTITY_NAME: string, ID: string): string => {
      return `${ENTITY_NAME} with ID ${ID} not found`;
    },
  },
  CONNECTION_MESSAGES: {
    MONGO_CORRECT_CONNECTION: 'DB successfully connected to ' + MONGO_DB,
    MONGO_END_CONNECTION: 'DB disconnected',
  },
  FIXED_RATE_CDT_ERRORS: {
    NOT_ENOUGH_MONEY: 'You dont have enough money',
    AMOUNT_NOT_IN_RATE_LIMIT:
      'Amount to deposit is not within the range of the selected interest rate.',
    DEPOSIT_DAYS_NOT_IN_RATE_LIMIT:
      'The deposit days do not correspond to any allowed range of days in the chosen Fixed Rate Certificate.',
  },
  SCHEDULE_FIXED_RATE_CDT_LIQUIDATIONS_PROCESS: {
    STARTING_PROCESS: 'Starting schedule process',
    ENDING_PROCESS: 'Ending schedule process',
  },
};
