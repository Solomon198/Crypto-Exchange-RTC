import Loggers, { TestLogger } from '../Logger';
import app from '../index';

export default async function ErrorHandler(err: any) {
  if (app.get('env') === 'production') {
    Loggers.error(err.message);
  }

  if (app.get('env') === 'test') {
    TestLogger.error(err.message);
  }
}
