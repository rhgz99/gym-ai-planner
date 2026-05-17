import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui";
import Logo from "../assets/logo.svg?react";
import { useAuth } from "../hooks/useAuth";
import { logoutService } from "../services/authServices";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const handleLogOut = async () => {
    const response = await logoutService();
    if (response.success) {
      setUser(null);
      navigate("/", { replace: true });
    }
  };

  return (
    <header className="w-full fixed top-0 left-0 bg-background/80 backdrop-blur-md border-b border-border z-10">
      <div className="flex justify-between items-center h-20 px-6 mx-auto max-w-7xl">
        <Link
          to="/"
          className="group flex justify-between items-center gap-1  duration-500 ease-in"
        >
          <span className="font-bold text-lg text-foreground group-hover:text-primary">
            GymFlowAI
          </span>

          <Logo className="size-8 text-primary group-hover:text-foreground" />
        </Link>
        <nav className="flex gap-4 ">
          {user ? (
            <>
              <Button variant="secondary" onClick={() => handleLogOut()}>
                Sign Out
              </Button>

              <Link to="/profile">
                <Button>My plan</Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="secondary">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
