import { useEffect, useState } from "react";
import { useAuth } from "../../contexts";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signUpStatus, setSignUpSatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { signUp, isLoggedIn } = useAuth();
  const { state } = useLocation();
  const navigate = useNavigate();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => isLoggedIn && navigate("/"), [isLoggedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setSignUpSatus("failed");
      setErrorMessage("Passwords don't match");
      return;
    }

    if (password === confirmPassword) {
      const success = await signUp(email, password);

      success && navigate(state?.from ? state.from : "/");
    }
  };
  return (
    <div className="form-wrapper">
      <div className="form-container">
        <h2 className="form-title">Sign Up</h2>
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
          <div className="form-subtitle">Confirm Password</div>
          <input
            value={confirmPassword}
            type="password"
            className="input"
            placeholder="•••••••"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {signUpStatus === "failed" && (
            <div className="alert error">
              <svg width="20px" height="20px" viewBox="0 0 24 24">
                <path d="M13 13h-2V7h2m0 10h-2v-2h2M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2z"></path>
              </svg>
              {errorMessage}
            </div>
          )}
          <button type="submit" className="btn btn-lg btn-primary">
            Sign Up
          </button>
        </form>
        <p>
          Already have an account?{" "}
          <Link to="/login">
            <span className="signup-link">Login</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
