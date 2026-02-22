"use client";

import { InputHTMLAttributes, forwardRef } from "react";
import styles from "./styles.module.css";

type ToggleVariant = "primary" | "secondary" | "tertiary";
type ToggleSize = "small" | "medium" | "large";
type ToggleTheme = "light" | "dark";

type ToggleProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "onChange"
> & {
  variant?: ToggleVariant;
  size?: ToggleSize;
  theme?: ToggleTheme;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
};

const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  (
    {
      variant = "primary",
      size = "medium",
      theme = "light",
      checked: controlledChecked,
      defaultChecked,
      onChange,
      label,
      disabled = false,
      className = "",
      ...props
    },
    ref,
  ) => {
    const isControlled = controlledChecked !== undefined;

    const containerClasses = [
      styles.container,
      styles[`variant-${variant}`],
      styles[`size-${size}`],
      styles[`theme-${theme}`],
      disabled && styles.disabled,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!disabled) {
        onChange?.(e.target.checked);
      }
    };

    return (
      <label className={containerClasses}>
        <input
          ref={ref}
          type="checkbox"
          className={styles.input}
          checked={isControlled ? controlledChecked : undefined}
          defaultChecked={!isControlled ? defaultChecked : undefined}
          onChange={handleChange}
          disabled={disabled}
          {...props}
        />
        <span className={styles.track}>
          <span className={styles.thumb} />
        </span>
        {label && <span className={styles.label}>{label}</span>}
      </label>
    );
  },
);

Toggle.displayName = "Toggle";

export default Toggle;
