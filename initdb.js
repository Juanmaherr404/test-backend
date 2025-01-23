const betterSqlite3 = require('better-sqlite3');

const db = betterSqlite3('database.db');

const stmt = "CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, ip TEXT, userAgent TEXT, localizacion TEXT, fecha TEXT)";

db.prepare(stmt).run();

//db.close();

module.exports = db;

