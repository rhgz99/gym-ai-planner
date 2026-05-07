import { Link } from "react-router-dom";
import { Button } from "./ui";
import Logo from "../assets/logo.svg?react";

const Navbar = () => {
  const userLogin = false;

  return (
    <header className="w-full fixed top-0 left-0 bg-background/80 backdrop-blur-md border-b border-border z-10">
      <div className="flex justify-between items-center h-16 px-6 mx-auto max-w-7xl">
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
          {userLogin ? (
            <>
              <Link to="/logout">
                <Button variant="secondary" >Sign Out</Button>
              </Link>
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
