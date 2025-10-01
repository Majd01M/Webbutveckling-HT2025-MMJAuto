import axios from "axios";

const API_URL = "http://localhost:5001/api";

// Get Car Models
export const getCarModels = async () => {
  try {
    const res = await axios.get(`${API_URL}/carmodels`);
    return res.data || [];
  } catch (err) {
    console.error("Failed to fetch car models:", err);
    return [];
  }
};

// Get Car Parts
export const getCarParts = async () => {
  try {
    const res = await axios.get(`${API_URL}/carparts`);
    return res.data || [];
  } catch (err) {
    console.error("Failed to fetch car parts:", err);
    return [];
  }
};

// Login User
export const loginUser = async (email, password) => {
  try {
    const res = await axios.post(`${API_URL}/auth/login`, { email, password });
    return res.data;
  } catch (err) {
    console.error("Login failed:", err.response?.data || err.message);
    throw err;
  }
};

// Register User
export const registerUser = async (name, email, password) => {
  try {
    const res = await axios.post(`${API_URL}/auth/register`, { name, email, password });
    return res.data;
  } catch (err) {
    console.error("Registration failed:", err.response?.data || err.message);
    throw err;
  }
};
