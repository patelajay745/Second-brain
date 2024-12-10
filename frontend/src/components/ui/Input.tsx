import { forwardRef } from "react";

interface InputProps {
  placeholder?: string;
  type: "text" | "password";
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { placeholder, type, ...rest } = props;

  return (
    <div>
      <input
        ref={ref}
        type={type}
        className="py-2 border border-black rounded my-2 px-4"
        placeholder={placeholder}
        {...rest}
      />
    </div>
  );
});
