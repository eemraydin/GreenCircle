import { Pressable, View } from "react-native";
import { Link } from "expo-router";
import Text from "../../texts/Text";
import Heading from "../../texts/Heading";
// import wildLifeBear from "../../../assets/icons/greenGuideIcons/wildLifeBear.png";
// import ArticlesIcon from "../../../assets/icons/greenGuideIcons/Articles.png";
// import SafetyTipsIcon from "../../../assets/icons/greenGuideIcons/SafetyTips.png";
import WildLife101 from "../../../assets/icons/iconsActive/wildLife101";
import Safetytips from "../../../assets/icons/iconsActive/safetyTips";
import Articles from "../../../assets/icons/iconsActive/ArticlesIcon";

function GreenGuide() {
  return (
    <View className="p-4 w-85 rounded relative">
      <Heading className="py-1">GreenGuide</Heading>
      <Text className="text-[14px] pb-2">
        Discover the latest in nature education and wellness
      </Text>

      {/* Wildlife 101 Card */}
      <View className="pb-2">
        <View className="bg-gray-200 rounded-xl h-[97px] justify-center items-start pl-6">
          <Link href="/greenGuideDetail/GreenGuide" asChild>
            <Pressable className="flex-row items-center">
              <WildLife101 />
              <View className="ml-[25px]">
                <Heading className="text-lg text-primary">Wildlife 101</Heading>
                <Text className="text-primaryDark">
                  Avoiding Animal Encounters
                </Text>
              </View>
            </Pressable>
          </Link>
        </View>
      </View>

      {/* Articles Card */}
      <View className="pb-2">
        <View className="bg-gray-200 rounded-xl h-[97px] justify-center items-start pl-6">
          <Link href="/greenGuideDetail/GreenGuide" asChild>
            <Pressable className="flex-row items-center">
              <Articles />
              <View className="ml-[20px]">
                <Heading className="text-lg text-primary">Articles</Heading>
                <Text className="text-primaryDark">
                  Articles on nature and animals
                </Text>
              </View>
            </Pressable>
          </Link>
        </View>
      </View>

      {/* Safety Tips Card */}
      <View className="pb-2">
        <View className="bg-gray-200 rounded-xl h-[97px] justify-center items-start pl-8">
          <Link href="/greenGuideDetail/GreenGuide" asChild>
            <Pressable className="flex-row items-center">
              <Safetytips />
              <View className="ml-[28px]">
                <Heading className="text-lg text-primary">Safety Tips</Heading>
                <Text className="text-primaryDark">Staying prepared and</Text>
                <Text className="text-primaryDark">handling materials</Text>
              </View>
            </Pressable>
          </Link>
        </View>
      </View>
    </View>
  );
}

export default GreenGuide;
