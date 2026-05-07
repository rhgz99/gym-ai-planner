import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
}

export const Input = ({
  id,
  label,
  error,
  className = "",
  ...props
}: InputProps) => {
  "";

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-foreground">
        {label}
      </label>
      <input
        id={id}
        className={`bg-foreground text-background  rounded-lg py-2 px-4 outline-accent focus:outline-2 ${className}`}
        {...props}
      />
      {error && <p className="text-red-500 text-xs pl-2">{error}</p>}
    </div>
  );
};
