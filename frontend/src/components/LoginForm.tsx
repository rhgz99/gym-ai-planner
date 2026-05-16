import { useForm } from "react-hook-form";
import { Button, Input } from "./ui";
import { Link, useNavigate } from "react-router-dom";
import { loginService } from "../services/authServices";
import type { LoginData } from "../types/auth";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const LoginForm = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginData>({ mode: "onChange" });

  const onSubmit = async (data: LoginData) => {
    const response = await loginService(data);
    reset();
    if (response.success) {
      setUser(response.data.user)
      navigate("/", { replace: true });
    } else {
      setError(response.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 max-w-100 mx-6 mt-8 p-8 pt-10 md:mx-auto border border-border rounded-lg text-"
    >
      <Input
        type="text"
        id="email"
        label="Email"
        placeholder="example@example.com"
        autoComplete="email"
        error={errors.email?.message as string}
        {...register("email", {
          required: "Email is required",
        })}
      />

      <Input
        type="password"
        id="password"
        label="Password"
        placeholder="Password"
        autoComplete="current-password"
        error={errors.password?.message as string}
        {...register("password", {
          required: "Password is required ",
        })}
      />
      <Button>Sign In</Button>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="text-foreground text-center flex justify-center items-center gap-2">
        <p className="text-sm">Don't you have an account?</p>
        <Link
          to="/login"
          className="text-sm text-accent hover:text-accent/80 border-b"
        >
          Sign Up
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
