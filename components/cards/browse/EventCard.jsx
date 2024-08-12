import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";

import Text from "../../texts/Text";
import SubHeading from "../../texts/SubHeading";
import { getDateInfo, convertTimeToMeridiem } from "../../../utils/timeUtils";

const EventCard = ({
  data,
  name,
  hostName,
  date,
  startTime,
  endTime,
  numParticipants,
  locationName = "",
  distance = "",
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
          className="relative border-[#DCDCDC] px-4 py-2 mx-4 my-2"
          style={styles.container}
        >
          <View className="absolute bg-[#D3D8D8] w-9 h-9 flex justify-center items-center top-2 right-4 rounded-lg p-2">
            <SubHeading className="text-center text-primary text-base">
              {dateObj.day}
            </SubHeading>
            <Text className="text-center text-primary text-xs">
              {dateObj.month}
            </Text>
          </View>
          <View className="flex-row items-center">
            <View className="flex-col">
              <SubHeading>{name}</SubHeading>
              <View className="my-1">
                <Text style={styles.description}>Host: {hostName}</Text>
                <Text style={styles.description}>
                  Time: {convertTimeToMeridiem(startTime)} to{" "}
                  {convertTimeToMeridiem(endTime)}
                </Text>
                {(locationName || distance) && (
                  <Text style={styles.description}>
                    Location: {locationName}, Vancouver BC | {distance} km
                  </Text>
                )}
              </View>
              <Text
                className="text-xs text-gray-500"
                style={styles.description}
              >
                {numParticipants} People joined the event
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1.2,
    borderRadius: 8,
  },
  description: {
    lineHeight: 20,
  },
});

export default EventCard;
