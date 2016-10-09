import pg from 'pg';

const config = {
	database: process.env.PGDATABASE || 'theatrebase_nodejs'
}

const pool = new pg.Pool(config);

export { pool }
