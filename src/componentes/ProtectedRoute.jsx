import { Navigate } from "react-router-dom";
import useStore from "../store";

function ProtectedRoute({ children }) {
  const token = useStore((state) => state.token);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
