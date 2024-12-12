import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAddUser } from "../queryHooks/useAddUser";

function Authentication() {
  const [activeForm, setActiveForm] = useState("login");

  return (
    <div className="auth-container">
      <div className="auth-buttons">
        <button
          className={activeForm === "login" ? "active" : ""}
          onClick={() => setActiveForm("login")}
        >
          Login
        </button>
        <button
          className={activeForm === "signup" ? "active" : ""}
          onClick={() => setActiveForm("signup")}
        >
          Sign Up
        </button>
      </div>

      {activeForm === "login" && <LoginForm />}
      {activeForm === "signup" && <SignUpForm />}
    </div>
  );
}

function LoginForm() {
  return (
    <div className="auth-form">
      <h2>Login</h2>
      <form>
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { isLoading, registerUser, error } = useAddUser();

  function onSubmit(data) {
    registerUser(data);
  }

  return (
    <div className="auth-form">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="text"
            placeholder="Name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <span>{errors.name.message}</span>}
        </div>

        <div>
          <input
            type="text"
            placeholder="Surname"
            {...register("surname", { required: "Surname is required" })}
          />
          {errors.surname && <span>{errors.surname.message}</span>}
        </div>

        <div>
          <input
            type="text"
            placeholder="Username"
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && <span>{errors.username.message}</span>}
        </div>

        <div>
          <input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && <span>{errors.email.message}</span>}
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
          {errors.password && <span>{errors.password.message}</span>}
        </div>

        <button disabled={isLoading} type="submit">
          {isLoading ? "..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

export default Authentication;
