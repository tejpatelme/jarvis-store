import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../contexts";

export default function PrivateRoute({ path, ...props }) {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? (
    <Route path={path} {...props} />
  ) : (
    <Navigate state={{ from: path }} replace to="/login" />
  );
}