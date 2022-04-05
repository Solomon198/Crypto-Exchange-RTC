import { Schema, model } from 'mongoose';
import { Rates as RateProps } from '../Types/interfaces';

const Rates = new Schema({
  target: { type: Schema.Types.String },
  rates: {
    BTC: { type: Schema.Types.Number },
    XRP: { type: Schema.Types.Number },
    ETH: { type: Schema.Types.Number },
  },
});

export default model<RateProps>('rates', Rates);
