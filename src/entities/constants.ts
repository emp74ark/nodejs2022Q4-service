import * as dotenv from 'dotenv';
import * as process from 'process';

dotenv.config();

export const HOST = process.env.HOST || 'localhost';
export const PORT = Number(process.env.PORT) || 4000;
export const DATABASE_URL = process.env.DATABASE_URL || '';
export const CRYPT_SALT = Number(process.env.CRYPT_SALT) || 10;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'secret123123';
export const JWT_SECRET_REFRESH_KEY =
  process.env.JWT_SECRET_REFRESH_KEY || 'secret123123';
export const TOKEN_EXPIRE_TIME = process.env.TOKEN_EXPIRE_TIME || '1h';
export const TOKEN_REFRESH_EXPIRE_TIME =
  process.env.TOKEN_REFRESH_EXPIRE_TIME || '24h';

export const LOG_LEVEL = process.env.LOG_LEVEL || 'log,error,warn,debug';
