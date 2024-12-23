import { useMutation, useQueryClient } from "@tanstack/react-query";
import { unLikePost } from "../services/likes";

export function useUnLikePost() {
  const queryClient = useQueryClient();

  const { isLoading: load, mutate: unLike } = useMutation({
    mutationFn: ({ userId, postId }) => unLikePost(userId, postId),
    onSuccess: () => {
      queryClient.invalidateQueries(["unlike"]);
    },
    onError: (err) => {
      console.error("Error unliking post: ", err);
    },
  });
  return { load, unLike };
}
