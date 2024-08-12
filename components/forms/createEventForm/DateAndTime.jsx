import React, { useState, useEffect } from "react";
import { Platform, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import DateTimePickerModal from "react-native-modal-datetime-picker";

function DateAndTime({ displayDate, date, onChange, confirmIOSDate }) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  useEffect(() => {
    setDatePickerVisibility(displayDate);
  }, [displayDate]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate) => {
    hideDatePicker();
    onChange(selectedDate);
    confirmIOSDate(selectedDate);
  };

  return (
    <View>
      {Platform.OS === "ios" ? (
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      ) : (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            if (event.type === "set") {
              handleConfirm(selectedDate || date);
            } else {
              hideDatePicker();
            }
          }}
        />
      )}
    </View>
  );
}

export default DateAndTime;
