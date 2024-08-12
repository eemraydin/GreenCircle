import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Text from "../../texts/Text";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { getAllCollections } from "../../../services/collectionsAPI";
import Seedling from "../../../assets/icons/achievements/01_Seedling_1";
import Seedling2 from "../../../assets/icons/achievements/02_Seedling_2";
import Seedling3 from "../../../assets/icons/achievements/03_Seedling_3";
import Sapling from "../../../assets/icons/achievements/04_Sapling_1";
import Sapling2 from "../../../assets/icons/achievements/05_Sapling_2";
import Sapling3 from "../../../assets/icons/achievements/06_Sapling_3";
import Blooming from "../../../assets/icons/achievements/07_Blooming_1";
import Blooming2 from "../../../assets/icons/achievements/08_Blooming_2";
import Blooming3 from "../../../assets/icons/achievements/09_Blooming_3";
import Tree from "../../../assets/icons/achievements/10_Forest_1";
import Tree2 from "../../../assets/icons/achievements/11_Forest_2";
import Tree3 from "../../../assets/icons/achievements/12_Forest_3";
import Evergreen from "../../../assets/icons/achievements/13_Evergreen_1";
import Evergreen2 from "../../../assets/icons/achievements/14_Evergreen_2";
import Evergreen3 from "../../../assets/icons/achievements/15_Evergreeen_3";
import { getUser } from "../../../services/auth";

const levelIcons = [
  { icon: <Seedling />, name: "Seedling" },
  { icon: <Seedling2 />, name: "Seedling" },
  { icon: <Seedling3 />, name: "Seedling" },
  { icon: <Sapling />, name: "Sapling" },
  { icon: <Sapling2 />, name: "Sapling" },
  { icon: <Sapling3 />, name: "Sapling" },
  { icon: <Blooming />, name: "Blooming" },
  { icon: <Blooming2 />, name: "Blooming" },
  { icon: <Blooming3 />, name: "Blooming" },
  { icon: <Tree />, name: "Tree" },
  { icon: <Tree2 />, name: "Tree" },
  { icon: <Tree3 />, name: "Tree" },
  { icon: <Evergreen />, name: "Evergreen" },
  { icon: <Evergreen2 />, name: "Evergreen" },
  { icon: <Evergreen3 />, name: "Evergreen" },
];

function AchievementsCard() {
  const [collectionsCount, setCollectionsCount] = useState(0);
  const [userData, setUser] = useState(null);

  const totalCleanupsRequiredForNextLevel = 3;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userInfo = await getUser();
        setUser(userInfo.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (userData) {
      const fetchAllCollections = async () => {
        try {
          const allCollections = await getAllCollections();

          // Count collections belonging to the user
          const userCollections = allCollections.collections.filter(
            (collection) => collection.user === userData._id
          );

          setCollectionsCount(userCollections.length);
        } catch (error) {
          console.error("Error fetching all collections:", error);
        }
      };

      fetchAllCollections();
    }
  }, [userData]);

  // Calculate current level and progress
  const currentLevel =
    Math.floor(collectionsCount / totalCleanupsRequiredForNextLevel) + 1;
  const cleanUpsNeeded =
    totalCleanupsRequiredForNextLevel -
    (collectionsCount % totalCleanupsRequiredForNextLevel);
  const fillPercentage =
    ((collectionsCount % totalCleanupsRequiredForNextLevel) /
      totalCleanupsRequiredForNextLevel) *
    100;

  return (
    <View
      style={{
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      <AnimatedCircularProgress
        size={110}
        width={10}
        fill={fillPercentage}
        tintColor="#007E4C"
        onAnimationComplete={() => console.log("onAnimationComplete")}
        backgroundColor="#d9d9d9"
        lineCap="round"
        arcSweepAngle={360}
        rotation={0}
      >
        {() => (
          <View className="justify-center items-center">
            {collectionsCount > 0
              ? levelIcons[collectionsCount - 1].icon
              : levelIcons[0].icon}
          </View>
        )}
      </AnimatedCircularProgress>
      <View>
        <Text>
          Your Journey:
          <Text className="font-bold">
            {" "}
            {levelIcons[currentLevel - 1].name}
          </Text>
        </Text>

        <Link href={"/achievement"} className="text-accent pt-4">
          See Achievements {">"}
        </Link>
      </View>
    </View>
  );
}

export default AchievementsCard;
