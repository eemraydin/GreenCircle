import { fetchData, sendData, updateData } from "./api";

const locationsEndpoint = "/locations";

const getAllLocations = async () => {
  try {
    return await fetchData(locationsEndpoint);
  } catch (error) {
    console.error("Error fetching all locations:", error);
    throw error;
  }
};

const getLocationById = async (locationId) => {
  try {
    const endpoint = `${locationsEndpoint}/${locationId}`;
    return await fetchData(endpoint, {});
  } catch (error) {
    console.error(`Error fetching location ${locationId}:`, error);
    throw error;
  }
};

const createLocation = async (locationData) => {
  try {
    const endpoint = `${locationsEndpoint}/${locationData}`;
    return await sendData(endpoint, {});
  } catch (error) {
    console.error("Error creating location:", error);
    throw error;
  }
};

const updateLocation = async (locationId, locationData) => {
  try {
    const endpoint = `${locationsEndpoint}/${locationId}`;
    return await updateData(endpoint, null, { locationData });
  } catch (error) {
    console.error(`Error updating location ${locationId}:`, error);
    throw error;
  }
};

export { getAllLocations, getLocationById, createLocation, updateLocation };
