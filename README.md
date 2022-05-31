# crud-express-mongodb

An app to be used as a template for other apps

## A quote generator app

This can be used to test node modules or applications which require external services

### Instructions

You need the following environment variables
- PORT = The port you want to expose the server on
- DB_NAME = The DB name to use on mongoDB
- DB_CONNECTION = The full connection string for getting into the DB

This can be set by the dotenv module `npm install -D dotenv` , create a `.env` file similar to the example and then run the node server via `npm run dev` (because we have the dev script in package.json)