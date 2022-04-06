import axios from 'axios';
import { CoinLayerResponsePayload } from '../Types/interfaces';
import Coins from '../__mock__/coins.json';
import MockAxios from '../__mock__/setup.mock';

/**
 * @description Formats number or amounts into currency readable format in any currency e.g EUR, USD
 * @param currency The currency to format number to e.g EUR, USD
 * @param amount Amount to be converted to readable format normally a number e.g 4000
 */
export function convertNumberToIntl(
  currency: string,
  amount: number,
) {
  const formatter = new Intl.NumberFormat('en-Us', {
    style: 'currency',
    currency,
  });

  Intl.NumberFormat();

  return formatter.format(amount);
}

/**
 *
 * @returns
 */
export function PrepareHistoryBulkInsertData(
  responses: CoinLayerResponsePayload[],
) {
  // prepare rates for bulk insert into history collection
  const bulkQueries: any[] = [];
  responses.forEach((data) => {
    const Rates = data.rates;
    const prepareQueries = Object.keys(Coins).map((coin) => ({
      insertOne: {
        document: {
          currencyFromShortName: coin,
          // @ts-ignore
          currencyFrom: Coins[coin].name,
          amountFrom: 1,
          currencyTo: data.target,
          amountTo: convertNumberToIntl(
            data.target,
            // @ts-ignore
            1 * Rates[coin],
          ),
          type: 'Live Price',
          date: new Date(),
        },
      },
    }));
    bulkQueries.push(...prepareQueries);
  });
  return bulkQueries;
}

/**
 * @description format data to be inserted into database and determinse if is an update or insert
 * @returns
 */
export function PrepareRateBulkInsertDataOrUpdate(
  responses: CoinLayerResponsePayload[],
  queryType: 'insertOne' | 'updateOne',
) {
  // prepare rates for bulk insert into history collection
  const bulkQueries: any[] = [];
  responses.forEach((data) => {
    const query =
      queryType === 'insertOne'
        ? {
            [queryType]: {
              document: {
                target: data.target,
                rates: data.rates,
              },
            },
          }
        : {
            [queryType]: {
              filter: { target: data.target },
              update: { rates: data.rates },
            },
          };
    bulkQueries.push(query);
  });
  return bulkQueries;
}

/**
 * @description returns crypto exchange rate from coinLayerAPI base on target USD,EUR, or GBP and symbols
 * @returns
 */
export async function getRates() {
  // fetch rates
  const getRateHelper = (target: string) =>
    axios.get('/live', {
      params: { target, symbols: 'BTC,XRP,ETH' },
    });

  const $getRates = await Promise.all([
    getRateHelper('USD'),
    getRateHelper('GBP'),
    getRateHelper('EUR'),
  ]);

  const responses = $getRates.map(
    (res) => res.data as CoinLayerResponsePayload,
  );

  return responses;
}

// sets up request to get data from live coinlayer
function SetUpCoinLayer(accessToken: string) {
  axios.defaults.baseURL = 'http://api.coinlayer.com';
  axios.interceptors.request.use((config) => {
    // eslint-disable-next-line no-param-reassign
    config.params.access_token = accessToken;
    return config;
  });
}

// SetUp Application for Mock or Real Server request
export function IntializeApplication(accessToken = '') {
  if (accessToken) {
    SetUpCoinLayer(accessToken);
  } else {
    MockAxios(axios);
  }
}
