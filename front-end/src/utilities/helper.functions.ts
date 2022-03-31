/**
 * @description Formats number or amounts into currency readable format in any currency e.g EUR, USD
 * @param currency The currency to format number to e.g EUR, USD
 * @param amount Amount to be converted to readable format normally a number e.g 4000
 */
export function convertNumberToIntl(currency: string, amount: number) {
  const formatter = new Intl.NumberFormat("en-Us", {
    style: "currency",
    currency: currency,
  });

  Intl.NumberFormat();

  return formatter.format(amount);
}
