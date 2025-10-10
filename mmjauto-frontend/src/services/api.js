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
export const getCarParts = async (searchTerm = "") => {
  try {
    const res = await axios.get(`${API_URL}/carparts`, {
      params: { search: searchTerm },
    });
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

export const createCarPart = async (part) => {
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  const { data } = await axios.post(`${API_URL}/carparts`, part, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const updateCarPart = async (id, part) => {
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  const { data } = await axios.put(`${API_URL}/carparts/${id}`, part, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const deleteCarPart = async (id) => {
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  await axios.delete(`${API_URL}/carparts/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};


// ===== CAR MODELS =====
export const createCarModel = async (model) => {
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  const { data } = await axios.post(`${API_URL}/carmodels`, model, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const updateCarModel = async (id, model) => {
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  const { data } = await axios.put(`${API_URL}/carmodels/${id}`, model, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

// Delete a car model
export const deleteCarModel = async (id) => {
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  await axios.delete(`${API_URL}/carmodels/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};


export const addToWishlist = async (partId, token) => {
  const response = await axios.post(
    `${API_URL}/wishlist/add`,
    { partId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data; // the server can return the updated wishlist
};

export const getWishlist = async (token) => {
  const response = await axios.get(`${API_URL}/wishlist`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data; // should return an array of wishlist items
};

export const removeFromWishlist = async (partId, token) => {
  const res = await axios.post(
    `${API_URL}/wishlist/remove`,
    { carPartId: partId },  // ✅ matches backend now
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data; // updated array of carParts
};