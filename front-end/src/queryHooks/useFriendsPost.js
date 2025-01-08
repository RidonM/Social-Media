import { useQuery } from "@tanstack/react-query";
import { getFriendsPost } from "../services/posts";

export function useFriendsPost() {
  const {
    isLoading,
    data: posts,
    error,
  } = useQuery({
    queryFn: getFriendsPost,
    queryKey: ["friendsPost"],
  });
  return { isLoading, posts, error };
}
