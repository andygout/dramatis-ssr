[![Circle CI](https://circleci.com/gh/andygout/theatrebase_nodejs/tree/master.svg?style=svg)](https://circleci.com/gh/andygout/theatrebase_nodejs)


TheatreBase
=================


Brief:
-------

A database-driven site that provides listings for theatrical productions, playtexts and associated data.


Site setup
-------

- Install [Nodemon](http://nodemon.io): `$ npm install -g nodemon`.
- Add favicon: `$ touch ./client/favicons/favicon.ico`.
- Copy development environment variables from `.dev-env` into `.env` by running command: `$ node transfer-dev-env`.
- Create PostgreSQL database called `theatrebase_nodejs`: `$ psql` -> `$ CREATE DATABASE theatrebase_nodejs`.
- Install [`db-migrate`](https://www.npmjs.com/package/db-migrate) globally (`npm install -g db-migrate`) then run command `$ db-migrate up` to run migration files.
- Run PostgreSQL server on port 5432 (using [Postgres.app](http://postgresapp.com)).
- Run server using: `$ npm start` and visit homepage: `localhost:3000`.


Testing
-------

- Install [mocha](https://www.npmjs.com/package/mocha) globally: `$ npm install -g mocha`.
- `$ npm test`.


Database
-------
- [db-migrate: The commands](https://db-migrate.readthedocs.io/en/latest/Getting%20Started/the%20commands) (or `$ db-migrate --help`).
