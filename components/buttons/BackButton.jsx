import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { useNavigation, Link } from "expo-router";
import { Feather } from "@expo/vector-icons";

const BackButton = () => {
  const navigation = useNavigation();

  return (
    <Link href="/home" asChild>
      <Pressable style={styles.button} onPress={() => navigation.goBack()}>
        <Feather name="arrow-left-circle" size={26} color="white" />
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BackButton;
