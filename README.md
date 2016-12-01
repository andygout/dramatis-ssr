[![Circle CI](https://circleci.com/gh/andygout/theatrebase_nodejs/tree/master.svg?style=svg)](https://circleci.com/gh/andygout/theatrebase_nodejs)


TheatreBase
=================


Brief:
-------

A database-driven site that provides listings for theatrical productions, playtexts and associated data.


Site setup
-------

- Install [Nodemon](http://nodemon.io): `$ npm install -g nodemon`.
- Add favicon: `$ touch ./client/favicons/favicon.ico`
- Create PostgreSQL database called `theatrebase_nodejs`: `$ psql` -> `$ CREATE DATABASE theatrebase_nodejs`.
- Run script `$ node database/schema.js` to implement database schema.
- Run PostgreSQL server on port 5432 (using [Postgres.app](http://postgresapp.com)).
- Run server using: `$ npm start` and visit homepage: `localhost:3000`.


Testing
-------

- Install [mocha](https://www.npmjs.com/package/mocha) globally: `$ npm install -g mocha`
- `$ npm test`
