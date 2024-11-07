import * as dotenv from 'dotenv';
dotenv.config();

// Db Data
export const MONGO_URI = process.env.MONGO_HOST + '/' + process.env.MONGO_DB;
export const MONGO_DB = process.env.MONGO_DB;

// Schema names
export const STATE_SCHEMA_NAME = 'state';
export const CITY_SCHEMA_NAME = 'city';
export const DOCUMENT_TYPE_SCHEMA_NAME = 'document-type';
