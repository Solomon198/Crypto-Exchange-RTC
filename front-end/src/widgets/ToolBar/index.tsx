import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Currencies from "../../__mock__/currencies.json";
import { Input, Select, Typography } from "../../components/index";
import Button from "@mui/material/Button";
import { convertNumberToIntl } from "../../utilities/helper.functions";
import { useState } from "react";

// Schema validation
const validationSchema = Yup.object().shape({
  currencyFrom: Yup.string().required(),
  currencyTo: Yup.string().required(),
  amountFrom: Yup.number().required(),
  amountTo: Yup.string().required(),
  rate: Yup.number().required(),
});

/**
 * @description ToolBar Widget for saving exchange rate in real time
 */
export function ToolBarWidget() {
  const [initialState, setInitialState] = useState({
    currencyFrom: "",
    currencyTo: "",
    amountFrom: 0,
    amountTo: "",
    rate: 0,
  });

  const dummyRate = Currencies.dummyRate;

  /**
   * @description Calculates the exchange rate from any crypto to fiat currency as soon as any of the input changes and are valid.
   * @param currencyFrom curency to convert from normally crypto e.g BTC, ETH etc.
   * @param currencyTo currency to co convert to normally fiat currency e.g USD, EUR etc
   * @param amountFrom amount of crypto to be converted to fiat.
   */
  const handleCalculateExchange = (
    currencyFrom: string,
    currencyTo: string,
    amountFrom: number
  ) => {
    if (currencyFrom && amountFrom && currencyTo) {
      // @ts-ignore
      const rate = dummyRate[currencyFrom][currencyTo];
      let exchange = convertNumberToIntl(currencyTo, amountFrom * rate);
      setInitialState({
        ...initialState,
        currencyFrom,
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
          // same shape as initial values
          console.log(values);
        }}
      >
        {({ submitForm, isValid, values, setFieldValue }) => (
          <Form>
            <div className="row">
              <div className="col-md-2">
                <Field
                  options={Currencies.cryptoCurrencies}
                  component={Select}
                  label="Currency from"
                  name="currencyFrom"
                  onChange={(e: any) => {
                    setFieldValue("currencyFrom", e.target.value);
                    handleCalculateExchange(
                      e.target.value,
                      values.currencyTo,
                      values.amountFrom
                    );
                  }}
                />
              </div>
              <div className="col-md-2">
                <Field
                  type="number"
                  label="Amount"
                  component={Input}
                  name="amountFrom"
                  onChange={(e: any) => {
                    setFieldValue("amountFrom", e.target.value);
                    handleCalculateExchange(
                      values.currencyFrom,
                      values.currencyTo,
                      e.target.value
                    );
                  }}
                />
              </div>
              <div className="col-md-2">
                <Field
                  component={Select}
                  name="currencyTo"
                  label="Currency to"
                  onChange={(e: any) => {
                    setFieldValue("currencyTo", e.target.value);
                    handleCalculateExchange(
                      values.currencyFrom,
                      e.target.value,
                      values.amountFrom
                    );
                  }}
                  options={Currencies.fiatCurrencies}
                />
              </div>
              <div className="col-md-2">
                <Field
                  label="Amount"
                  name="amountTo"
                  disabled
                  component={Input}
                />
              </div>
              <div className="col-md-1 mt-2">
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
