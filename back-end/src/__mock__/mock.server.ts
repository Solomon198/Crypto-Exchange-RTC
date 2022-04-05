import MockAdapter from 'axios-mock-adapter';
import ExchangeRates from './exchange-rate.json';

// COIN LAYER MOCK API
export default function MockCoinLayerAPI(Adapter: MockAdapter) {
  // Get Live data for USD
  Adapter.onGet('/live', {
    params: { target: 'USD', symbols: 'BTC,XRP,ETH' },
  }).reply(() => {
    const rates = ExchangeRates['exchange-rates'].find(
      (currRate) => currRate.target === 'USD',
    );
    return [200, rates];
  });

  // Get Live data for GBP
  Adapter.onGet('/live', {
    params: { target: 'GBP', symbols: 'BTC,XRP,ETH' },
  }).reply(() => {
    const rates = ExchangeRates['exchange-rates'].find(
      (currRate) => currRate.target === 'GBP',
    );
    return [200, rates];
  });

  // Get Live data for EUR
  Adapter.onGet('/live', {
    params: { target: 'EUR', symbols: 'BTC,XRP,ETH' },
  }).reply(() => {
    const rates = ExchangeRates['exchange-rates'].find(
      (currRate) => currRate.target === 'EUR',
    );
    return [200, rates];
  });
}
