import { Navigate } from "react-router-dom";
import { useAuth } from "./context/Auth";
import Header from "./components/Header/Header";

const ProtectedRoute = ({ children }) => {
  const { contextValue } = useAuth();
  const { token } = contextValue;
  console.log("token from protected route", token);

  if (!token) {
    return <Navigate to="/signin" />;
  }

  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default ProtectedRoute;
