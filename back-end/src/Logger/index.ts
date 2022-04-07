import winston, { format } from 'winston';

// SETTING UP LOGGER FOR LOGGING ERRORS IN PRODUCTION

const { combine, printf } = format;
const logFormat = printf(
  ({ level, message, label, timestamp }) =>
    `${timestamp} [${label}] ${level}: ${message}`,
);

const Logger = winston.createLogger({
  level: 'error',
  format: combine(
    winston.format.label({ label: 'Fatal Error' }),
    winston.format.timestamp(),
    logFormat,
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/combine.log' }),
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),
    new winston.transports.File({
      filename: 'logs/info.log',
      level: 'info',
    }),
  ],
});

export const TestLogger = winston.createLogger({
  level: 'error',
  format: combine(
    winston.format.label({ label: 'Non Fatal Exception' }),
    winston.format.timestamp(),
    logFormat,
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: 'logs/test.log',
      level: 'error',
    }),
  ],
});

export const InfoLogger = winston.createLogger({
  level: 'info',
  format: combine(
    winston.format.label({ label: 'Non Fatal Exception' }),
    winston.format.timestamp(),
    logFormat,
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: 'logs/info.log',
      level: 'info',
    }),
  ],
});

export const HttpLogger = winston.createLogger({
  level: 'http',
  format: combine(
    winston.format.label({ label: 'Non Fatal Exception' }),
    winston.format.timestamp(),
    logFormat,
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: 'logs/http.log',
      level: 'http',
    }),
  ],
});

export default Logger;
