"use client";

import { useState } from "react";
import SelectBox from "@/commons/components/selectbox";
import Searchbar from "@/commons/components/searchbar";
import Button from "@/commons/components/button";
import styles from "./styles.module.css";

export default function Diaries() {
  const [filterValue, setFilterValue] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const filterOptions = [
    { value: "all", label: "전체" },
    { value: "recent", label: "최신순" },
    { value: "oldest", label: "오래된순" },
  ];

  return (
    <div className={styles.container}>
      {/* Gap: 1168 * 32 */}
      <div className={styles.gap32} />

      {/* Search section: 1168 * 48 */}
      <div className={styles.search}>
        <SelectBox
          variant="primary"
          size="medium"
          theme="light"
          options={filterOptions}
          value={filterValue}
          onChange={setFilterValue}
          placeholder="필터 선택"
          className={styles.filterSelect}
        />
        <Searchbar
          variant="primary"
          size="medium"
          theme="light"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="일기 검색..."
          className={styles.searchbar}
        />
        <Button
          variant="primary"
          size="medium"
          theme="light"
          className={styles.writeButton}
        >
          일기쓰기
        </Button>
      </div>

      {/* Gap: 1168 * 42 */}
      <div className={styles.gap42} />

      {/* Main section: 1168 * 936 */}
      <div className={styles.main}>Main Content Area</div>

      {/* Gap: 1168 * 40 */}
      <div className={styles.gap40} />

      {/* Pagination section: 1168 * 32 */}
      <div className={styles.pagination}>Pagination Area</div>

      {/* Gap: 1168 * 40 */}
      <div className={styles.gap40} />
    </div>
  );
}
