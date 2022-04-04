export interface History {
  date: string;
  currencyFrom: string;
  currencyFromShortName: string;
  amountFrom: number;
  currencyTo: string;
  amountTo: string;
  type: string;
}

export interface Currency {
  value: string;
  icon: string;
}
