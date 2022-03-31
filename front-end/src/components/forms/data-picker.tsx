import * as React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

interface DatePickerProps {
  value: any;
  onChange: (date: Date | null) => void;
  disabled: boolean | undefined;
  label: string;
}

/**
 * @description Date picker component
 * @param props
 */
export function CustomeDatePicker(props: DatePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        {...props}
        InputProps={{ style: { fontSize: 10 } }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
