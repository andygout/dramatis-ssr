const pg = require('pg');
const path = require('path');
const connectionString = require(path.join(__dirname, '../', '../', 'config'));

const client = new pg.Client(connectionString);
client.connect();
const query = client.query('CREATE TABLE productions(id SERIAL PRIMARY KEY, title VARCHAR(255) NOT NULL)');
query.on('end', function() { client.end(); });
