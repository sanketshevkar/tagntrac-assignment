import { Navigate } from "react-router-dom";


const isAuthenticated = () => {
    // Add your authentication logic here
    // For example, check if the user is logged in or if the JWT is valid
    // Return true if authenticated, false otherwise
    const storedToken = localStorage.getItem("token");
    if (!storedToken) return false;
    else return true;
  };

const PrivateRoute = ({ element }: any) => {
    return isAuthenticated() ? (
        element
        ) : (
        <Navigate to="/login" replace={true} />
        );
};

export default PrivateRoute;

