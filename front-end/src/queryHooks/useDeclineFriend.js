import { useMutation, useQueryClient } from "@tanstack/react-query";
import { declineFriendRequest } from "../services/friends";
import toast from "react-hot-toast";

export function useDeclineFriends() {
  const queryClient = useQueryClient();

  const {
    isLoading: declining,
    mutate: declineFriend,
    error,
  } = useMutation({
    mutationFn: declineFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries(["decline"]);
      toast.success("Friend Request Declined");
    },
  });
  return { declining, declineFriend, error };
}
