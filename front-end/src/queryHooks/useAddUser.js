import { useMutation } from "@tanstack/react-query";
import { addUser } from "../services/users";

export function useAddUser() {
  const {
    isLoading,
    mutate: registerUser,
    error,
  } = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      console.log("Succes");
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return { isLoading, registerUser, error };
}
