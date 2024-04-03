# dramatis-ssr [![CircleCI](https://circleci.com/gh/andygout/dramatis-spa/tree/main.svg?style=svg)](https://circleci.com/gh/andygout/dramatis-ssr/tree/main)

Server-side rendered (SSR) application that provides listings for theatrical productions, materials, and associated data.

## Setup
- Clone this repo
- Set Node.js to version specified in `.nvmrc`, which can be achieved by running `$ nvm use` (if using [Volta](https://docs.volta.sh/guide/getting-started) then it will be set automatically)
- Install Node.js modules: `$ npm install`
- Compile code: `$ npm run build`

## To run locally
- Ensure an instance of [`dramatis-api`](https://github.com/andygout/dramatis-api) is running on `http://localhost:3000`
- Run server using `$ npm start` and visit homepage at `http://localhost:3003`

## To run linting checks
- `$ npm run lint-check`

## To run unit tests
- `$ npm run unit-test`
