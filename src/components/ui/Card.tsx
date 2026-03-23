import type { ComponentPropsWithoutRef } from "react";

interface CardProps extends ComponentPropsWithoutRef<"div"> {
  hover?: boolean;
  className?: string;
}

export function Card({ children, hover = false, className = "", ...rest }: CardProps) {
  const classes = [
    "bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden",
    hover
      ? "transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-pointer"
      : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
}
