import { getLocationById } from "../services/locationsAPI";
import { images } from "../constants/images";

const getImageForLocation = async (locationId) => {
  try {
    const location = await getLocationById(locationId);
    const locationName = location.name;

    switch (locationName) {
      case "Stanley Park":
      case "Central Park":
      case "Burnaby Lake Regional Park":
      case "Mcdonald Beach Park":
      case "Pacific Spirit Regional Park":
      case "Charleston Park":
      case "Burnaby Mountain Park":
        return images.park;
      case "Jericho Beach":
      case "Kitsilano Beach":
      case "Wreck Beach":
        return images.beach;
      // Add more cases for other location names as needed
      default:
        return images.beach; 
    }
  } catch (error) {
    console.error(`Error getting image for location ${locationId}:`, error);
    throw error;
  }
};

export { getImageForLocation };
