import apiClient from "../api/api";

export const getPosts = async () => {
  const response = await apiClient.get("/posts");
  return response.data;
};

export const addPosts = async (postData) => {
  const response = await apiClient.post("/posts", postData);
  return response.data;
};
