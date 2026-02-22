"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import styles from "./styles.module.css";

type ButtonVariant = "primary" | "secondary" | "tertiary";
type ButtonSize = "small" | "medium" | "large";
type ButtonTheme = "light" | "dark";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  theme?: ButtonTheme;
  fullWidth?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "medium",
      theme = "light",
      fullWidth = false,
      className,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const classNames = [
      styles.button,
      styles[`variant-${variant}`],
      styles[`size-${size}`],
      styles[`theme-${theme}`],
      fullWidth && styles.fullWidth,
      disabled && styles.disabled,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        ref={ref}
        className={classNames}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
