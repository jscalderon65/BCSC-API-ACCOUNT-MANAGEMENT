import * as dotenv from 'dotenv';
dotenv.config();

export const TIME_ZONE = process.env.TIME_ZONE;
export const PORT = process.env.PORT;
export const GLOBAL_PREFIX = 'account_management';
export const ABOUT_PROJECT = {
  API_TITLE: 'BCSC-API-ACCOUNT-MANAGEMENT',
  API_DESCRIPTION:
    'API REST para gestionar el protal transaccional de las nuevas cuentas de ahorro de BCSC',
  SWAGGER_VERSION: '1.0',
  SWAGGER_ROUTE: 'docs',
};
