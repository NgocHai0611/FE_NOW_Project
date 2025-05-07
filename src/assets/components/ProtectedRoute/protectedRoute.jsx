// protectedRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../AuthUtils/AuthContexts";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  // Nếu chưa xác định được user (null), có thể render loading
  if (user === undefined) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
