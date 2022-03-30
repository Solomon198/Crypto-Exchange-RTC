import * as bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';
// @ts-ignore
import helmet from 'helmet';
import cors from 'cors';
import ErrorHandler from './Middlewares/error.handler';
import Logger, { HttpLogger } from './Logger/index';

require('dotenv/config');
require('./utills/connection');

// Application-Level Middleware
const app = express();

process.on('uncaughtException', (err) => {
  Logger.error(err.message);
});

app.use(helmet());
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  morgan('combined', {
    skip: (
      req, // eslint-disable-line
      res,
    ) => res.statusCode < 400,
    stream: {
      write: (msg: string) => {
        if (app.get('env') === 'production') {
          HttpLogger.http(msg);
        }
      },
    },
  }),
);
// api doc directory
app.use('/', express.static('api-doc'));

// Handles error
app.use(ErrorHandler);

export default app;
