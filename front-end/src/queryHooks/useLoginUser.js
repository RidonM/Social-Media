import { useMutation } from "@tanstack/react-query";
import { login } from "../services/users";

export function useLoginUser() {
  const {
    isLoading,
    mutate: addLogin,
    error,
  } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      alert("User is loged in");
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return { isLoading, addLogin, error };
}
