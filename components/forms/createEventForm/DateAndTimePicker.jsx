import React from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const DateAndTimePicker = ({
  isVisible,
  mode,
  onConfirm,
  onCancel,
  disabled,
  minimumDate,
}) => {
  return (
    <DateTimePickerModal
      isVisible={isVisible}
      mode={mode}
      onConfirm={onConfirm}
      onCancel={onCancel}
      disabled={disabled}
      locale="en_GB"
      minimumDate={minimumDate}
    />
  );
};

export default DateAndTimePicker;

