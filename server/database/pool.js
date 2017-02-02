import pg from 'pg';

const config = {
	database: process.env.DEV_DATABASE_NAME
};

const pool = new pg.Pool(config);

export default pool;
