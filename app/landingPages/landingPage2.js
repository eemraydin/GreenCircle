import React from "react";
import { View, Text, Pressable, Image, ImageBackground } from "react-native";
import { Link } from "expo-router";
import { images } from "../../constants/images";
import icons from "../../constants/icons";

const LandingPage2 = () => (
  <View className="flex-1 bg-gray-100">
    <ImageBackground
      source={images.landingBackground}
      className="absolute top-[395px] left-[-90px]  right-0 bottom-0 w-[576px] h-[576px]"
    ></ImageBackground>
    <View className="flex-1 items-center justify-center ">
      <View className="my-6">
        <Image
          source={images.EventImage}
          className="h-[411px] w-[321px] top-[-50px]"
        />
      </View>
      <View className="w-[330px]">
        <Text className="text-[40px] w-60 mb-2 text-primary font-redhatBold">
          Good bye pen & paper
        </Text>
        <Text className="text-xl w-[280px] text-primary font-redhatSemi">
          Tap to easily log and view the waste you've collected with our
          intuitive counter.
        </Text>
      </View>

      <View className="flex-row justify-end w-[330px] mt-10 mr-10 absolute right-0 bottom-10">
        <Link href="/landingPages/landingPage3" asChild>
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

export default LandingPage2;
