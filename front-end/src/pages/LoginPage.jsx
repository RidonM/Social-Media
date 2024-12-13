import { useLocation, useNavigate } from "react-router-dom";
import LoginForm from "../components/LogIn";

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

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
