import { useLocation, useNavigate } from "react-router-dom";
import LoginForm from "../components/LogIn";
import { useEffect } from "react";

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  return (
    <div className="auth-container">
      <div className="auth-buttons">
        <button
          className={location.pathname === "/" ? "active" : ""}
          onClick={() => navigate("/")}
        >
          Login
        </button>
        <button
          className={location.pathname === "/signup" ? "active" : ""}
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </button>
      </div>

      <LoginForm />
    </div>
  );
}

export default LoginPage;
