import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const PrivateRoute = () => {
  const { accessToken, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return accessToken ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
