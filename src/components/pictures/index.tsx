"use client";

import { useState } from "react";
import Image from "next/image";
import SelectBox from "@/commons/components/selectbox";
import styles from "./styles.module.css";

const MOCK_DOGS = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  src: "/images/dog-1.jpg",
  alt: `강아지 사진 ${i + 1}`,
}));

const FILTER_OPTIONS = [
  { value: "all", label: "기본" },
  { value: "recent", label: "최신순" },
  { value: "oldest", label: "오래된순" },
];

export default function Pictures() {
  const [filterValue, setFilterValue] = useState("all");

  return (
    <div className={styles.container}>
      {/* Gap: 1168 x 32 */}
      <div className={styles.gap32} />

      {/* Filter: 1168 x 48 */}
      <div className={styles.filter}>
        <SelectBox
          variant="primary"
          size="medium"
          theme="light"
          options={FILTER_OPTIONS}
          value={filterValue}
          onChange={setFilterValue}
          className={styles.filterSelect}
        />
      </div>

      {/* Gap: 1168 x 42 */}
      <div className={styles.gap42} />

      {/* Main: 1168 x auto */}
      <div className={styles.main}>
        {MOCK_DOGS.map((dog) => (
          <div key={dog.id} className={styles.photoCard}>
            <Image
              src={dog.src}
              alt={dog.alt}
              width={640}
              height={640}
              className={styles.photo}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
