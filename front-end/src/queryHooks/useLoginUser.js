import { useMutation } from "@tanstack/react-query";
import { login } from "../services/users";
import { useNavigate } from "react-router-dom";

export function useLoginUser() {
  const navigate = useNavigate();

  const {
    isLoading,
    mutate: addLogin,
    error,
  } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate("/home");
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return { isLoading, addLogin, error };
}
