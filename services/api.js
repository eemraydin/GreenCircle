import axios from "axios";
import { getToken } from "./auth";
import apiConfig from "./apiConfig";

const API_URL = apiConfig.API_URL;

const fetchData = async (endpoint, params = {}) => {
  try {
    const token = await getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await axios.get(`${API_URL}${endpoint}`, {
      headers,
      params,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      console.error(
        `Error fetching ${endpoint}:`,
        response.status,
        response.statusText
      );
      throw new Error(`Error fetching ${endpoint}: ${response.statusText}`);
    }
  } catch (error) {
    console.error(`An error occurred while fetching ${endpoint}:`, error);
    throw error;
  }
};

// const fetchData = async (endpoint, id = null) => {
//   try {
//     const token = await getToken();
//     const headers = token ? { Authorization: `Bearer ${token}` } : {};
//     const response = await axios.get(`${API_URL}${endpoint}`, { headers });

//     if (response.status === 200) {
//       return response.data;
//     } else {
//       console.error(
//         `Error fetching ${endpoint}:`,
//         response.status,
//         response.statusText
//       );
//       throw new Error(`Error fetching ${endpoint}: ${response.statusText}`);
//     }
//   } catch (error) {
//     console.error(`An error occurred while fetching ${endpoint}:`, error);
//     throw error;
//   }
// };

const sendData = async (endpoint, data) => {
  try {
    const token = await getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await axios.post(`${API_URL}${endpoint}`, data, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error(`Error sending ${endpoint}:`, error);
    throw error;
  }
};

const updateData = async (endpoint, id = null, data = null) => {
  try {
    const token = await getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const url = id ? `${API_URL}${endpoint}/${id}` : `${API_URL}${endpoint}`;
    const response = await axios.patch(url, data, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error updating ${endpoint} with id ${id}:`, error);
    throw error;
  }
};
const putData = async (endpoint, id = null, data = null) => {
  try {
    const token = await getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const url = id ? `${API_URL}${endpoint}/${id}` : `${API_URL}${endpoint}`;
    const response = await axios.put(url, data, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error updating ${endpoint} with id ${id}:`, error);
    throw error;
  }
};

const addData = async (endpoint, data) => {
  try {
    const token = await getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await axios.put(`${API_URL}${endpoint}`, data, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error(`Error adding data to ${endpoint}:`, error);
    throw error;
  }
};

const deleteData = async (endpoint, id) => {
  try {
    const token = await getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await axios.delete(`${API_URL}${endpoint}/${id}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error(`Error deleting ${endpoint} with id ${id}:`, error);
    throw error;
  }
};

export { fetchData, sendData, updateData, deleteData, addData, putData };
