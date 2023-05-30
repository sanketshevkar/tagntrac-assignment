import { Navigate } from "react-router-dom";


const PrivateRoute = ({ setIsLoggedIn, element }: any) => {
  const isAuthenticated = () => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken){
      setIsLoggedIn(false);
      return false;
    }
    else {
      setIsLoggedIn(true);
      return true
    }
  };

  return isAuthenticated() ? (
      element
      ) : (
      <Navigate to="/login" replace={true} />
      );
};

export default PrivateRoute;

