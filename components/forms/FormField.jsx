import { View, TextInput, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Text from "../texts/Text";
import icons from "../../constants/icons";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setshowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base">{title}</Text>
      <View className="w-full h-12 px-4 bg-white rounded-md border-2 border-gray-100 focus:border-gray-500 items-center flex-row">
        <TextInput
          className="flex-1 text-start"
          value={value}
          placeholder={placeholder}
          onChangeText={handleChangeText}
          {...props}
          placeholderTextColor="#6D6D6D"
          secureTextEntry={
            title === "Current Password" ||
            title === "New Password" ||
            title === "Confirm New Password" ||
            title === "Password"
              ? !showPassword
              : false
          }
        />
        {(title === "Current Password" ||
          title === "New Password" ||
          title === "Confirm New Password" ||
          title === "Password") && (
          <TouchableOpacity
            onPress={() => setshowPassword(!showPassword)}
            className="absolute right-4"
          >
            <Image
              source={icons.eyeOn}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
