require('dotenv').config();
export const port = process.env.PORT || 8080;
export const linkLength = process.env.LINK_LEN || 6;
export const dbFile = process.env.DB_FILE || 'database/database.sqlite';
export const dbSchema = process.env.DB_SCHEMA || 'database/database.sql';
export const logLevel = process.env.LOG_LEVEL || 'info';
