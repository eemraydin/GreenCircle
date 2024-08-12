import axios from "axios";
import * as SecureStore from "expo-secure-store";
import apiConfig from "./apiConfig";

const API_URL = apiConfig.API_URL;

const JWT_KEY = "my_secret_key";

export const setToken = async (token) => {
  try {
    await SecureStore.setItemAsync(JWT_KEY, token);
    axios.defaults.headers.common["x-access-token"] = `${token}`;
  } catch (error) {
    console.error("An error occurred while setting the token.", error);
    throw error;
  }
};

export const getToken = async () => {
  try {
    const token = await SecureStore.getItemAsync(JWT_KEY);
    if (token) {
      axios.defaults.headers.common["x-access-token"] = `${token}`;
    }

    return token;
  } catch (error) {
    console.error("An error occurred while getting the token.", error);
    throw error;
  }
};

export const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(JWT_KEY);
    delete axios.defaults.headers.common["x-access-token"];
  } catch (error) {
    console.error("An error occurred while removing the token.", error);
    throw error;
  }
};

// export const login = async (email, password) => {
//   try {
//     const response = await axios.post(`${API_URL}/signin`, { email, password });
//     const { token } = response.data;
//     await setToken(token);
//     return response;
//   } catch (error) {
//     console.error("An error occurred during login.", error);
//     if (error.response) {
//       throw new Error(error.response.data.message || "Login failed");
//     } else if (error.request) {
//       throw new Error("No response from server");
//     } else {
//       throw new Error("Request failed");
//     }
//   }
// };

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/signin`, { email, password });
    const { token, user } = response.data;
    await setToken(token);

    await SecureStore.setItemAsync("user", JSON.stringify(user));

    return response;
  } catch (error) {
    console.error("An error occurred during login.", error);
    if (error.response) {
      throw new Error(error.response.data.message || "Login failed");
    } else if (error.request) {
      throw new Error("No response from server");
    } else {
      throw new Error("Request failed");
    }
  }
};

export const register = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, {
      name,
      email,
      password,
    });
    return response;
  } catch (error) {
    console.error("An error occurred during registration.", error);
    if (error.response) {
      throw new Error(error.response.data.message || "Registration failed");
    } else if (error.request) {
      throw new Error("No response from server");
    } else {
      throw new Error("Request failed");
    }
  }
};

export const getUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/user/info`);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("An error occurred while fetching the user.", error);
    if (error.response) {
      throw new Error(error.response.data.message || "Failed to fetch user");
    } else if (error.request) {
      throw new Error("No response from server");
    } else {
      throw new Error("Request failed");
    }
  }
};

export const updateUser = async (name, password) => {
  try {
    const updates = {};
    if (name) updates.name = name;
    if (password) updates.password = password;

    const response = await axios.put(`${API_URL}/user`, updates);
    return response.data;
  } catch (error) {
    console.error("An error occurred while updating the user.", error);
    if (error.response) {
      throw new Error(error.response.data.message || "Failed to update user");
    } else if (error.request) {
      throw new Error("No response from server");
    } else {
      throw new Error("Request failed");
    }
  }
};
