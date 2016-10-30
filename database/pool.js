import pg from 'pg';

const config = {
	database: process.env.PG_DATABASE || 'theatrebase_nodejs'
}

const pool = new pg.Pool(config);

export { pool }
