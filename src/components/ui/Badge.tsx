import type { ComponentPropsWithoutRef } from "react";

type BadgeVariant = "default" | "success" | "warning" | "emergency";

interface BadgeProps extends ComponentPropsWithoutRef<"span"> {
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default:
    "bg-[#1B5E8A]/10 text-[#1B5E8A] border border-[#1B5E8A]/20",
  success:
    "bg-emerald-50 text-emerald-700 border border-emerald-200",
  warning:
    "bg-amber-50 text-amber-700 border border-amber-200",
  emergency:
    "bg-[#E74C3C]/10 text-[#E74C3C] border border-[#E74C3C]/20",
};

export function Badge({
  children,
  variant = "default",
  className = "",
  ...rest
}: BadgeProps) {
  const classes = [
    "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap",
    variantClasses[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes} {...rest}>
      {children}
    </span>
  );
}
