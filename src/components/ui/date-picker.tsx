import {
  DatePicker as AntDatePicker,
  DatePickerProps as AntDatePickerProps,
} from "antd";
import React from "react";

interface DatePickerProps extends AntDatePickerProps {
  format?: string;
}

const DatePicker: React.FC<DatePickerProps> & {
  RangePicker: typeof AntDatePicker.RangePicker;
} = ({ format = "YYYY-MM-DD", ...props }) => {
  return <AntDatePicker format={format} {...props} />;
};

// Export RangePicker as well
DatePicker.RangePicker = AntDatePicker.RangePicker;

export default DatePicker;
