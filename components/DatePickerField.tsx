import React, {FC} from "react";
import DatePicker from "react-datepicker";

const DatePickerField: FC<any> = ({ field, form }) => {
  return (
    <DatePicker
      selected={(field.value && new Date(field.value)) || null}
      onChange={val => {
        form.setValues({[field.name]: val});
      }}
    />
  );
};

export default DatePickerField;

