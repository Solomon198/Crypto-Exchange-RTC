import config from 'config';
import { connect, connection } from 'mongoose';

connect(config.get('DB_CONNECTION_STRING'), {
  useNewUrlParser: true,
  useCreateIndex: true,
  autoReconnect: true,
  keepAlive: true,
  useUnifiedTopology: false,
  keepAliveInitialDelay: 450000,
})
  .then(() => {
    console.log('Database connected');
  })
  .catch((e) => {
    console.log(e);
    console.log('Database not connected');
  });

const db = connection;

export default db;
