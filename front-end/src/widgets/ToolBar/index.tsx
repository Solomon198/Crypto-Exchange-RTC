import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Currencies from "../../__mock__/currencies.json";
import Coins from "../../__mock__/coins.json";
import { Input, Select, Typography } from "../../components/index";
import FiatImages from "../../assets/index";
import Button from "@mui/material/Button";
import { convertNumberToIntl } from "../../utilities/helper.functions";
import { useState } from "react";
import { Rates } from "../../types/entities";

// Schema validation
const validationSchema = Yup.object().shape({
  currencyFromShortName: Yup.string().required(),
  currencyTo: Yup.string().required(),
  amountFrom: Yup.number().required(),
  amountTo: Yup.string().required(),
  rate: Yup.number().required(),
});

/**
 * @description ToolBar Widget for saving exchange rate in real time
 */

interface Props {
  rates: Rates[];
  onExchange: (exchangeParams: {
    currencyFromShortName: string;
    currencyFrom: string;
    currencyTo: string;
    amountFrom: number;
    amountTo: string;
    rate: number;
    type: "Exchanged" | "Live Price";
  }) => void;
}
export function ToolBarWidget(props: Props) {
  const { rates, onExchange } = props;
  const [initialState, setInitialState] = useState({
    currencyFromShortName: "",
    currencyTo: "",
    amountFrom: 0,
    amountTo: "",
    rate: 0,
  });

  /**
   * @description Calculates the exchange rate from any crypto to fiat currency as soon as any of the input changes and are valid.
   * @param currencyFrom curency to convert from normally crypto e.g BTC, ETH etc.
   * @param currencyTo currency to co convert to normally fiat currency e.g USD, EUR etc
   * @param amountFrom amount of crypto to be converted to fiat.
   */
  const handleCalculateExchange = (
    currencyFromShortName: string,
    currencyTo: string,
    amountFrom: number
  ) => {
    if (currencyFromShortName && amountFrom && currencyTo) {
      const getRate = rates.find((rate) => rate.target === currencyTo) as Rates;
      // @ts-ignore
      const rate = getRate.rates[currencyFromShortName];
      let exchange = convertNumberToIntl(currencyTo, amountFrom * rate);
      setInitialState({
        ...initialState,
        currencyFromShortName,
        currencyTo,
        amountFrom,
        amountTo: exchange,
        rate,
      });
    }
  };

  return (
    <>
      <Typography.H5 style={{ marginBottom: 20 }}>Exchange</Typography.H5>
      <Formik
        initialValues={initialState}
        validateOnMount={true}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={(values) => {
          // @ts-ignore
          const currencyFromFullName = Coins[values.currencyFromShortName].name;
          // same shape as initial values
          onExchange({
            ...values,
            type: "Exchanged",
            currencyFrom: currencyFromFullName,
          });

          setInitialState({
            currencyFromShortName: "",
            currencyTo: "",
            amountFrom: 0,
            amountTo: "",
            rate: 0,
          });
        }}
      >
        {({ submitForm, isValid, values, setFieldValue }) => (
          <Form>
            <div className="row">
              <div className="col-md-2 col-sm-12">
                <Field
                  options={Object.keys(Coins).map((key) => {
                    // @ts-ignore
                    const { icon_url, symbol } = Coins[key];
                    return { icon: icon_url, value: symbol };
                  })}
                  component={Select}
                  label="Currency from"
                  name="currencyFromShortName"
                  onChange={(e: any) => {
                    setFieldValue("currencyFromShortName", e.target.value);
                    handleCalculateExchange(
                      e.target.value,
                      values.currencyTo,
                      values.amountFrom
                    );
                  }}
                />
              </div>
              <div className="col-md-2 col-sm-12">
                <Field
                  type="number"
                  label="Amount"
                  component={Input}
                  name="amountFrom"
                  onChange={(e: any) => {
                    setFieldValue("amountFrom", e.target.value);
                    handleCalculateExchange(
                      values.currencyFromShortName,
                      values.currencyTo,
                      e.target.value
                    );
                  }}
                />
              </div>
              <div className="col-md-2 col-sm-12">
                <Field
                  component={Select}
                  name="currencyTo"
                  label="Currency to"
                  onChange={(e: any) => {
                    setFieldValue("currencyTo", e.target.value);
                    handleCalculateExchange(
                      values.currencyFromShortName,
                      e.target.value,
                      values.amountFrom
                    );
                  }}
                  options={Currencies.fiatCurrencies.map((fiat) => {
                    // @ts-ignore
                    fiat.icon = FiatImages[fiat.value];
                    return fiat;
                  })}
                />
              </div>
              <div className="col-md-2 col-sm-12">
                <Field
                  label="Amount"
                  name="amountTo"
                  disabled
                  component={Input}
                />
              </div>
              <div className="col-md-1 mt-2 col-sm-12">
                <div style={{ color: "#fff" }}>.</div>
                <Button
                  disableElevation
                  onClick={submitForm}
                  style={{
                    backgroundColor: "#00cc00",
                    textTransform: "capitalize",
                    fontWeight: "bold",
                    opacity: isValid ? 1 : 0.2,
                  }}
                  fullWidth
                  variant="contained"
                >
                  save
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
