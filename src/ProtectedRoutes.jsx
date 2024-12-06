import { Navigate } from "react-router-dom";
import { useAuth } from "./context/Auth";


const ProtectedRoute = ({ children }) => {
    const { contextValue } = useAuth();
    const { token } = contextValue;



    if (!token) {
        return <Navigate to="/signin" />;
    }

    return children;
};

export default ProtectedRoute;