import React from "react";
import { Text } from "react-native";

const Heading = ({ ...props }) => {
  return (
    <Text className="font-redhatBold color-primaryDark text-2xl" {...props} /> // Red Hat Display 700, 24px, #003B22
  );
};

export default Heading;
