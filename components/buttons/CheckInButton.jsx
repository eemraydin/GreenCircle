import { Pressable } from "react-native";
import SubHeading from "../texts/SubHeading";

function CheckInButton({ text, onPress, disabled }) {
  return (
    <Pressable
      onPress={onPress}
      className="bg-primary w-full h-12 self-center rounded-full justify-center items-center mb-4"
      disabled={disabled}
    >
      <SubHeading className="text-white font-bold text-m">{text}</SubHeading>
    </Pressable>
  );
}

export default CheckInButton;
