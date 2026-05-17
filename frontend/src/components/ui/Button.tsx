import { type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent";
}

export const Button = ({
  className = "",
  variant = "primary",
  children,
  ...props
}: ButtonProps) => {
  const baseStyles =
    "rounded-lg px-5 py-3 font-bold  duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed text-foreground";

  const variants = {
    primary: "bg-primary hover:bg-primary-hover active:bg-primary-active",
    secondary:
      "bg-secondary hover:bg-secondary-hover active:bg-secondary-active",
    accent: "bg-accent",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
