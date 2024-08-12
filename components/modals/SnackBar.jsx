import { Modal as RNModal, View } from "react-native";

function SnackBar({ isOpen, children }) {
  return (
    <RNModal visible={isOpen} animationType="fade" transparent>
      <View className="items-center justify-between self-center  px-3 flex-row bg-accentStrong h-[50] absolute  top-24 rounded-lg w-11/12 ">
        {children}
      </View>
    </RNModal>
  );
}

export default SnackBar;
