import { useForm } from "react-hook-form";
import { Button, Input } from "./ui";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });
  return (
    <form className="flex flex-col gap-6 max-w-100 mx-6 mt-8 p-8 md:mx-auto border border-border rounded-lg text-">
      <Input
        type="text"
        id="email"
        label="Email"
        placeholder="example@example.com"
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
        error={errors.password?.message as string}
        {...register("password", {
          required: "Password is required ",
          pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
            message: 'Password must include uppercase, lowercase, number, and special character'
          },
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters'
          },
          maxLength: {
            value: 20,
            message: "Password must be no longer than 20 characters"
          }
        })}
      />
      <Button>Sign Up</Button>
      <div className="text-foreground text-center flex justify-center items-center gap-2">
        <p className="text-sm">Already have an account?</p>
        <Link to="/login" className="text-sm text-accent hover:text-accent/80 border-b">Sign In</Link>
      </div>
    </form>
  );
};

export default RegisterForm;
