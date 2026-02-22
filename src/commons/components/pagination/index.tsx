import { useMemo } from "react";
import styles from "./styles.module.css";

type PaginationVariant = "primary" | "secondary" | "tertiary";
type PaginationSize = "small" | "medium" | "large";
type PaginationTheme = "light" | "dark";

type PaginationProps = {
  variant?: PaginationVariant;
  size?: PaginationSize;
  theme?: PaginationTheme;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  showFirstLast?: boolean;
  className?: string;
};

const DOTS = "...";

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export default function Pagination({
  variant = "primary",
  size = "medium",
  theme = "light",
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  showFirstLast = true,
  className = "",
}: PaginationProps) {
  const paginationRange = useMemo(() => {
    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPages) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(totalPages - rightItemCount + 1, totalPages);

      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }

    return [];
  }, [totalPages, siblingCount, currentPage]);

  const containerClasses = [
    styles.pagination,
    styles[`variant-${variant}`],
    styles[`size-${size}`],
    styles[`theme-${theme}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const getButtonClasses = (isActive: boolean, isDisabled: boolean) => {
    return [
      styles.pageButton,
      isActive && styles.active,
      isDisabled && styles.disabled,
    ]
      .filter(Boolean)
      .join(" ");
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleFirst = () => {
    onPageChange(1);
  };

  const handleLast = () => {
    onPageChange(totalPages);
  };

  if (totalPages === 0) {
    return null;
  }

  return (
    <div className={containerClasses}>
      {showFirstLast && (
        <button
          className={getButtonClasses(false, currentPage === 1)}
          onClick={handleFirst}
          disabled={currentPage === 1}
          aria-label="First page"
        >
          <span className={styles.icon}>«</span>
        </button>
      )}

      <button
        className={getButtonClasses(false, currentPage === 1)}
        onClick={handlePrevious}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <span className={styles.icon}>‹</span>
      </button>

      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <span key={`dots-${index}`} className={styles.dots}>
              {DOTS}
            </span>
          );
        }

        return (
          <button
            key={pageNumber}
            className={getButtonClasses(
              currentPage === pageNumber,
              false,
            )}
            onClick={() => onPageChange(pageNumber as number)}
            aria-label={`Page ${pageNumber}`}
            aria-current={currentPage === pageNumber ? "page" : undefined}
          >
            {pageNumber}
          </button>
        );
      })}

      <button
        className={getButtonClasses(false, currentPage === totalPages)}
        onClick={handleNext}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <span className={styles.icon}>›</span>
      </button>

      {showFirstLast && (
        <button
          className={getButtonClasses(false, currentPage === totalPages)}
          onClick={handleLast}
          disabled={currentPage === totalPages}
          aria-label="Last page"
        >
          <span className={styles.icon}>»</span>
        </button>
      )}
    </div>
  );
}
