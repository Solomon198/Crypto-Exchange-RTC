import { Schema, model } from 'mongoose';
import { History as HistoryProps } from '../Types/interfaces';

const History = new Schema({
  _id: { type: Schema.Types.ObjectId },
  rate: { type: Schema.Types.Number },
  date: { type: Schema.Types.Date, default: new Date() },
  currencyFrom: { type: Schema.Types.String, required: true },
  currencyFromShortName: {
    type: Schema.Types.String,
    required: true,
  },
  amountFrom: { type: Schema.Types.Number, required: true },
  currencyTo: { type: Schema.Types.String, required: true },
  amountTo: { type: Schema.Types.String, required: true },
  type: {
    type: Schema.Types.String,
    required: true,
    enum: ['Live Price', 'Exchanged'],
  },
});

export default model<HistoryProps>('history', History);
