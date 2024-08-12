import React, { useRef, useState } from "react";
import {
  View,
  Text,
  PanResponder,
  Animated,
  Dimensions,
  Image,
} from "react-native";
import SwipeIcon from "../../assets/icons/iconsActive/swipeIcon";

const { width: screenWidth } = Dimensions.get("window");

const SwipeButton = ({
  onSwipeSuccess,
  title,
  width = screenWidth,
  height,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [isSwiped, setIsSwiped] = useState(false);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, { dx: animatedValue }], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dx > width / 2) {
        setIsSwiped(true);
        Animated.timing(animatedValue, {
          toValue: width - height,
          duration: 200,
          useNativeDriver: false,
        }).start(() => onSwipeSuccess());
      } else {
        Animated.spring(animatedValue, {
          toValue: 0,
          useNativeDriver: false,
        }).start(() => setIsSwiped(false));
      }
    },
  });

  const interpolatedColor = animatedValue.interpolate({
    inputRange: [0, width - height],
    outputRange: ["#f0f0f0", "#C70E0E"],
    extrapolate: "clamp",
  });

  const textColor = animatedValue.interpolate({
    inputRange: [0, width / 2],
    outputRange: ["#005435", "#FFF"],
    extrapolate: "clamp",
  });

  return (
    <View
      style={{
        width,
        height,
        backgroundColor: "#f0f0f0",
        borderRadius: height / 2,
        borderColor: "#005435",
        borderWidth: 1,
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <Animated.View
        style={{
          position: "absolute",
            height: "100%",
            width: "100%",
        //   height: "90%",
        //   width: Animated.add(animatedValue, height / 2),

          backgroundColor: interpolatedColor,
        }}
      />
      <Animated.Text
        style={{
          position: "absolute",
          alignSelf: "center",
          color: textColor,

        }}
      >
        {title}
      </Animated.Text>

      <Animated.View
        {...panResponder.panHandlers}
        style={{
          width: height - 8,
          height: height - 8,
          borderRadius: height / 2,
          padding: 5,
          margin: 6,
          backgroundColor: "#005435",
          position: "absolute",
          transform: [{ translateX: animatedValue }],
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SwipeIcon />
      </Animated.View>
    </View>
  );
};

export default SwipeButton;
