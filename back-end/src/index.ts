import express from 'express';
import * as SocketIO from 'socket.io';
// @ts-ignore
import { createServer } from 'http';
import Logger from './Logger/index';
import { IntializeApplication } from './utills/helpers';
import RunCronJob from './handlers/schedular';
import HistoryHandler from './handlers/history.handler';
import RateHandler from './handlers/rates.handler';

require('dotenv/config');
require('./utills/connection');

const app = express();
const HttpServer = createServer(app);
const IO = new SocketIO.Server(HttpServer, {
  // Allow CORS from any origin
  cors: {
    origin: '*',
  },
});

const onConnection = (socket: SocketIO.Socket) => {
  // client requests handlers;
  HistoryHandler(socket, IO);
  RateHandler(socket);
};

IO.on('connection', onConnection);

// By default setup application to use MOCK API. To get live data from coinLayer pass in accessToken and the MOCK SERVER Will be disabled and the live connection to coin layer will be used for all rates requests
IntializeApplication();

// Starts runing the cron job to get rates and save exchange rates to database and stream to users every configured minutes
RunCronJob(IO);

// catches uncaught process error
process.on('uncaughtException', (err) => {
  Logger.error(err.message);
});

export default HttpServer;
