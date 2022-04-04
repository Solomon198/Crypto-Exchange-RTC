import * as React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { InputLabel } from "../general.styles/containers";

interface DatePickerProps {
  value: any;
  onChange: (date: Date | null) => void;
  disabled?: boolean | undefined;
  label: string;
}

/**
 * @description Date picker component
 * @param props
 */
export function CustomeDatePicker(props: DatePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <InputLabel>{props.label}</InputLabel>
      <DatePicker
        {...props}
        label=""
        InputProps={{
          style: {
            fontSize: 10,
            borderWidth: 1,
            borderColor: "lightgray",
            borderStyle: "solid",
            borderRadius: 5,
            padding: 10,
            marginTop: 3,
            width: "100%",
          },
          disableUnderline: true,
        }}
        renderInput={(params) => (
          <TextField size="small" fullWidth variant="standard" {...params} />
        )}
      />
    </LocalizationProvider>
  );
}
