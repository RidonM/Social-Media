import { useQuery } from "@tanstack/react-query";
import { getRequestedFriends } from "../services/users";

export function useRequestFriends() {
  const {
    isLoading,
    data: requestedFriends,
    error,
  } = useQuery({
    queryFn: getRequestedFriends,
    queryKey: ["request"],
  });
  return { isLoading, requestedFriends, error };
}
