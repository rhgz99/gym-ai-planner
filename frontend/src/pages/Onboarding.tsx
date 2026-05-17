import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Questionnaire from "../components/Questionnaire";

const Onboarding = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={"/login"} replace />;
  }

  return <Questionnaire />;
};

export default Onboarding;
