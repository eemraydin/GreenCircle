import { Stack } from "expo-router";
import { Image, Pressable } from "react-native";
import { useNavigation } from "expo-router";
import icons from "../../constants/icons.js";
function Layout() {
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
            <Image source={icons.back} />
          </Pressable>
        ),
      }}
    >
      <Stack.Screen name="upComingEventsDetail" options={{ title: "" }} />
    </Stack>
  );
}
export default Layout;
