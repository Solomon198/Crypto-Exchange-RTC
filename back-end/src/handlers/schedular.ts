import { CronJob } from 'cron';
import * as SocketIO from 'socket.io';
import config from 'config';
import Models from '../models/index';
import {
  getRates,
  PrepareHistoryBulkInsertData,
  PrepareRateBulkInsertDataOrUpdate,
} from '../utills/helpers';

// CronJob runs and gets rates, updates the history and rate collection
export default function StartRuningCronJob(IO: SocketIO.Server) {
  const FETCH_EXCHANGE_RATE_INTERVAL = config.get(
    'FETCH_EXCHANGE_RATE_INTERVAL',
  );
  const task = new CronJob({
    cronTime: `0 */${FETCH_EXCHANGE_RATE_INTERVAL} * * * *`,
    onTick: async () => {
      // gets rates from coinLayer for USD,EUR,GBP
      // console.log('working', '=================================');

      console.log(
        '-------------------- RUNING SCHEDULAR TO FETCH RATES AND UPDATE DATABASE AND USERS ----------------------- ',
      );
      console.log(new Date());
      const responses = await getRates();

      // Prepare new rates data to insert into history collection at this time
      const bulkQueries = PrepareHistoryBulkInsertData(responses);

      // check if rate is in DB
      const findRate = await Models.Rates.findOne({});
      const isUpdate = !!findRate;
      const $bulkQueries = PrepareRateBulkInsertDataOrUpdate(
        responses,
        isUpdate ? 'updateOne' : 'insertOne',
      );

      // Inserts recent history of coin exchange rate at this time
      await Models.History.bulkWrite(bulkQueries);
      await Models.Rates.bulkWrite($bulkQueries);

      // reading data inserted into data base
      const savedRates = await Models.Rates.find({});
      const History = await Models.History.find({})
        .sort({ _id: -1 })
        .limit(10);

      // Stream information to frontend, this is a public broadcast since every user needs to get latest history and rates;
      IO.emit('live:rate', savedRates);
      IO.emit('live:history', History);
    },
    runOnInit: true,
  });

  task.start();
}
