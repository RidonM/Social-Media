import apiClient from "../api/api";

export const likePost = async (data) => {
  const response = await apiClient.post("/likes", data);
  return response.data;
};

export const unLikePost = async (userId, postId) => {
  const response = await apiClient.delete(
    `/likes?userId=${userId}&postId=${postId}`
  );
  return response.data;
};
