import express from 'express';
import * as SocketIO from 'socket.io';
// @ts-ignore
import { createServer } from 'http';
import Logger from './Logger/index';
import { IntializeApplication } from './utills/helpers';
import RunCronJob from './handlers/schedular';

require('dotenv/config');
require('./utills/connection');

const app = express();
const HttpServer = createServer(app);
const IO = new SocketIO.Server(HttpServer);

const onConnection = (socket: SocketIO.Socket) => {
  console.log(socket);
};

IO.on('connection', onConnection);

// By default setup application to use MOCK API. To get live data from coinLayer pass in accessToken and the MOCK SERVER Will be disabled
IntializeApplication();

// Starts runing the cron job to save exchange rates to database and stream to users every configured minutes

console.log('runing cron job');
RunCronJob(IO);

// catches uncaught process error
process.on('uncaughtException', (err) => {
  Logger.error(err.message);
});

export default HttpServer;
