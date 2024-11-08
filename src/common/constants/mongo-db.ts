import * as dotenv from 'dotenv';
dotenv.config();

// Db Data
export const MONGO_URI = process.env.MONGO_HOST + '/' + process.env.MONGO_DB;
export const MONGO_DB = process.env.MONGO_DB;

// Schema names
export const STATE_SCHEMA_NAME = 'state';
export const CITY_SCHEMA_NAME = 'city';
export const DOCUMENT_TYPE_SCHEMA_NAME = 'document-type';
export const OCCUPATION_TYPE_SCHEMA_NAME = 'occupation-type';

export const PORTAL_PROFILE_SCHEMA_NAME = 'portal-profile';
export const FINANCIAL_PROFILE_SCHEMA_NAME = 'financial-profile';
export const KYC_DATA_SCHEMA_NAME = 'kyc-data';
export const FINANCIAL_DATA_SCHEMA_NAME = 'financial-data';
export const SAVINGS_ACCOUNT_SCHEMA_NAME = 'savings-account';
export const OUTGOING_TRANSACTION_SCHEMA_NAME = 'outgoing-transaction';
export const OUTGOING_TRANSACTION_STATUS_SCHEMA_NAME =
  'outgoing-transaction-status';
