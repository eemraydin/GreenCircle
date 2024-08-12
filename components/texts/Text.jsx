import React from "react";
import { Text as RNText } from "react-native";

const Text = ({ ...props }) => {
  return <RNText className="font-redhatText text-base" {...props} />; // Red Hat Text 400, 16px
};

export default Text;
