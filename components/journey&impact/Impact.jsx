import React from "react";
import { View, StyleSheet, Image } from "react-native";
import arrowOdd from "../../assets/icons/iconsAchivements/arrowOdd.png";
import Text from "../texts/Text";
import Heading from "../texts/Heading";

const MaterialCard = ({ material, count, imageSrc }) => {
  return (
    <View style={styles.card}>
      <View style={styles.leftColumn}>
        <Image source={imageSrc} style={styles.image} />
        <Text className="text-base" style={styles.material}>
          {material.charAt(0).toUpperCase() + material.slice(1)}
        </Text>
      </View>
      <View style={styles.rightColumn}>
        <Heading className="text-32 text-primary">{count}</Heading>
      </View>
      <View style={styles.arrowIconContainer}>
        <Image source={arrowOdd} style={styles.arrowIcon} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    minHeight: 100,
    position: "relative",
  },
  leftColumn: {
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
  rightColumn: {
    flex: 1,
    alignItems: "center",
  },
  material: {
    fontSize: 16,
    lineHeight: 24,
    color: "#313131",
  },
  arrowIconContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  arrowIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
});

export default MaterialCard;
