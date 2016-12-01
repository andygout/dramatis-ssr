const pg = require('pg');

const config = {
	database: process.env.PG_DATABASE || 'theatrebase_nodejs'
}

const pool = new pg.Pool(config);

module.exports = pool;
