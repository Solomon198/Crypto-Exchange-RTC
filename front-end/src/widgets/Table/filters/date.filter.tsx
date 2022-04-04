import { Formik, Form } from "formik";
import * as Yup from "yup";
import { DatePicker } from "../../../components/index";
import Button from "@mui/material/Button";
import { useState } from "react";

// Schema validation
const validationSchema = Yup.object().shape({
  from: Yup.date().required(),
  to: Yup.date().required(),
});

/**
 * @description ToolBar Widget for saving exchange rate in real time
 */
export function DateFilter() {
  const [initialState, setInitialState] = useState({
    from: null,
    to: null,
  });

  return (
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
          <div className="d-flex mt-3">
            <div className=" m-1">
              <DatePicker
                label="From Date"
                value={values.from}
                onChange={(date: any) =>
                  setInitialState({ ...initialState, from: date })
                }
              />
            </div>
            <div className=" m-1">
              <DatePicker
                onChange={(date: any) =>
                  setInitialState({ ...initialState, to: date })
                }
                value={values.to}
                label="To Date"
              />
            </div>

            <div className="m-1">
              <div style={{ color: "#fff", marginBottom: 5 }}>.</div>
              <Button
                disableElevation
                color="primary"
                variant="outlined"
                onClick={submitForm}
                style={{
                  textTransform: "capitalize",
                  // opacity: isValid ? 1 : 0.2,
                }}
                fullWidth
              >
                Filter
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
