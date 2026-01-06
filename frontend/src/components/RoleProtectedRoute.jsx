import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RoleProtectedRoute = ({ allowedRoles, children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  const escapeReg = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const allowedMatch = Array.isArray(allowedRoles)
    ? allowedRoles.some((r) => {
        try {
          const re = new RegExp(`^${escapeReg(r)}$`, "i");
          return re.test(String(user.role || ""));
        } catch {
          return false;
        }
      })
    : false;

  if (!allowedMatch) {
    return <div style={{ padding: 40 }}>Access denied</div>;
  }

  return children;
};

export default RoleProtectedRoute;
