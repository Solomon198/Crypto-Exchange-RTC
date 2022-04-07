import { FormikErrors, FormikTouched } from "formik";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { InputLabel } from "../general.styles/containers";
import { SelectIMG, OptionContainer } from "./styled.components";

interface SelectOptions {
  icon?: string;
  value: any;
}

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
  options: SelectOptions[];
  label: string;
  onChange?: (value: any) => void;
}

/**
 * @description A customized ready Select component for input validation  with FORMIK
 * @params  props
 * */
export function CustomSelect(props: CustomProps) {
  const { form, field, options, label, onChange, ...Props } = props;
  const handleOnchage = () => {
    if (onChange) {
      return { onChange: onChange };
    }
    return {};
  };
  return (
    <FormControl className="mt-2" size="small" fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        labelId={`${field.name}-label`}
        id={`${field.name}`}
        {...Props}
        disableUnderline
        style={{
          borderWidth: 1,
          borderColor: "lightgray",
          borderStyle: "solid",
          borderRadius: 5,
          padding: 5,
          marginTop: 3,
        }}
        variant="standard"
        {...field}
        {...handleOnchage()}
      >
        {options.map((value) => (
          <MenuItem role="" key={value.value} value={value.value}>
            <OptionContainer role="option">
              {value.icon && <SelectIMG alt="" src={value.icon} />}
              {value.value}
            </OptionContainer>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
