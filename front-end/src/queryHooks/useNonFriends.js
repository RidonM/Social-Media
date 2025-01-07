import { useQuery } from "@tanstack/react-query";
import { getNonFriends } from "../services/users";

export function useNonFriends() {
  const {
    isLoading,
    data: users,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getNonFriends,
  });
  return { isLoading, users, error };
}
