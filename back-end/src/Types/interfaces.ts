import { Document } from 'mongoose';

export interface History extends Document {
  date: Date;
  currencyFrom: string;
  currencyFromShortName: string;
  amountFrom: number;
  currencyTo: string;
  amountTo: string;
  type: 'Live Price' | 'Exchanged';
  rate: number;
}

export interface Rates extends Document {
  target: string;
  rates: {
    BTC: string;
    XRP: string;
    ETH: string;
  };
}

export interface CoinLayerResponsePayload {
  success: boolean;
  terms: string;
  privacy: string;
  timestamp: number;
  target: string;
  rates: {
    BTC: number;
    ETH: number;
    XRP: number;
  };
}
