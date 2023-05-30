import { Navigate } from "react-router-dom";


const isAuthenticated = () => {
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

