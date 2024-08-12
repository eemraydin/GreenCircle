import React, { useEffect } from "react";
import { Dimensions, StyleSheet, View, FlatList } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import EventCard from "./EventCard";
import SubHeading from "../../texts/SubHeading";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const MAX_TRANSLATE_Y = SCREEN_HEIGHT / 1.5;
const MIN_TRANSLATE_Y = SCREEN_HEIGHT / 5;

const BottomSheet = ({ data, title, isMarker = false }) => {
  const translateY = useSharedValue(0);
  const context = useSharedValue({ y: 0 });

  const gesture = Gesture.Pan()
    .onStart((e) => {
      context.value = { y: translateY.value };
    })
    .onUpdate((e) => {
      translateY.value = e.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, -MAX_TRANSLATE_Y);
    })
    .onEnd((e) => {
      if (translateY.value > -MIN_TRANSLATE_Y) {
        translateY.value = withSpring(SCREEN_HEIGHT);
      }
      if (translateY.value < -MIN_TRANSLATE_Y) {
        translateY.value = withSpring(-MAX_TRANSLATE_Y);
      }
    });

  /**
   * Animated style for the bottom sheet
   */
  const reanimatedBottomStyle = useAnimatedStyle((e) => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  /**
   * Scrolls to a specific destination
   * @param {number} destination - The destination to scroll to
   */
  const scrollTo = (destination) => {
    "worklet";
    translateY.value = withSpring(destination, { damping: 50 });
  };

  useEffect(() => {
    // Initial scroll to show the bottom sheet partially
    scrollTo(-SCREEN_HEIGHT / 8);
  }, []);

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        className="absolute bg-white py-2 w-screen h-screen"
        style={[styles.bottomsheet_container, reanimatedBottomStyle]}
      >
        <View className="my-2 self-center rounded-full" style={styles.line} />
        <SubHeading className="text-xl text-center mt-1 mb-2">
          {title}
        </SubHeading>
        <FlatList
          data={data}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <EventCard
              data={item}
              name={item.name}
              hostName={item.user && item.user.name}
              date={item.dateOfEvent}
              startTime={item.startTime}
              endTime={item.endTime}
              numParticipants={item.participants.length}
              locationName={!isMarker && item.location && item.location.name}
              distance={!isMarker && item.distance}
            />
          )}
        />
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  bottomsheet_container: {
    top: SCREEN_HEIGHT / 1.5,
    zIndex: 2,
    borderRadius: 24,
  },
  line: {
    width: 60,
    height: 4,
    backgroundColor: "#D9D9D9",
  },
});

export default BottomSheet;
