# p0

[![Circle CI](https://circleci.com/gh/connorwarnock/p0/tree/master.svg?style=svg)](https://circleci.com/gh/connorwarnock/p0/tree/master)

[![Code Climate](https://codeclimate.com/github/connorwarnock/p0/badges/gpa.svg)](https://codeclimate.com/github/connorwarnock/p0)

This is a simple Socket.io based event server that stores and streams data from Particle.io sse's.

## Getting setup
To run the app locally

0. Install the dependencies

        npm install

0. Create your own database.json and add in your local database settings

        cp knexfile.example.js knexfile.js

0. Run the database migrations

        knex migrate:lastest

0. Boot the server

        npm start

## Adding your plants to the system
There is currently no interface for adding plants to the database, so to do so you'll
need to add them via some sql or the `bootstrap.json`.  To add plants via the `bootstrap.json`,
run:

        cp tasks/bootstrap.example.json tasks/bootstrap.json

And then run the boostrap script

        NODE_ENV=production node tasks/bootstrap.js

This will insert the plants into the database.

## Sample clientside js
Check out `public/client.js` for an example of how to set up a js client for the socket.io api. To see the code
in action, fire up the server with:

        CLIENT_DEMO=true npm start

and visit [localhost:3000](localhost:3000).

## Running the tests
To run the specs, first run the test database migrations:

        knex migrate:latest --env=test

And then run:

        npm test

## Run migrations

## API docs
There are two apis:
- _ http api_

  Provides basic information about the plants on the system.

- _socket api_

  Provides streaming data on each plants vitals (humidity, temperature, etc)

### HTTP API

#### List all plants in the system

#### Request

`GET /plants`
##### Parameters
**limit**

*integer*, The number of plants to return, 3 by default

**offset**

*integer*, The index of of the plant to return as the first in the list

#### Response
`status: 200 OK`
```
{
  uuid: '8080UINNDSOUNSDUI879886NUISDNIUYSDNBISUDNSU',
  email: 'johnsmith@example.com',
  access_token: {
    uuid: '20808UOFDUINIBNSFIDYNFIDBDFIDFBIYDU',
    token: 'SDFOIM98DSIUN329FDSN977893DSA89DASAS797AS7882',
    expires_at: 2013-05-23 00:12:02.000000000 Z
  }
}
```

### Socket API

#### Stream plant vitals

namespace: `/plants:$plant_id`

(`$plant_id` is a variable)

event: `moisture`
data:
```
{
  "moisture":50
}
```
