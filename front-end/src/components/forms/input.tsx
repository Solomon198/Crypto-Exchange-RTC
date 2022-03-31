import { InputLabel } from "./styled.components";
import { FormikErrors, FormikTouched } from "formik";
import FormControl from "@mui/material/FormControl";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

interface CustomProps {
  form: {
    errors: FormikErrors<{ [field: string]: any }>;
    touched: FormikTouched<{ [field: string]: any }>;
  };
  field: {
    name: string;
    onChange: (e: any) => void;
    onBlur: (e: any) => void;
    value: any;
  };
  label: string;
}

/**
 * @description A customized ready input field for validation with FORMIK
 * @param props
 */
export function Input(props: CustomProps) {
  const { form, field, label, ...Props } = props;
  return (
    <FormControl className="mt-2" size="small" fullWidth>
      <InputLabel>{label}</InputLabel>
      <TextField
        fullWidth
        size="small"
        style={{
          borderWidth: 1,
          borderColor: "lightgray",
          borderStyle: "solid",
          borderRadius: 5,
          padding: 5,
          marginTop: 3,
        }}
        InputProps={{ disableUnderline: true }}
        id={`${field.name}-field`}
        {...field}
        variant="standard"
        {...Props}
      />
    </FormControl>
  );
}

export default Input;
