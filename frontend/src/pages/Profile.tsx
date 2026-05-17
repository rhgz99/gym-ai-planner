import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Profile = () => {
  const { user, loading } = useAuth();
  const plan = false;

  if (!user && !loading) {
    return <Navigate to="/login" replace />;
  }

  if (!plan) {
    return <Navigate to="/Onboarding" replace />;
  }
  return <>Profile Page</>;
};

export default Profile;
