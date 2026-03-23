import type { ComponentPropsWithoutRef } from "react";

interface TextareaProps
  extends Omit<ComponentPropsWithoutRef<"textarea">, "id"> {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  maxLength?: number;
  currentLength?: number;
}

export function Textarea({
  label,
  name,
  error,
  hint,
  maxLength,
  currentLength,
  required,
  className = "",
  rows = 4,
  ...rest
}: TextareaProps) {
  const textareaId = `textarea-${name}`;
  const errorId = `${textareaId}-error`;
  const hintId = `${textareaId}-hint`;
  const counterId = `${textareaId}-counter`;

  const describedBy = [
    error ? errorId : null,
    hint ? hintId : null,
    maxLength ? counterId : null,
  ]
    .filter(Boolean)
    .join(" ") || undefined;

  const isNearLimit =
    maxLength !== undefined &&
    currentLength !== undefined &&
    currentLength >= maxLength * 0.9;

  const isAtLimit =
    maxLength !== undefined &&
    currentLength !== undefined &&
    currentLength >= maxLength;

  const textareaClasses = [
    "block w-full rounded-lg border px-4 py-2.5 text-[#2D3436] text-sm",
    "placeholder:text-gray-400 resize-y",
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
        htmlFor={textareaId}
        className="text-sm font-medium text-[#2D3436]"
      >
        {label}
        {required && (
          <span className="ml-1 text-[#E74C3C]" aria-hidden="true">
            *
          </span>
        )}
      </label>

      <textarea
        id={textareaId}
        name={name}
        rows={rows}
        required={required}
        aria-required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        maxLength={maxLength}
        className={textareaClasses}
        {...rest}
      />

      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
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

        {maxLength !== undefined && (
          <p
            id={counterId}
            className={[
              "text-xs tabular-nums shrink-0",
              isAtLimit
                ? "text-[#E74C3C] font-semibold"
                : isNearLimit
                ? "text-amber-600"
                : "text-gray-400",
            ].join(" ")}
            aria-live="polite"
          >
            {currentLength ?? 0} / {maxLength}
          </p>
        )}
      </div>
    </div>
  );
}
