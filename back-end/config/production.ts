require('dotenv/config');

const {
  DB_NAME,
  DB_PASSWORD,
  DB_USER,
  PORT,
  CLUSTER,
  FETCH_EXCHANGE_RATE_INTERVAL,
} = process.env;

export default {
  PORT: PORT || 8081,
  DB_CONNECTION_STRING: `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${CLUSTER}.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
  FETCH_EXCHANGE_RATE_INTERVAL,
};
