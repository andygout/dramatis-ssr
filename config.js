const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/theatrebase_nodejs';

module.exports = connectionString;
