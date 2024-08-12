import React from "react";
import { Image, Pressable } from "react-native";
import { Stack, useNavigation } from "expo-router";
import icons from "../../constants/icons";

function Layout() {
  const navigation = useNavigation();

  return (
    <Stack>
      <Stack.Screen name="detail" options={{ title: "I'm a detail" }} />
      <Stack.Screen
        name="confirmEvent"
        options={{
          title: "Confirm Event",
          headerShown: true,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#007e4c",
          },
          headerTintColor: "#FFFFFF",
          headerLeft: () => (
            <Pressable
              style={{ marginLeft: 10 }} 
              onPress={() => navigation.goBack()}
            >
              <Image
                source={icons.back}
                style={{ tintColor: "#FFFFFF", width: 20, height: 20 }}
              />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
}

export default Layout;
