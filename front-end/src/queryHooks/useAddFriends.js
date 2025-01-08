import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFriend } from "../services/friends";

export function useAddFriends() {
  const queryClient = useQueryClient();

  const {
    isLoading,
    mutate: addFriends,
    error,
  } = useMutation({
    mutationFn: addFriend,
    mutationKey: ["friend"],
    onSuccess: () => {
      queryClient.invalidateQueries(["friends"]);
    },
  });
  return { isLoading, addFriends, error };
}
