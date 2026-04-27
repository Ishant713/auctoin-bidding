import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({ component: Component }) => {
  const location = useLocation();

  const hasCookie = document.cookie.includes("jwt=");

  return hasCookie ? (
    <Component />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
ProtectedRoute.propTypes = {
	component: PropTypes.elementType.isRequired,
};

export default ProtectedRoute;
