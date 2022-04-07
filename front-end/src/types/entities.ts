export interface History {
  _id?: string;
  date?: string;
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

export interface Rates {
  target: string;
  rates: {
    BTC: number;
    XRP: number;
    ETH: number;
  };
}

export interface Filter {
  from: Date;
  to: Date;
  type: "All" | "Live Price" | "Exchanged";
}
