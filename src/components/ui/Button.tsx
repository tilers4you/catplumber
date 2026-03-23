import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "secondary" | "emergency";
type Size = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  "aria-label"?: string;
}

interface ButtonAsButtonProps
  extends ButtonBaseProps,
    Omit<ComponentPropsWithoutRef<"button">, keyof ButtonBaseProps | "href"> {
  href?: undefined;
}

interface ButtonAsLinkProps
  extends ButtonBaseProps,
    Omit<ComponentPropsWithoutRef<"a">, keyof ButtonBaseProps | "href"> {
  href: string;
}

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-[#D4782F] text-white border-2 border-[#D4782F] hover:bg-[#b8601f] hover:border-[#b8601f] focus-visible:outline-[#D4782F]",
  secondary:
    "bg-transparent text-[#1B5E8A] border-2 border-[#1B5E8A] hover:bg-[#1B5E8A] hover:text-white focus-visible:outline-[#1B5E8A]",
  emergency:
    "bg-[#E74C3C] text-white border-2 border-[#E74C3C] hover:bg-[#c0392b] hover:border-[#c0392b] focus-visible:outline-[#E74C3C]",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm rounded-md",
  md: "px-5 py-2.5 text-base rounded-lg",
  lg: "px-7 py-3.5 text-lg rounded-xl",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none select-none";

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    className = "",
    children,
    ...rest
  } = props;

  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if ("href" in props && props.href !== undefined) {
    const { href, ...linkRest } = rest as ButtonAsLinkProps;
    return (
      <Link href={href} className={classes} {...linkRest}>
        {children}
      </Link>
    );
  }

  const { ...buttonRest } = rest as ButtonAsButtonProps;
  return (
    <button className={classes} {...buttonRest}>
      {children}
    </button>
  );
}
