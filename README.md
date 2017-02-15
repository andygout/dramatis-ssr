[![Circle CI](https://circleci.com/gh/andygout/theatrebase/tree/master.svg?style=svg)](https://circleci.com/gh/andygout/theatrebase)


TheatreBase
=================


Brief:
-------

A graph database-driven site that provides listings for theatrical productions, playtexts and associated data.


Site setup
-------

- Install [Nodemon](http://nodemon.io): `$ npm install -g nodemon`.
- Add favicon: `$ touch ./client/favicons/favicon.ico`.
- Copy development environment variables from `.env-dev` into `.env` by running command: `$ node transfer-env-dev`.
- Create Neo4j database called `theatrebase` and run on port 7474 (using [Neo4j Community Edition](https://neo4j.com/download/community-edition)).
- Run server using: `$ npm start` and visit homepage: `localhost:3000`.


Testing
-------

- Install [mocha](https://www.npmjs.com/package/mocha) globally: `$ npm install -g mocha`.
- `$ npm test`.
