import clsx from "clsx";
import { forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  type: "text" | "password";
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { placeholder, type, className = "", ...rest } = props;

  return (
    <div>
      <input
        ref={ref}
        type={type}
        className={clsx("py-2 border  rounded-lg my-2 px-4", className)}
        placeholder={placeholder}
        {...rest}
      />
    </div>
  );
});
