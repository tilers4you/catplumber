import type { ComponentPropsWithoutRef } from "react";

interface InputProps extends Omit<ComponentPropsWithoutRef<"input">, "id"> {
  label: string;
  name: string;
  error?: string;
  hint?: string;
}

export function Input({
  label,
  name,
  error,
  hint,
  required,
  className = "",
  type = "text",
  ...rest
}: InputProps) {
  const inputId = `input-${name}`;
  const errorId = `${inputId}-error`;
  const hintId = `${inputId}-hint`;

  const describedBy = [error ? errorId : null, hint ? hintId : null]
    .filter(Boolean)
    .join(" ") || undefined;

  const inputClasses = [
    "block w-full rounded-lg border px-4 py-2.5 text-[#2D3436] text-sm",
    "placeholder:text-gray-400",
    "transition-colors duration-150",
    "focus:outline-none focus:ring-2 focus:ring-offset-0",
    error
      ? "border-[#E74C3C] focus:ring-[#E74C3C]/30 focus:border-[#E74C3C] bg-red-50/30"
      : "border-gray-300 focus:ring-[#1B5E8A]/30 focus:border-[#1B5E8A] bg-white",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={inputId}
        className="text-sm font-medium text-[#2D3436]"
      >
        {label}
        {required && (
          <span className="ml-1 text-[#E74C3C]" aria-hidden="true">
            *
          </span>
        )}
      </label>

      <input
        id={inputId}
        name={name}
        type={type}
        required={required}
        aria-required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={inputClasses}
        {...rest}
      />

      {hint && !error && (
        <p id={hintId} className="text-xs text-gray-500">
          {hint}
        </p>
      )}

      {error && (
        <p
          id={errorId}
          role="alert"
          className="text-xs font-medium text-[#E74C3C] flex items-center gap-1"
        >
          <svg
            className="w-3.5 h-3.5 shrink-0"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 11a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm.75-4.5a.75.75 0 0 1-1.5 0v-3a.75.75 0 0 1 1.5 0v3z" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
