import React from "react";
import { View, Image } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import icons from "../../../constants/icons";
import Text from "../../texts/Text";

const DropDown = ({ dropdownSelection, onDropDown, selectionArr }) => {
  const renderItem = (item) => (
    <View className="flex-row items-center py-1 px-4">
      <Image source={icons.locationMarker} className="w-5 h-5 mr-1" />
      <Text className="text-xs ml-2">{item.label}</Text>
    </View>
  );

  return (
    <View className="my-2 w-full ">
      <View className="px-1 h-[48px] bg-white flex-row items-center rounded-md">
        <Dropdown
          className="flex-1 font-redhatText text-base h-10 px-2"
          inputSearchStyle={{ fontSize: 12, height: 35, paddingHorizontal: 4 }}
          selectedTextStyle={{ fontSize: 14 }}
          data={selectionArr}
          maxHeight={200}
          width={"100%"}
          labelField="label"
          valueField="value"
          placeholder="Choose location of cleanup"
          value={dropdownSelection}
          onChange={(item) => {
            onDropDown(item.value);
          }}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

export default DropDown;
