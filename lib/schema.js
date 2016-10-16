const pg = require('pg');

const connectionString = process.env.PGDATABASE_URL || 'postgres://localhost:5432/theatrebase_nodejs';

const client = new pg.Client(connectionString);

client.connect();

const query = client.query('CREATE TABLE productions(id SERIAL PRIMARY KEY, title VARCHAR(255) NOT NULL)');

query.on('end', function () { client.end(); });
