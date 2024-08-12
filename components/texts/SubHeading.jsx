import React from "react";
import { Text } from "react-native";

const SubHeading = ({ ...props }) => {
  return <Text className="font-redhatSemi text-lg" {...props} />; // Red Hat Display 600, 18px
};

export default SubHeading;
