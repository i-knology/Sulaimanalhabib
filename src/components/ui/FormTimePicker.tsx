import { TimePicker, TimePickerProps } from "antd";

export default function FormTimePicker(props: TimePickerProps) {
  return (
    <TimePicker
      use12Hours
      format="hh:mm A"
      changeOnScroll={false}
      {...props}
    />
  );
}
