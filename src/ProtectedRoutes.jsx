import { Navigate } from "react-router-dom";
import { useAuth } from "./context/Auth";


const ProtectedRoute = ({ children }) => {
    const { token } = useAuth();

    if (!token) {
        return <Navigate to="/signin" />;
    }

    return children;
};

export default ProtectedRoute;