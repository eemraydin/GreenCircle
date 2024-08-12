import { ActivityIndicator, TouchableOpacity } from "react-native";
import SubHeading from "../texts/SubHeading";

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
  disabled,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-secondary rounded-2xl min-h-[45px] flex flex-row justify-center items-center ${containerStyles} ${
        isLoading || disabled ? "opacity-50" : ""
      }`}
      disabled={isLoading || disabled}
    >
      <SubHeading className={`text-white text-lg ${textStyles}`}>
        {title}
      </SubHeading>

      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          className="ml-2"
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
