import React from "react";
import { View, Text, Pressable, Image, ImageBackground } from "react-native";
import { Link } from "expo-router";
import { images } from "../../constants/images";
import icons from "../../constants/icons";

const LandingPage1 = () => (
  <View className="flex-1 bg-gray-100">
    <ImageBackground
      source={images.landingBackground}
      className="absolute top-[165px] right-[10px] w-[576px] h-[576px]"
    ></ImageBackground>
    <View className="flex-1 items-center justify-center font-redhat">
      <View className="my-6">
        <Image
          source={images.landingPageImage}
          className="h-[331px] w-[332px]"
        />
      </View>
      <View className="w-[330]">
        <Text className="text-[40px] w-50 mb-2 text-primary font-redhatBold">
          Make a difference
        </Text>
        <Text className="text-xl w-[280px] text-primary font-redhatSemi">
          Discover and join local cleanup events, track your impact, and explore
          topics empowering you to drive positive change.
        </Text>
      </View>

      <View className="flex-row justify-end w-[330px] mt-10 mr-10 absolute right-0 bottom-10">
        <Link href="/landingPages/landingPage2" asChild>
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

export default LandingPage1;
