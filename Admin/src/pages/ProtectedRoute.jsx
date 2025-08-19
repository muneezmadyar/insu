import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // seconds

    // 🔴 Token expired hai
    if (decoded.exp < currentTime) {
      localStorage.removeItem("adminToken");
      return <Navigate to="/" replace />;
    }

    // ✅ Token valid hai
    return children;
  } catch (error) {
    localStorage.removeItem("adminToken");
    return <Navigate to="/" replace />;
  }
};

export default ProtectedRoute;
