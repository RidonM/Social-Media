import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePosts } from "../services/posts";
import toast from "react-hot-toast";

export function useDeletePosts() {
  const queryClient = useQueryClient();

  const {
    mutate: deletePost,
    isLoading,
    error,
  } = useMutation({
    mutationFn: deletePosts,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      toast.success("Post deleted successfully");
    },
    onError: (err) => {
      console.error("Error deleting post: ", err);
    },
  });
  return { deletePost, isLoading, error };
}
