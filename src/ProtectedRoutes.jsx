import { Navigate } from "react-router-dom";
import { useAuth } from "./context/Auth";


const ProtectedRoute = ({ children }) => {
    const { contextValue } = useAuth();
    const { token } = contextValue;
    console.log('token from protected route', token);


    if (!token) {
        return <Navigate to="/signin" />;
    }

    return children;
};

export default ProtectedRoute;