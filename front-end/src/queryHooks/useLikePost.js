import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likePost } from "../services/likes";
import toast from "react-hot-toast";

export function useLikePost() {
  const queryClient = useQueryClient();

  const {
    isLoading: loading,
    mutate: like,
    error: errors,
  } = useMutation({
    mutationFn: likePost,
    onSuccess: () => {
      toast.success("Post Liked");
      queryClient.invalidateQueries("likes");
    },
    onError: (err) => {
      console.log("Error adding likes", err);
    },
  });
  return { loading, like, errors };
}
