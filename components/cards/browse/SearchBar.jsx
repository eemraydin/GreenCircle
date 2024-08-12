import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";

const SearchBar = ({ searchQuery, setSearchQuery, setSelectedLocationId }) => {
  const clearSelectedLocation = () => {
    setSelectedLocationId(null);
  };

  return (
    <View className="flex-row items-center bg-white px-4">
      <TextInput
        className="text-base py-4"
        style={styles.searchInput}
        placeholder="Search for events"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
        onPress={() => clearSelectedLocation()}
      />
      <FontAwesome6 name="magnifying-glass" style={styles.searchIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    flex: 1,
  },
  searchIcon: {
    fontSize: 18,
    // color: "#131313",
    color: "#777777",
  },
});

export default SearchBar;
