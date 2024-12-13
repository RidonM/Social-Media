import { useForm } from "react-hook-form";
import { useLoginUser } from "../queryHooks/useLogInUser";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { isLoading, addLogin, error } = useLoginUser();

  function onSubmit(data) {
    addLogin(data);
  }

  return (
    <div className="auth-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button disabled={isLoading} type="submit">
          {isLoading ? "..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
