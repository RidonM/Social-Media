import { useMutation } from "@tanstack/react-query";
import { addPosts } from "../services/posts";
import toast from "react-hot-toast";

export function useAddPosts() {
  const {
    isLoading,
    mutate: addPost,
    error,
  } = useMutation({
    mutationFn: addPosts,
    onSuccess: () => {
      toast.success("Post added succesfully");
    },
    onError: (err) => {
      console.log("Cannot add a post: ", err);
    },
  });
  return { isLoading, addPost, error };
}
