import React from "react";
import { View, Text, Pressable, Image, ImageBackground } from "react-native";
import { Link } from "expo-router";
import { images } from "../../constants/images";
import icons from "../../constants/icons";

const LandingPage3 = () => (
  <View className="flex-1 bg-gray-100">
    <ImageBackground
      source={images.landingBackground}
      className="absolute top-[240px] left-[30px]  right-0 bottom-0 w-[576px] h-[576px]"
    ></ImageBackground>
    <View className="flex-1 items-center justify-center ">
      <View className="my-24">
        <View className="absolute top-0 bottom-0 left-[-20] right-0 z-10">
          <Image
            source={images.TotalCleanups}
            className="h-[100px] w-[160px]"
          />
        </View>
        <View className="flex items-center justify-center">
          <View className="w-[240] h-[240] border-4 border-gray-300 rounded-full flex items-center justify-center">
            <View className="w-[220] h-[220] rounded-full bg-primary flex items-center justify-center">
              <Image
                source={images.Seed}
                // className="h-[331px] w-[332px]"
              />
            </View>
          </View>
        </View>
        <View className="absolute top-[210px] bottom-0 left-[80px] right-0">
          <Image source={images.Impact} className="h-[110px] w-[180px]" />
        </View>
      </View>
      <View className="w-[330px]">
        <Text className="text-[40px] w-52 mb-2 text-primary font-redhatBold">
          You're now a seedling
        </Text>
        <Text className="text-xl w-[300px] text-primary font-redhatSemi">
          Every big change starts out small. For every three cleanups you do,
          you're a step closer to our goals. Together, let's do our part towards
          a better home.
        </Text>
      </View>

      <View className="flex-row justify-end w-[330px] mt-10 mr-10 absolute right-0 bottom-10">
        <Link href="/(auth)/login" asChild>
          <Pressable>
            <View className="flex items-center justify-center">
              <View className="w-[58px] h-[58px] border-4 border-gray-300 rounded-full flex items-center justify-center">
                <View className="w-[42px] h-[42px] rounded-full bg-primary flex items-center justify-center">
                  <Image source={icons.next} />
                </View>
              </View>
            </View>
          </Pressable>
        </Link>
      </View>
    </View>
  </View>
);

export default LandingPage3;
