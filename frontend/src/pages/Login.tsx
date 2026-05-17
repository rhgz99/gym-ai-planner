import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import LoginForm from "../components/LoginForm";

const Login = () => {
  const { user, loading} = useAuth();

  if (user && !loading) {
    return <Navigate to="/profile" replace />;
  }
  return (
    <section>
      <LoginForm />
    </section>
  );
};

export default Login;
