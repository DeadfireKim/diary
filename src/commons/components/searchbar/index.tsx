import { InputHTMLAttributes, forwardRef, useState } from "react";
import styles from "./styles.module.css";

type SearchbarVariant = "primary" | "secondary" | "tertiary";
type SearchbarSize = "small" | "medium" | "large";
type SearchbarTheme = "light" | "dark";

type SearchbarProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  variant?: SearchbarVariant;
  size?: SearchbarSize;
  theme?: SearchbarTheme;
  onSearch?: (value: string) => void;
  onClear?: () => void;
  showClearButton?: boolean;
};

const Searchbar = forwardRef<HTMLInputElement, SearchbarProps>(
  (
    {
      variant = "primary",
      size = "medium",
      theme = "light",
      onSearch,
      onClear,
      showClearButton = true,
      className = "",
      value: controlledValue,
      onChange,
      placeholder = "Search...",
      disabled,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = useState("");
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;

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
      const newValue = e.target.value;
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(e);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && onSearch) {
        onSearch(String(value));
      }
      props.onKeyDown?.(e);
    };

    const handleClear = () => {
      if (!isControlled) {
        setInternalValue("");
      }
      onClear?.();
      if (onChange) {
        const syntheticEvent = {
          target: { value: "" },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(syntheticEvent);
      }
    };

    const handleSearchClick = () => {
      if (onSearch) {
        onSearch(String(value));
      }
    };

    const showClear = showClearButton && value && !disabled;

    return (
      <div className={containerClasses}>
        <button
          type="button"
          className={styles.searchButton}
          onClick={handleSearchClick}
          disabled={disabled}
          aria-label="Search"
        >
          <svg
            className={styles.searchIcon}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19 19L14.65 14.65"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <input
          ref={ref}
          type="text"
          className={styles.input}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          {...props}
        />

        {showClear && (
          <button
            type="button"
            className={styles.clearButton}
            onClick={handleClear}
            aria-label="Clear search"
          >
            <svg
              className={styles.clearIcon}
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 5L5 15M5 5L15 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>
    );
  },
);

Searchbar.displayName = "Searchbar";

export default Searchbar;
