# theatrebase-gui [![CircleCI](https://circleci.com/gh/andygout/theatrebase-gui/tree/master.svg?style=svg)](https://circleci.com/gh/andygout/theatrebase-gui/tree/master)

Front end rendering of site that provides listings for theatrical productions, playtexts and associated data.

## Setup
- Clone this repo.
- Install node modules: `$ npm install`.
- Add favicon: `$ touch ./src/client/favicons/favicon.ico`.

## To run locally
- Build client-side JavaScript and CSS: `$ npm run build`; build and update on change: `$ npm run watch`.
- Ensure an instance of [`theatrebase-api`](https://github.com/andygout/theatrebase-api) is running on `http://localhost:3000`.
- Run server using `$ npm start` and visit homepage at `http://localhost:3001`.

## To run linting checks
- `$ npm run lint-check`.

## To run unit tests
- `$ npm run unit-test`.
