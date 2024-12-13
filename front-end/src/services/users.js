import apiClient from "../api/api";

export const addUser = async (userData) => {
  const response = await apiClient.post("/users", userData);
  return response.data;
};

export const login = async (loginData) => {
  const response = await apiClient.post("/users/login", loginData);
  return response.data;
};
