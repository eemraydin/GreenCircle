import * as Location from "expo-location";

const ZOOM_LEVEL = 3;

export const defaultCoordinate = {
  latitude: 49.2578182,
  longitude: -123.2063044,
  latitudeDelta: 0.0922 * ZOOM_LEVEL,
  longitudeDelta: 0.0421 * ZOOM_LEVEL,
};

export const getCurrentLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    console.error("Permission to access location was denied");
    return null;
  }
  return await Location.getCurrentPositionAsync({});
};

export const createRegionByCoordinate = (coords) => {
  return {
    latitude: coords.latitude - 0.02, // adjust position considering bottom sheet
    longitude: coords.longitude,
    latitudeDelta: defaultCoordinate.latitudeDelta / ZOOM_LEVEL,
    longitudeDelta: defaultCoordinate.longitudeDelta / ZOOM_LEVEL,
  };
};

export const createRegion = (location) => {
  const coords = createCoordinate(location);
  return {
    latitude: coords.latitude,
    longitude: coords.longitude,
    latitudeDelta: defaultCoordinate.latitudeDelta,
    longitudeDelta: defaultCoordinate.longitudeDelta,
  };
};

export const createLocation = (location) => {
  const coords = createCoordinate(location);
  return {
    latitude: coords.latitude,
    longitude: coords.longitude,
  };
};

const createCoordinate = (location) => {
  let latitude = defaultCoordinate.latitude;
  let longitude = defaultCoordinate.longitude;
  if (location && 45 < location.latitude && location.latitude < 55) {
    latitude = location.latitude;
    longitude = location.longitude;
  }
  return { latitude: latitude, longitude: longitude };
};

export const animateToRegion = (mapRefCurrent, region) => {
  if (mapRefCurrent) {
    mapRefCurrent.animateToRegion(region, 800); // [ms]
  }
};
