import { Pool } from 'pg';
import { DbType } from './dbTypes'
require('dotenv').config();

export const pool: Pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB,
  password: process.env.DB_PASSWORD,
  port: 5432
  // port: parseInt(process.env.DB_PORT as string),
} as DbType)
