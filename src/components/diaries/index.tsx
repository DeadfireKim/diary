"use client";

import { useState } from "react";
import Image from "next/image";
import SelectBox from "@/commons/components/selectbox";
import Searchbar from "@/commons/components/searchbar";
import Button from "@/commons/components/button";
import Pagination from "@/commons/components/pagination";
import { getEmotionMeta } from "@/commons/constants/enum";
import { useDiaryModal } from "./hooks/index.link.modal.hook";
import { useDiariesBinding } from "./hooks/index.binding.hook";
import { useDiaryRouting } from "./hooks/index.link.routing.hook";
import styles from "./styles.module.css";

export default function Diaries() {
  const { diaries, isLoading } = useDiariesBinding();
  const { navigateToDiaryDetail } = useDiaryRouting();
  const [filterValue, setFilterValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10; // Mock total pages
  const { openDiaryModal } = useDiaryModal();

  const filterOptions = [
    { value: "all", label: "전체" },
    { value: "recent", label: "최신순" },
    { value: "oldest", label: "오래된순" },
  ];

  return (
    <div className={styles.container} data-testid="diaries-container">
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
          onClick={openDiaryModal}
          data-testid="write-button"
        >
          일기쓰기
        </Button>
      </div>

      {/* Gap: 1168 * 42 */}
      <div className={styles.gap42} />

      {/* Main section: 1168 * 936 */}
      <div className={styles.main}>
        {diaries.map((diary) => {
          const emotionMeta = getEmotionMeta(diary.emotion);
          return (
            <div
              key={diary.id}
              className={styles.diaryCard}
              data-testid={`diary-card-${diary.id}`}
              onClick={() => navigateToDiaryDetail(diary.id)}
            >
              <div className={styles.cardImage}>
                <Image
                  src={emotionMeta.imageMedium}
                  alt={emotionMeta.label}
                  width={274}
                  height={164}
                  className={styles.emotionImage}
                  data-testid="diary-card-emotion-image"
                />
              </div>
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <div
                    className={styles.cardEmotion}
                    style={{ color: emotionMeta.color }}
                    data-testid="diary-card-emotion-text"
                  >
                    {emotionMeta.label}
                  </div>
                  <div className={styles.cardDate} data-testid="diary-card-created-at">
                    {new Date(diary.createdAt).toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    }).replace(/\. /g, ".").replace(/\.$/, "")}
                  </div>
                </div>
                <div className={styles.cardText} data-testid="diary-card-title">{diary.title}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Gap: 1168 * 40 */}
      <div className={styles.gap40} />

      {/* Pagination section: 1168 * 32 */}
      <div className={styles.paginationWrapper}>
        <Pagination
          variant="primary"
          size="medium"
          theme="light"
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          siblingCount={1}
          showFirstLast={true}
        />
      </div>

      {/* Gap: 1168 * 40 */}
      <div className={styles.gap40} />
    </div>
  );
}
