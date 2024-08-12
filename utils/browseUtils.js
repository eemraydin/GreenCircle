import * as Location from "expo-location";

import { isFutureDate, isWithinTargetTimeDuration } from "./timeUtils";
import { calcDistance, getDistanceFromLatLonInKm } from "./distanceUtils";

export const getSuggestedEvents = (allEvents, userId, currentLocation) => {
  const suggestedEvents = new Map();
  allEvents.forEach((item) => {
    if (isFutureDate(item.endTime) && !item.participants.includes(userId)) {
      item.distance = calcDistance(currentLocation, item.location);
      suggestedEvents.set(item._id, item);
    }
  });
  const result = new Map(
    [...suggestedEvents.entries()].sort((a, b) => a.dateOfEvent - b.dateOfEvent)
  );
  return result;
};

export const getFilteredEvents = (
  events,
  searchQuery,
  selectedCategory,
  selectedDateDuration
) => {
  let result = Array.from(events, ([key, value]) => value);
  if (searchQuery) {
    result = result.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  if (selectedCategory) {
    result = result.filter(
      (item) => item.location.category === selectedCategory
    );
  }
  if (selectedDateDuration) {
    result = result.filter((item) =>
      isWithinTargetTimeDuration(
        Number(Date.now()),
        Number(new Date(item.endTime).getTime()),
        Number(selectedDateDuration)
      )
    );
  }
  return result.sort(
    (a, b) => new Date(a.dateOfEvent) - new Date(b.dateOfEvent)
  );
};

export const getFilteredEventsByLocation = (
  events,
  eventsByLocation,
  selectedLocationId,
  selectedDateDuration
) => {
  const eventIds = eventsByLocation.get(selectedLocationId) || [];
  let result = eventIds.map((id) => events.get(id));
  if (selectedDateDuration) {
    result = result.filter((item) =>
      isWithinTargetTimeDuration(
        Number(Date.now()),
        Number(new Date(item.endTime).getTime()),
        Number(selectedDateDuration)
      )
    );
  }
  return result.sort(
    (a, b) => new Date(a.dateOfEvent) - new Date(b.dateOfEvent)
  );
};

export const getFilteredLocations = (
  locations,
  searchQuery,
  selectedCategory,
  selectedAmenities,
  currentCoordinate,
  selectedRadius,
  events,
  eventsByLocation,
  selectedDateDuration
) => {
  return Array.from(locations.values()).filter((location) => {
    const matchesSearch = location.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory
      ? location.category === selectedCategory
      : true;
    const matchesAmenities =
      selectedAmenities.length > 0
        ? selectedAmenities.every((amenity) =>
            location.amenities.includes(amenity)
          )
        : true;
    const distance = getDistanceFromLatLonInKm(
      currentCoordinate.latitude,
      currentCoordinate.longitude,
      location.latitude,
      location.longitude
    );
    const matchesRadius = selectedRadius ? distance <= selectedRadius : true;

    const hasEvents =
      getFilteredEventsByLocation(
        events,
        eventsByLocation,
        location._id,
        selectedDateDuration
      ).length > 0;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesAmenities &&
      matchesRadius &&
      hasEvents
    );
  });
};
