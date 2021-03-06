## Exchange Currency Service

Exchange Currency Service for getting updated USD to crypto exchange and streaming to front-end using websocket.



## **Installing Dependencies**

```bash
  yarn install
  ## or
  npm install
```

## **Runing API on development mode**

To run Back-end in developement run:

```bash
 yarn start:dev
```

Runs the appliation on developement mode on port `http://localhost:8081`. Add the following to your `.env` file `FETCH_EXCHANGE_RATE_INTERVAL = 10`.
 **NOTE** The app is configured to connect to a live mongodb atlas, you can easily set app up by creating mongodb atlas acount, create a cluster and database and then pass the following information to your `.env` file
```bash
DB_PASSWORD     = data-base-password
CLUSTER         =  your cluster name
DB_USER         =  database user
DB_NAME         =  database name
```


 To use a local mongodb database instance edit the `production`, `developement` and `test` configuration in the `config/` directory and pass database connection string to the `DB_CONNECTION_STRING` property.

## **Runing API on production mode**

To application on production, you need to build typescript files to their corresponding javascript files.

```bash
  yarn build
```

Finally run:

```bash
   yarn start
```

if deployed on `heroku` or counterpart, it binds application to the port provided to the application, but if run locally, the default port is 8081. You can access API at `http://localhost:8081`

## **Scripts**

```bash
## starts the local server in dev mode
yarn start:dev

## compile tyscript files to javascript
yarn compile:tsc

## starts typescript in watch mode
yarn compile:tsc:watch

## generate html documentation for api
yarn doc

## runs API unit tests
yarn test

## builds API for production
yarn build

## starts the app in production mode.
yarn start

## Run eslint
yarn lint

## Run eslint fix
yarn lint:fix

## Runs prettier
yarn prettier-format

## starts prettier in watch mode
yarn prettier-watch

```

### **TODOS**

- [x] Write Schema for historical data and Rates
- [x] Write Mock Server (COIN LAYER) and Configure application for live interaction with COIN LAYER
- [x] Set up cron-job
- [x] Implement Websocket (SOCKET.IO) logic and interaction with client.
- [x] Add filtering of records by date range
- [x] Update Documentation and comments
