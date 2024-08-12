import React from 'react';
import { Stack } from 'expo-router';
import { HeaderBackButton } from '@react-navigation/elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Platform } from 'react-native';

function Layout() {
  const navigation = useNavigation();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#007E4C",
        },
        headerTintColor: "#fff",
        headerTitleAlign: "center",
        headerLeft: () => (
          <HeaderBackButton
            onPress={() => {
              navigation.goBack();
              console.log("Icon Back button pressed.");
            }}
            backImage={() => <Icon name="arrow-back-circle-outline" size={25} color="#fff" />}
            labelVisible={Platform.OS === 'ios' ? false : true}
          />
        ),
      }}
    >
      <Stack.Screen name="GreenGuide" options={{ title: "GreenGuide" }} />
    </Stack>
  );
}

export default Layout;
