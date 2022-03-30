require('dotenv/config');

const { DB_NAME, DB_PASSWORD, DB_USER, CLUSTER } = process.env;

export default {
  PORT: 8081,
  DB_CONNECTION_STRING: `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${CLUSTER}.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
};
