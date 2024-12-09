import { ReactElement } from "react";
import { clsx } from "clsx";

interface ButtonProps {
  variant: "primary" | "secondary";
  text: string;
  startIcon?: ReactElement;
  className?: string;
  onclick?: () => void;
}

const variantClasses = {
  primary: "bg-purple-600 text-white",
  secondary: "bg-purple-200 text-purple-600",
};

const defaultStyles =
  "px-2 py-2 rounded-md font-light flex items-center max-h-12";

export const Button = ({
  variant,
  text,
  startIcon,
  className,
  onclick,
}: ButtonProps) => {
  return (
    <button
      onClick={onclick}
      className={clsx(variantClasses[variant], defaultStyles, className)}
    >
      <div className="pr-2">{startIcon}</div>
      {text}
    </button>
  );
};
