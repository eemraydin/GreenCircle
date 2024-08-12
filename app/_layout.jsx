import React, { useEffect, useState } from "react";
import { AuthProvider, useAuth } from "../authProvider/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot, SplashScreen, useRouter, useSegments } from "expo-router";
import * as Font from "expo-font";
import { Text } from "react-native";

const queryClient = new QueryClient();

const InitialLayout = () => {
  const { token, initialized } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (!initialized) return;
    //segments will be an array of the current path segments

    const authGroupSegments = [
      "(tabs)",
      "eventsDetail",
      "upComingEvents",
      "suggestedEvents",
      "collections",
      "greenGuideDetail",
      "profile",
      "create",
      "cleanUpHistory",
    ];

    const inAuthGroup = authGroupSegments.includes(segments[0]);

    //route protection logic ....
    if (token && !inAuthGroup) {
      router.replace("/(tabs)/home");
    } else if (!token && inAuthGroup) {
      router.replace("/(auth)/login");
    }
  }, [token, initialized, segments]);
  return <Slot />;
};



const RootLayout = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        "RedHatDisplay-Bold": require("../assets/fonts/RedHatDisplay-Bold.ttf"),
        "RedHatDisplay-Regular": require("../assets/fonts/RedHatDisplay-Regular.ttf"),
        "RedHatDisplay-Italic": require("../assets/fonts/RedHatDisplay-Italic.ttf"),
        "RedHatDisplay-Semi": require("../assets/fonts/RedHatDisplay-SemiBold.ttf"),
        "RedHatText-Regular": require("../assets/fonts/RedHatText-Regular.ttf"),
        "RedHatText-Bold": require("../assets/fonts/RedHatText-Bold.ttf"),
        "RedHatText-Light": require("../assets/fonts/RedHatText-Light.ttf"),
      });
      setFontLoaded(true);
    }

    loadFont();
  }, []);
  if (!fontLoaded) {
    return <Text>Loading...</Text>; // Or a loading indicator
  }

  Font.useFonts = {
    "RedHatDisplay-Bold": require("../assets/fonts/RedHatDisplay-Bold.ttf"),
    "RedHatDisplay-Regular": require("../assets/fonts/RedHatDisplay-Regular.ttf"),
    "RedHatDisplay-Italic": require("../assets/fonts/RedHatDisplay-Italic.ttf"),
    "RedHatDisplay-Semi": require("../assets/fonts/RedHatDisplay-SemiBold.ttf"),
    "RedHatText-Regular": require("../assets/fonts/RedHatText-Regular.ttf"),
    "RedHatText-Bold": require("../assets/fonts/RedHatText-Bold.ttf"),
    "RedHatText-Light": require("../assets/fonts/RedHatText-Light.ttf"),
    "RedHatText-Semi": require("../assets/fonts/RedHatText-SemiBold.ttf"),
  };

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <InitialLayout />
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default RootLayout;
