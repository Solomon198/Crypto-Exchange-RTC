import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { DatePicker, Select } from "../../../components/index";
import Button from "@mui/material/Button";
import { useState } from "react";
import { Filter } from "../../../types/entities";

interface Props {
  onFilter: (payload: Filter) => void;
}

// Schema validation
const validationSchema = Yup.object().shape({
  from: Yup.date().required(),
  to: Yup.date().required(),
  type: Yup.string().required(),
});

/**
 * @description ToolBar Widget for saving exchange rate in real time
 */
export function DateFilter(props: Props) {
  const [initialState, setInitialState] = useState({
    from: null,
    to: null,
    type: "",
  });

  const { onFilter } = props;

  return (
    <Formik
      initialValues={initialState}
      validateOnMount={true}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={(values) => {
        // same shape as initial values
        onFilter(values as any);
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
              <Field
                options={[
                  { value: "All" },
                  { value: "Live Price" },
                  { value: "Exchanged" },
                ]}
                component={Select}
                value={values.type}
                label="Type"
                name="type"
              />
            </div>

            <div className="m-1">
              <div style={{ color: "#fff", marginBottom: 5 }}>.</div>
              <Button
                disableElevation
                color="primary"
                variant="outlined"
                disabled={isValid ? false : true}
                onClick={submitForm}
                style={{
                  textTransform: "capitalize",
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
