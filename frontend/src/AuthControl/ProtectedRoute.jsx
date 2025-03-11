import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ allowedRoles }) => {
  const userDetails = useSelector((state) => state.userReducer.userDetails);
  
  if (!userDetails?.role) {
    return <Navigate to="/login" replace />; // Redirect if not logged in
  }
  // eslint-disable-next-line react/prop-types
  if (!allowedRoles.includes(userDetails.role)) {
    return <Navigate to="/" replace />; // Redirect if role not authorized
  }

  return <Outlet />; // Render the requested route
};

export default ProtectedRoute;
