import { useMutation, useQueryClient } from "@tanstack/react-query";
import { acceptFriendRequest } from "../services/friends";
import toast from "react-hot-toast";

export function useAcceptFriends() {
  const queryClient = useQueryClient();

  const {
    isLoading,
    mutate: acceptFriend,
    error,
  } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries(["accept"]);
      toast.success("Friend Request Accepted");
    },
  });
  return { isLoading, acceptFriend, error };
}
