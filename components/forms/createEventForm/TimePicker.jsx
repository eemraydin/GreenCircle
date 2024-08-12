import React, { useState, useEffect } from "react";
import { Platform, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import DateTimePickerModal from "react-native-modal-datetime-picker";

function TimePicker({ displayStartTime, time, onChange, confirmIOSTime }) {
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  useEffect(() => {
    setTimePickerVisibility(displayStartTime);
  }, [displayStartTime]);

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirm = (selectedTime) => {
    hideTimePicker();
    onChange({ type: "set" }, selectedTime);

    confirmIOSTime(selectedTime);
  };

  return (
    <View>
      {Platform.OS === "ios" ? (
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleConfirm}
          onCancel={hideTimePicker}
        />
      ) : (
        displayStartTime && (
          <DateTimePicker
            value={time}
            mode="time"
            display="spinner"
            onChange={(event, selectedTime) => {
              if (event.type === "set") {
                handleConfirm(selectedTime || time);
              } else {
                hideTimePicker();
              }
            }}
            is24Hour={true}
          />
        )
      )}
    </View>
  );
}

export default TimePicker;
