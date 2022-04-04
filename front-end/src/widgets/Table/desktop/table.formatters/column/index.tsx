/**
 * @description formats table column base on type of exchange
 * @param cell value of item displayed in a table column cell, this is passed by bootstrap table next
 * @param row the entire object in a row
 */
export const ExchangeTypeColumnFormatter = (cell: any, row: any) => {
  const isExchanged = cell === "Exchanged" ? "text-primary" : "text-success";
  return <span className={`${isExchanged}`}>{cell}</span>;
};
