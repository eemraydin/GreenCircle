import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Dimensions, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker, PROVIDER_GOOGLE, Circle } from "react-native-maps";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SecureStore from "expo-secure-store";

import { getAllLocations } from "../../services/locationsAPI";
import { getAllEvents } from "../../services/eventsAPI";
import { getPreferences } from "../../services/preferences";
import SubHeading from "../../components/texts/SubHeading";
import BottomSheet from "../../components/cards/browse/BottomSheet";
import SearchBar from "../../components/cards/browse/SearchBar";
import SearchResults from "../../components/cards/browse/SearchResults";
import QuickFilters from "../../components/cards/browse/QuickFilters";
import LocationFilterModal from "../../components/modals/browse/LocationFilterModal";
import BackButton from "../../components/buttons/BackButton";
import FilterListIcon from "../../assets/icons/browse/filter-list.svg";
import {
  defaultCoordinate,
  getCurrentLocation,
  createRegionByCoordinate,
  createRegion,
  createLocation,
  animateToRegion,
} from "../../utils/locationUtils";
import {
  getSuggestedEvents,
  getFilteredLocations,
  getFilteredEvents,
  getFilteredEventsByLocation,
} from "../../utils/browseUtils";

const Browse = () => {
  const [locations, setLocations] = useState(new Map());
  const [events, setEvents] = useState(new Map());
  const [eventsByLocation, setEventsByLocation] = useState(new Map());
  const [region, setRegion] = useState(defaultCoordinate);
  const [currentLocation, setCurrentLocation] = useState({
    latitude: defaultCoordinate.latitude,
    longitude: defaultCoordinate.longitude,
  });
  const [isAllowLocation, setIsAllowLocation] = useState(false);
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDateDuration, setSelectedDateDuration] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedRadius, setSelectedRadius] = useState(30); // Default radius in kilometers
  const mapRef = useRef(null);

  const fetchLocations = async () => {
    try {
      const data = await getAllLocations();
      const result = new Map();
      data.forEach((item) => {
        result.set(item._id, item);
      });
      setLocations(result);
    } catch (error) {
      console.error("Error fetching all locations:", error);
    }
  };

  const fetchEvents = async () => {
    try {
      const data = await getAllEvents();

      const userInfoStr = await SecureStore.getItemAsync("userInfo");
      const userId = userInfoStr && JSON.parse(userInfoStr).id;

      setEvents(getSuggestedEvents(data, userId, currentLocation));
    } catch (error) {
      console.error("Error fetching all events:", error);
    }
  };

  const createEventByLocationMap = () => {
    try {
      const result = new Map();
      events.forEach((event) => {
        const locationId = event.location._id;
        if (locationId && locations.has(locationId)) {
          if (!result.has(locationId)) {
            result.set(locationId, []);
          }
          result.get(locationId).push(event._id);
        }
      });
      setEventsByLocation(result);
    } catch (error) {
      console.error("Error creating location event map:", error);
    }
  };

  const clearSelectedLocation = () => {
    setSelectedLocationId(null);
  };

  useEffect(() => {
    const init = async () => {
      await fetchLocations();
      await fetchEvents();

      let location = null;
      const preferences = await getPreferences();
      const isAllowGPS =
        preferences &&
        preferences.preferences &&
        preferences.preferences.location;
      if (isAllowGPS) {
        location = await getCurrentLocation();
      }
      setIsAllowLocation(isAllowGPS);
      setRegion(createRegion(location && location.coords));
      setCurrentLocation(createLocation(location && location.coords));
    };
    init();
  }, []);

  useEffect(() => {
    createEventByLocationMap();
    console.log(`Number of Locations: ${locations.size}`);
    console.log(`Number of Events: ${events.size}`);
    console.log(`Number of Locations having Events: ${eventsByLocation.size}`);
    console.log(
      `Current Location: ${currentLocation && currentLocation.latitude} ${
        currentLocation && currentLocation.longitude
      }`
    );
  }, [locations, events]);

  const onLocationSelect = (locationId) => {
    const location = locations.get(locationId);
    if (location) {
      setSelectedLocationId(locationId);
      animateToRegion(mapRef.current, createRegionByCoordinate(location));
    }
  };

  const filteredLocations = getFilteredLocations(
    locations,
    searchQuery,
    selectedCategory,
    selectedAmenities,
    currentLocation,
    selectedRadius,
    events,
    eventsByLocation,
    selectedDateDuration
  );

  const filteredEvents = getFilteredEvents(
    events,
    searchQuery,
    selectedCategory,
    selectedDateDuration
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView
        className="relative bg-primaryStrong"
        style={styles.container}
      >
        <View className="flex-row justify-between items-center p-2 mx-2 mb-2">
          <BackButton />
          <SubHeading className="color-white text-xl">Browse Events</SubHeading>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => {
              setFilterModalVisible(true);
              clearSelectedLocation();
            }}
          >
            <FilterListIcon width="24" height="24" stroke="white" />
          </TouchableOpacity>
        </View>
        <LocationFilterModal
          visible={filterModalVisible}
          onClose={() => setFilterModalVisible(false)}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedDateDuration={selectedDateDuration}
          setSelectedDateDuration={setSelectedDateDuration}
          selectedAmenities={selectedAmenities}
          setSelectedAmenities={setSelectedAmenities}
          selectedRadius={selectedRadius}
          setSelectedRadius={setSelectedRadius}
          isAllowLocation={isAllowLocation}
        />
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setSelectedLocationId={setSelectedLocationId}
          setFilterModalVisible={setFilterModalVisible}
        />
        {searchQuery && <SearchResults filteredEvents={filteredEvents} />}
        {!searchQuery && (
          <QuickFilters
            filteredEvents={filteredEvents}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            mapRefCurrent={mapRef.current}
            region={createRegion(currentLocation)}
            isAllowLocation={isAllowLocation}
          />
        )}
        {!searchQuery && (
          <MapView
            provider={PROVIDER_GOOGLE}
            ref={mapRef}
            style={styles.map}
            region={region}
            showsUserLocation={isAllowLocation}
            onPress={() => clearSelectedLocation()}
          >
            {filteredLocations.map((location) => (
              <Marker
                key={location._id}
                coordinate={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                }}
                onPress={() => {
                  setTimeout(() => onLocationSelect(location._id), 10);
                }}
              />
            ))}
            {locations.get(selectedLocationId) && (
              <Circle
                center={{
                  latitude: locations.get(selectedLocationId).latitude,
                  longitude: locations.get(selectedLocationId).longitude,
                }}
                radius={locations.get(selectedLocationId).radius}
                strokeWidth={1}
                strokeColor="rgba(89, 64,	193, 0.4)" // #5940C1
                fillColor="rgba(89, 64,	193, 0.2)"
              />
            )}
          </MapView>
        )}
        {!searchQuery && selectedLocationId && (
          <BottomSheet
            key={selectedLocationId}
            data={getFilteredEventsByLocation(
              events,
              eventsByLocation,
              selectedLocationId,
              selectedDateDuration
            )}
            title={
              selectedLocationId
                ? locations.get(selectedLocationId).name
                : "Location"
            }
            isMarker={true}
          />
        )}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.8,
  },
});

export default Browse;
