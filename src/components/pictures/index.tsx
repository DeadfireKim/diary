"use client";

import { useState, useRef, useEffect, Fragment } from "react";
import SelectBox from "@/commons/components/selectbox";
import { usePicturesBinding } from "./hooks/index.binding.hook";
import styles from "./styles.module.css";

const FILTER_OPTIONS = [
  { value: "all", label: "기본" },
  { value: "recent", label: "최신순" },
  { value: "oldest", label: "오래된순" },
];

const SPLASH_COUNT = 6;

function SplashCard() {
  return <div className={styles.splash} aria-hidden="true" />;
}

export default function Pictures() {
  const [filterValue, setFilterValue] = useState("all");
  const { dogs, isLoading, isError, fetchNextPage, isFetchingNextPage } =
    usePicturesBinding();
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

  return (
    <div className={styles.container} data-testid="pictures-container">
      {/* Gap: 1168 x 32 */}
      <div className={styles.gap32} />

      {/* Filter: 1168 x 48 */}
      <div className={styles.filter}>
        <div className={styles.filterWrap}>
          <SelectBox
            variant="primary"
            size="medium"
            theme="light"
            options={FILTER_OPTIONS}
            value={filterValue}
            onChange={setFilterValue}
          />
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
                width={640}
                height={640}
                className={styles.photo}
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
