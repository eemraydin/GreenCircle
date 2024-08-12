import React from "react";
import { View, FlatList } from "react-native";

import SubHeading from "../../texts/SubHeading";
import EventSearchCard from "./EventSearchCard";

const SearchResults = ({ filteredEvents }) => {
  return (
    <View className="w-full h-full bg-[#F7F8FB]">
      <SubHeading className="px-4 pt-4 pb-3">Search Results</SubHeading>
      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => (
          <EventSearchCard
            data={item}
            name={item.name}
            hostName={item.user && item.user.name}
            date={item.dateOfEvent}
            startTime={item.startTime}
            endTime={item.endTime}
            locationName={item.location && item.location.name}
            distance={item.distance}
            index={index}
          />
        )}
      />
    </View>
  );
};

export default SearchResults;
