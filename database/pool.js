const pg = require('pg');

const config = {
	database: process.env.DEV_DATABASE_NAME
}

const pool = new pg.Pool(config);

module.exports = pool;
