import React from "react";
import { View, StyleSheet, Image } from "react-native";
import Text from "../texts/Text";
import SubHeading from "../texts/SubHeading";

const Journey = ({ data }) => {
  const totalCleanups = data.collections.length;
  const journeyStages = [
    "Seedling",
    "Sapling",
    "Blooming",
    "Forest",
    "Evergreen",
  ];
  const earnedStages = journeyStages.slice(0, totalCleanups);

  return (
    <View style={styles.container}>
      <SubHeading style={styles.title}>Journey</SubHeading>
      {earnedStages.map((stage, index) => (
        <View key={index} style={styles.item}>
          <Image
            source={require(`./path/to/${stage.toLowerCase()}.png`)}
            style={styles.image}
          />
          <Text style={styles.itemText}>{stage}</Text>
        </View>
      ))}
      <Text style={styles.subtitle}>
        You have done {totalCleanups} cleanups!
      </Text>
      <Text className="text-14" style={styles.progress}>
        {totalCleanups}/15 cleanups
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    color: "#777",
    marginBottom: 8,
  },
  progress: {
    color: "#00C853",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  itemText: {
    marginLeft: 8,
  },
  image: {
    width: 40,
    height: 40,
  },
});

export default Journey;
