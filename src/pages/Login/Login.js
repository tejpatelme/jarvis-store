import "./Login.css";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Login() {
  const { login, isLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { state } = useLocation();
  const navigate = useNavigate();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => isLoggedIn && navigate("/", { replace: true }), []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);

    if (success) {
      setLoginStatus("success");
      setErrorMessage("");
      navigate(state?.from ? state.from : "/");
    } else {
      setLoginStatus("failed");
      setErrorMessage(errorMessage);
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <h2 className="form-title">Login</h2>
        <div className="form-subtitle">Email</div>
        <form onSubmit={handleSubmit}>
          <input
            value={email}
            className="input"
            type="email"
            placeholder="johndoe@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="form-subtitle">Password</div>
          <input
            value={password}
            type="password"
            className="input"
            placeholder="*******"
            onChange={(e) => setPassword(e.target.value)}
          />
          {loginStatus === "failed" && (
            <div className="alert error">
              <svg width="20px" height="20px" viewBox="0 0 24 24">
                <path d="M13 13h-2V7h2m0 10h-2v-2h2M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2z"></path>
              </svg>
              {errorMessage}
            </div>
          )}
          <button type="submit" className="btn btn-lg btn-primary">
            Login
          </button>
        </form>
        <p>
          Don't have an account?{" "}
          <Link to="/signup">
            <span className="signup-link">Sign Up</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
