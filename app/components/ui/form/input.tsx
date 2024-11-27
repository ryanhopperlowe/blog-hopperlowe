import { ComponentProps } from "react";

type InputProps = ComponentProps<"input"> & {
  label: string;
  error?: string;
};

export function Input({
  name,
  label,
  type = "text",
  error,
  className = "input input-bordered",
  ...props
}: InputProps) {
  return (
    <p className="form-control">
      <label className="label" htmlFor={name}>
        {label}
      </label>
      <input type={type} name={name} className={className} {...props} />

      {error && <em className="text-error">{error}</em>}
    </p>
  );
}
