# dramatis-ssr [![CircleCI](https://circleci.com/gh/andygout/dramatis-spa/tree/main.svg?style=svg)](https://circleci.com/gh/andygout/dramatis-ssr/tree/main)

Server-side rendered (SSR) application that provides listings for theatrical productions, materials, and associated data.

## Setup

- Clone this repo
- Set Node.js to version specified in `.nvmrc`, which can be achieved by running `$ nvm use` (if using [Volta](https://docs.volta.sh/guide/getting-started) then it will be set automatically)
- Install Node.js modules: `$ npm clean-install`
- Compile code: `$ npm run build`

## To run locally

- Ensure an instance of [`dramatis-api`](https://github.com/andygout/dramatis-api) is running on `http://localhost:3000`
- Run server using `$ npm start` and visit homepage at `http://localhost:3003`

## To run linting checks

- `$ npm run lint-check`

## To run unit tests

- `$ npm run unit-test`

## Architecture

```mermaid
---
config:
  theme: base
  themeVariables:
    actorBkg: "#E6E6E6"
    actorBorder: "#808080"
    actorTextColor: "#000000"
---
sequenceDiagram
  %% Components and grouping boxes
  actor CLIENT as Client

  box rgb(237, 223, 211) SSR
    participant DRAMATIS_SSR as dramatis-ssr
  end

  box rgb(218, 231, 242) API
    participant DRAMATIS_API as dramatis-api
  end

  box rgb(223, 240, 216) Database
    participant NEO4J_DATABASE as Neo4j database
  end

  %% Relationships
  CLIENT ->> DRAMATIS_SSR: GET request

  DRAMATIS_SSR ->> DRAMATIS_API: GET request

  DRAMATIS_API ->> NEO4J_DATABASE: Read data

  NEO4J_DATABASE -->> DRAMATIS_API: Return data

  DRAMATIS_API -->> DRAMATIS_SSR: Return data

  DRAMATIS_SSR -->> CLIENT: Return data
```
