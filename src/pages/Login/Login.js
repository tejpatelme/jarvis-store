import "./Login.css";
import { useEffect, useState } from "react";
import { Spinner } from "../../components";
import { useAuth } from "../../contexts";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Login() {
  const { login, isLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("idle");

  const { state } = useLocation();
  const navigate = useNavigate();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => isLoggedIn && navigate("/", { replace: true }), []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginStatus("loading");
    const success = await login(email, password);

    if (success) {
      setLoginStatus("fulfilled");
      navigate(state?.from ? state.from : "/");
    } else {
      setLoginStatus("rejected");
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
            placeholder="•••••••"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            disabled={loginStatus === "loading"}
            type="submit"
            className="btn btn-lg btn-primary"
          >
            {loginStatus === "loading" ? <Spinner /> : "Login"}
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
