import { Modal as RNModal, View } from "react-native";

function JoinModal({ isOpen, children }) {
  return (
    <RNModal visible={isOpen} animationType="fade" transparent>
      <View className="items-center justify-center flex-1 px-3  bg-zinc-900/40 ">
        {children}
      </View>
    </RNModal>
  );
}

export default JoinModal;
