import { ReactElement } from "react";
import { clsx } from "clsx";

interface ButtonProps {
  variant: "primary" | "secondary";
  text: string;
  startIcon?: ReactElement;
  className?: string;
  onclick?: () => void;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
}

const variantClasses = {
  primary: "bg-purple-600 text-white",
  secondary: "bg-purple-200 text-purple-600",
};

const defaultStyles =
  "px-2 py-2 rounded-md font-light flex items-center justify-center max-h-12";

export const Button = ({
  variant,
  text,
  startIcon,
  className,
  onclick,
  loading,
  type = "button",
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onclick}
      className={clsx(
        variantClasses[variant],
        defaultStyles,
        loading ? "disabled opacity-30" : "",
        className
      )}
    >
      <div className="pr-2">{startIcon}</div>
      {text}
    </button>
  );
};
