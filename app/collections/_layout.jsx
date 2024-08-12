import { View } from "react-native";
import React from "react";
import { Link, Stack } from "expo-router";
import { Button, Image, Pressable } from "react-native";
import { useNavigation } from "expo-router";
import icons from "../../constants/icons";
import Text from "../../components/texts/Text";
import BackIcon from "../../assets/icons/iconsActive/BackIconWhite"

const _layout = () => {
  const navigation = useNavigation();
  return (
    <Stack
      screenOptions={{
        headerTransparent: true,

        headerLeft: () => (
          <Pressable
            className="p-1 flex-row justify-center items-center "
            onPress={() => navigation.goBack()}
          >
            <BackIcon />
          </Pressable>
        ),
        headerRight: () => (
          <Link href="/home" asChild>
            <Pressable className="p-1 flex-row justify-center items-center">
              <Text className="text-white ">Quit Event</Text>
            </Pressable>
          </Link>
        ),
      }}
    >
      <Stack.Screen
        name="[id]"
        options={{
          title: "Event",
          headerStyle: {
            backgroundColor: "#007e4c",
          },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 30,
          },
        }}
      />
    </Stack>
  );
};

export default _layout;
