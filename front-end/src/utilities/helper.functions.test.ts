import { convertNumberToIntl } from "./helper.functions";

describe("Should convert a number or digit to it monetary equivalent by passing currency type", () => {
  test("convert number to monetary equivalent", () => {
    const getFormatedNumber = convertNumberToIntl("USD", 8000);
    expect(getFormatedNumber).toEqual("$8,000.00");
  });
});
