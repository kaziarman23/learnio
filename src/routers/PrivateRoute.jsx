import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";
import Loading from "../components/Loading/Loading";

const PrivateRoute = ({ children }) => {
  // states
  const { userEmail, isLoading } = useSelector((state) => state.userSlice);
  const location = useLocation();

  // checking for the loggedIn user
  if (userEmail) {
    return children;
  }

  // handle loading
  if (isLoading) {
    return <Loading />;
  }

  // redirect if the user is not loggedIn
  return (
    <Navigate
      to="/login"
      replace
      state={{ from: location.pathname }}
    ></Navigate>
  );
};

export default PrivateRoute;
