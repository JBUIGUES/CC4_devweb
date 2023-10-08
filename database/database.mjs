import sqlite3 from 'sqlite3';
const db = new sqlite3.Database(process.env.DB_FILE);


const linksDB = {};

export { db, linksDB };
