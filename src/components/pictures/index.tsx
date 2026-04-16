"use client";

import { useState, useRef, useEffect, Fragment } from "react";
import { usePicturesBinding } from "./hooks/index.binding.hook";
import { usePicturesFilter, FilterType } from "./hooks/index.filter.hook";
import styles from "./styles.module.css";

const SPLASH_COUNT = 6;

function SplashCard() {
  return <div className={styles.splash} aria-hidden="true" />;
}

export default function Pictures() {
  const { dogs, isLoading, isError, fetchNextPage, isFetchingNextPage } =
    usePicturesBinding();
  const { filterType, setFilterType, imageSize, filterOptions } =
    usePicturesFilter();
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchNextPage();
      }
    });

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [dogs.length, fetchNextPage]);

  const photoSizeClass =
    filterType === "landscape"
      ? styles.photoLandscape
      : filterType === "portrait"
        ? styles.photoPortrait
        : styles.photoDefault;

  return (
    <div className={styles.container} data-testid="pictures-container">
      {/* Gap: 1168 x 32 */}
      <div className={styles.gap32} />

      {/* Filter: 1168 x 48 */}
      <div className={styles.filter}>
        <div className={styles.filterWrap}>
          <select
            data-testid="pictures-filter"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as FilterType)}
            className={styles.filterSelect}
          >
            {filterOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Gap: 1168 x 42 */}
      <div className={styles.gap42} />

      {/* Main: 1168 x auto */}
      <div className={styles.main}>
        {isLoading &&
          Array.from({ length: SPLASH_COUNT }).map((_, i) => (
            <SplashCard key={`splash-init-${i}`} />
          ))}

        {isError && (
          <div data-testid="pictures-error" className={styles.error}>
            사진을 불러오지 못했습니다.
          </div>
        )}

        {dogs.map((dogUrl, index) => (
          <Fragment key={`${dogUrl}-${index}`}>
            {index === dogs.length - 2 && (
              <div ref={sentinelRef} className={styles.sentinel} />
            )}
            <div className={styles.photoCard}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={dogUrl}
                alt={`강아지 사진 ${index + 1}`}
                width={imageSize.width}
                height={imageSize.height}
                className={`${styles.photo} ${photoSizeClass}`}
                data-testid="dog-image"
              />
            </div>
          </Fragment>
        ))}

        {isFetchingNextPage &&
          Array.from({ length: SPLASH_COUNT }).map((_, i) => (
            <SplashCard key={`splash-next-${i}`} />
          ))}
      </div>
    </div>
  );
}
