"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./styles.module.css";

type SelectboxVariant = "primary" | "secondary" | "tertiary";
type SelectboxSize = "small" | "medium" | "large";
type SelectboxTheme = "light" | "dark";

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type SelectboxProps = {
  variant?: SelectboxVariant;
  size?: SelectboxSize;
  theme?: SelectboxTheme;
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  className?: string;
};

export default function Selectbox({
  variant = "primary",
  size = "medium",
  theme = "light",
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  placeholder = "Select an option",
  disabled = false,
  error = false,
  className = "",
}: SelectboxProps) {
  const [internalValue, setInternalValue] = useState(defaultValue || "");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const selectedOption = options.find((option) => option.value === value);
  const displayText = selectedOption?.label || placeholder;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const containerClasses = [
    styles.container,
    styles[`variant-${variant}`],
    styles[`size-${size}`],
    styles[`theme-${theme}`],
    isOpen && styles.open,
    disabled && styles.disabled,
    error && styles.error,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (optionValue: string, optionDisabled?: boolean) => {
    if (optionDisabled || disabled) return;

    if (!isControlled) {
      setInternalValue(optionValue);
    }
    onChange?.(optionValue);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen(!isOpen);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    } else if (e.key === "ArrowDown" && isOpen) {
      e.preventDefault();
      const currentIndex = options.findIndex((opt) => opt.value === value);
      const nextIndex = Math.min(currentIndex + 1, options.length - 1);
      const nextOption = options[nextIndex];
      if (!nextOption.disabled) {
        handleSelect(nextOption.value);
      }
    } else if (e.key === "ArrowUp" && isOpen) {
      e.preventDefault();
      const currentIndex = options.findIndex((opt) => opt.value === value);
      const prevIndex = Math.max(currentIndex - 1, 0);
      const prevOption = options[prevIndex];
      if (!prevOption.disabled) {
        handleSelect(prevOption.value);
      }
    }
  };

  return (
    <div ref={containerRef} className={containerClasses}>
      <button
        type="button"
        className={styles.trigger}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span
          className={`${styles.displayText} ${!selectedOption ? styles.placeholderText : ""}`}
        >
          {displayText}
        </span>
        <svg
          className={styles.chevron}
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div className={styles.dropdown} role="listbox">
          {options.map((option) => {
            const isSelected = option.value === value;
            const optionClasses = [
              styles.option,
              isSelected && styles.selected,
              option.disabled && styles.optionDisabled,
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <div
                key={option.value}
                className={optionClasses}
                onClick={() => handleSelect(option.value, option.disabled)}
                role="option"
                aria-selected={isSelected}
                aria-disabled={option.disabled}
              >
                {option.label}
                {isSelected && (
                  <svg
                    className={styles.checkIcon}
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.25 5L7.5 13.75L3.75 10"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
