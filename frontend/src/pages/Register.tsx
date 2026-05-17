import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import RegisterForm from "../components/RegisterForm";

const Register = () => {
  const { user, loading } = useAuth();

  if (user && !loading) {
    return <Navigate to="/profile" replace />;
  }

  return (
    <section>
      <RegisterForm />
    </section>
  );
};

export default Register;
