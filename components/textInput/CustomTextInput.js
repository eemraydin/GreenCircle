import React from "react";
import { TextInput, View } from "react-native";
import Text from "../texts/Text";

const CustomTextInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  multiline = false,
  numberOfLines = 1,
  height = 12,
  error = "",
}) => (
  <View className="mb-1">
    <Text className="text-base">{label}</Text>
    <TextInput
      className={`w-full h-${height} mt-1 px-4 font-redhatText text-base bg-white rounded-xl border-2 border-gray-100 focus:border-gray-500  items-center flex-row`}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      multiline={multiline}
      numberOfLines={numberOfLines}
    />
    {error ? <Text className="text-red-500 text-base">{error}</Text> : null}
  </View>
);

export default CustomTextInput;
