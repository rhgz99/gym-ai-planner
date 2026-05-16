import { useForm, useWatch } from "react-hook-form";
import { Button, Input } from "./ui";
import { Link, useNavigate } from "react-router-dom";
import { registerService } from "../services/authServices";
import type { RegisterData } from "../types/auth";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { setUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<RegisterData>({ mode: "onChange" });

  const password = useWatch({
    control,
    name: "password",
  });

  const onSubmit = async (data: RegisterData) => {
    const response = await registerService(data);
    reset();

    if (response.success) {
      setUser(response.data.user);
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
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Please enter a valid email address",
          },
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
          pattern: {
            value:
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
            message:
              "Password must include uppercase, lowercase, number, and special character",
          },
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters",
          },
          maxLength: {
            value: 20,
            message: "Password must be no longer than 20 characters",
          },
        })}
      />
      <Input
        type="password"
        id="confirmPassword"
        label="Confirm Password"
        placeholder="Confirm Password"
        error={errors.confirmPassword?.message as string}
        {...register("confirmPassword", {
          required: "Please confirm your password ",
          validate: (value) => value === password || "Password do not match",
        })}
      />
      <Button>Sign Up</Button>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="text-foreground text-center flex justify-center items-center gap-2">
        <p className="text-sm">Already have an account?</p>
        <Link
          to="/login"
          className="text-sm text-accent hover:text-accent/80 border-b"
        >
          Sign In
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
