# theatrebase-ssr [![CircleCI](https://circleci.com/gh/andygout/theatrebase-ssr/tree/master.svg?style=svg)](https://circleci.com/gh/andygout/theatrebase-ssr/tree/master)

Server-side rendered (SSR) application that provides listings for theatrical productions, materials, and associated data.

## Setup
- Clone this repo.
- Set Node to version specified in `.nvmrc`, which can be achieved by running `$ nvm use`.
- Install node modules: `$ npm install`.
- Compile code: `$ npm run build`.

## To run locally
- Ensure an instance of [`theatrebase-api`](https://github.com/andygout/theatrebase-api) is running on `http://localhost:3000`.
- Run server using `$ npm start` and visit homepage at `http://localhost:3003`.

## To run linting checks
- `$ npm run lint-check`.

## To run unit tests
- `$ npm run unit-test`.
