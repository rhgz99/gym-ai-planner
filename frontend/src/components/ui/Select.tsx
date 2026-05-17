import type { SelectHTMLAttributes } from "react";

type SelectOptions = {
  value: string;
  option: string;
};

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  id: string;
  error?: string;
  options: SelectOptions[];
}

export const Select = ({
  id,
  label,
  options,
  error,
  className = "",
  ...props
}: SelectProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-semibold">
        {label}
      </label>
      <select
        id={id}
        className={`bg-foreground text-background  rounded-lg py-3 px-4 outline-accent focus:outline-2 ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option className="hover:bg-accent" value={option.value}>
            {option.option}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs pl-2">{error}</p>}
    </div>
  );
};
