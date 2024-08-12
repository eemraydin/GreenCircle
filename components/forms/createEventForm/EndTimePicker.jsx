import React, { useState, useEffect } from "react";
import { Platform, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import DateTimePickerModal from "react-native-modal-datetime-picker";

function EndTimePicker({ displayEndTime, time, onChange, confirmIOSEndTime }) {
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  useEffect(() => {
    setTimePickerVisibility(displayEndTime);
  }, [displayEndTime]);

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirm = (selectedTime) => {
    hideTimePicker();
    onChange({ type: "set" }, selectedTime);
    confirmIOSEndTime(selectedTime);
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
        displayEndTime && (
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

export default EndTimePicker;
