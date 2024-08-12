import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";

import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import Text from "../../texts/Text";
import SubHeading from "../../texts/SubHeading";
import { getDateInfo, convertTimeToMeridiem } from "../../../utils/timeUtils";

const EventSearchCard = ({
  data,
  name,
  hostName,
  date,
  startTime,
  endTime,
  locationName = "",
  distance = "",
  index,
}) => {
  const dateObj = getDateInfo(date);

  return (
    <Link
      href={`suggestedEvents/suggestedEventDetail?singleEvent=${encodeURIComponent(
        JSON.stringify(data)
      )}&location=${data.location && data.location._id}`}
      asChild
    >
      <Pressable>
        <View
          className="p-4"
          style={[
            styles.cardContainer,
            index % 2 === 0 && styles.evenCardContainer,
          ]}
        >
          <View className="flex-row items-center px-4">
            <View style={{ flexDirection: "column" }}>
              <SubHeading className="text-base">{name}</SubHeading>
              <Text className="text-sm" style={styles.description}>
                Hosted by: {hostName}
              </Text>
              <View className="flex-row gap-4">
                <View className="flex-row items-center">
                  <AntDesign name="calendar" size={16} color="#4A5568" />
                  <Text
                    className="text-sm text-gray-500 pl-1"
                    style={styles.description}
                  >
                    {dateObj.day} {dateObj.month} {dateObj.year}
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <MaterialIcons name="access-time" size={16} color="#4A5568" />
                  <Text
                    className="text-sm text-gray-500 pl-1"
                    style={styles.description}
                  >
                    {convertTimeToMeridiem(startTime)} -{" "}
                    {convertTimeToMeridiem(endTime)}
                  </Text>
                </View>
              </View>
              {(locationName || distance) && (
                <View className="flex-row items-center">
                  <MaterialIcons
                    name="location-pin"
                    size={16}
                    color="#4A5568"
                  />
                  <Text
                    className="text-sm text-gray-500 pl-1"
                    style={styles.description}
                  >
                    {locationName}, Vancouver BC | {distance} km
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "white",
  },
  evenCardContainer: {
    backgroundColor: "#D3DBD8",
  },
  description: {
    lineHeight: 22,
  },
});

export default EventSearchCard;
