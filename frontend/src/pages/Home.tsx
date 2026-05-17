import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Home = () => {
  const { user, loading } = useAuth();

  if (user && !loading) {
    return <Navigate to="/profile" replace />;
  }
  return <>Home Page</>;
};

export default Home;
