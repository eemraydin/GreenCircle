import { addData, fetchData, sendData, updateData, putData } from "./api";
import { getToken } from "./auth";
const preferencesEndpoint = "/preferences";

const getPreferences = async () => {
  try {
    return await fetchData(`${preferencesEndpoint}`);
  } catch (error) {
    console.error("Error fetching all preferences:", error);
    throw error;
  }
};

const createPreferences = async (preferencesData) => {
  try {
    return await sendData(preferencesEndpoint, preferencesData);
  } catch (error) {
    console.error("Error creating preferences:", error);
    throw error;
  }
};

const updatePreferences = async (preferencesData) => {
  try {
    console.log(preferencesData, "this is the new pref");
    const response = await putData(
      preferencesEndpoint,
      null, // No ID needed in the URL
      preferencesData
    );
    console.log(response, "this is the response");
    return response.data;
  } catch (error) {
    console.error("Error updating preferences:", error);
    throw error;
  }
};
export { getPreferences, createPreferences, updatePreferences };
