import apiClient from "../api/api";

export const addFriend = async (friend) => {
  const response = await apiClient.post("/friends/send", friend);
  return response.data;
};

export const acceptFriendRequest = async (accept) => {
  const response = await apiClient.put("/friends/accept", accept);
  return response.data;
};

export const declineFriendRequest = async (decline) => {
  const response = await apiClient.put("/friends/decline", decline);
  return response.data;
};
