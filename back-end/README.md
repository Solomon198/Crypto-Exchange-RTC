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

Runs the appliation on developement mode on port `http://localhost:8000`. The app is configured to connect to a live mongodb atlas, no need to run local monogodb.

## **Runing API on prodcution mode**

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
- [ ] Add filtering of records by date range
- [ ] Add Test
- [ ] Update Documentation
