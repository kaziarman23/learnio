import { useSelector } from "react-redux";
import Loading from "../components/Loading/Loading";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  // states
  const { userEmail, isLoading } = useSelector((state) => state.userSlice);

  if (userEmail) {
    return children;
  }

  if (isLoading) {
    return Loading;
  }
  return <Navigate to="/login"></Navigate>;
};

export default PrivateRoute;
