import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import Text from "../../texts/Text";
import BottomSheet from "./BottomSheet";
import { animateToRegion } from "../../../utils/locationUtils";

const FILTER_TYPES = ["Nearby", "Park", "Beach", "Trail"];

const FilterButton = ({
  filterType,
  selectedFilter,
  setSelectedFilter,
  selectedCategory,
  setSelectedCategory,
  mapRefCurrent,
  region,
  isAllowLocation,
}) => {
  const isDisabled = filterType === "Nearby" && !isAllowLocation;

  return (
    <TouchableOpacity
      className="bg-white rounded-full px-4 mx-1"
      style={[
        styles.filterButton,
        selectedFilter === filterType && styles.selectedFilterButton,
        isDisabled && styles.disabledFilterButton,
      ]}
      disabled={isDisabled}
      onPress={() => {
        setSelectedFilter(filterType === selectedFilter ? "" : filterType);
        setSelectedCategory(
          filterType === FILTER_TYPES[0] || filterType === selectedCategory
            ? ""
            : filterType
        );
        animateToRegion(mapRefCurrent, region);
      }}
    >
      <Text
        className="text-primary text-sm"
        style={[
          selectedFilter === filterType && styles.selectedFilterButtonText,
          isDisabled && styles.disabledFilterButtonText,
        ]}
      >
        {filterType === "Nearby"
          ? filterType
          : filterType === "Beach"
          ? filterType + "es"
          : filterType + "s"}
      </Text>
    </TouchableOpacity>
  );
};

const QuickFilters = ({
  filteredEvents,
  selectedCategory,
  setSelectedCategory,
  mapRefCurrent,
  region,
  isAllowLocation,
}) => {
  const [selectedFilter, setSelectedFilter] = useState("");

  const title = (selectedCategory ? selectedCategory : "Nearby") + " Events";

  return (
    <>
      <View className="absolute w-full px-4 my-4" style={styles.container}>
        <View className="flex-row flex-wrap justify-around">
          {FILTER_TYPES.map((item) => (
            <FilterButton
              key={item}
              filterType={item}
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              mapRefCurrent={mapRefCurrent}
              region={region}
              isAllowLocation={isAllowLocation}
            />
          ))}
        </View>
      </View>
      {selectedFilter && <BottomSheet data={filteredEvents} title={title} />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    top: 160,
  },
  filterButton: {
    backgroundColor: "white",
    paddingVertical: 6,
    shadowColor: "black",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 4, // For Android shadow
  },
  selectedFilterButton: {
    backgroundColor: "#005435", // primary color
  },
  selectedFilterButtonText: {
    color: "white",
  },
  disabledFilterButton: {
    backgroundColor: "#d3d3d3",
  },
  disabledFilterButtonText: {
    color: "#a9a9a9",
  },
});

export default QuickFilters;
