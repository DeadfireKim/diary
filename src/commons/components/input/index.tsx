import { InputHTMLAttributes, forwardRef } from "react";
import styles from "./styles.module.css";

type InputVariant = "primary" | "secondary" | "tertiary";
type InputSize = "small" | "medium" | "large";
type InputTheme = "light" | "dark";

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  variant?: InputVariant;
  size?: InputSize;
  theme?: InputTheme;
  error?: boolean;
  helperText?: string;
  label?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = "primary",
      size = "medium",
      theme = "light",
      error = false,
      helperText,
      label,
      className = "",
      disabled,
      ...props
    },
    ref,
  ) => {
    const inputClasses = [
      styles.input,
      styles[`variant-${variant}`],
      styles[`size-${size}`],
      styles[`theme-${theme}`],
      error && styles.error,
      disabled && styles.disabled,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={styles.container}>
        {label && (
          <label className={`${styles.label} ${styles[`theme-${theme}`]}`}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={inputClasses}
          disabled={disabled}
          {...props}
        />
        {helperText && (
          <span
            className={`${styles.helperText} ${error ? styles.errorText : ""} ${styles[`theme-${theme}`]}`}
          >
            {helperText}
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
