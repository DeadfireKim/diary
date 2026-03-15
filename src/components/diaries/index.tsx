"use client";

import { useState } from "react";
import Image from "next/image";
import SelectBox from "@/commons/components/selectbox";
import Searchbar from "@/commons/components/searchbar";
import Button from "@/commons/components/button";
import Pagination from "@/commons/components/pagination";
import { EmotionType, getEmotionMeta } from "@/commons/constants/enum";
import { useDiaryModal } from "./hooks/index.link.modal.hook";
import styles from "./styles.module.css";

// Mock 데이터 타입
type DiaryCard = {
  id: number;
  date: string;
  content: string;
  emotion: EmotionType;
};

export default function Diaries() {
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

  // Mock 데이터
  const mockDiaries: DiaryCard[] = [
    {
      id: 1,
      date: "2024.01.15",
      content: "오늘은 정말 즐거운 하루였어요. 친구들과 함께 맛있는 음식을 먹고 재밌는 이야기를 나눴어요.",
      emotion: EmotionType.Happy,
    },
    {
      id: 2,
      date: "2024.01.14",
      content: "비가 와서 조금 우울한 기분이 들었어요. 집에서 영화를 보며 하루를 보냈습니다.",
      emotion: EmotionType.Sad,
    },
    {
      id: 3,
      date: "2024.01.13",
      content: "일이 잘 풀리지 않아서 답답했어요. 하지만 내일은 더 나아질 거라 믿어요.",
      emotion: EmotionType.Angry,
    },
    {
      id: 4,
      date: "2024.01.12",
      content: "갑자기 좋은 소식을 들어서 너무 놀랐어요! 정말 예상치 못한 일이었어요.",
      emotion: EmotionType.Surprise,
    },
    {
      id: 5,
      date: "2024.01.11",
      content: "평범한 하루를 보냈어요. 특별한 일은 없었지만 그래도 괜찮은 하루였어요.",
      emotion: EmotionType.Etc,
    },
    {
      id: 6,
      date: "2024.01.10",
      content: "새로운 취미를 시작했어요. 앞으로가 기대되고 설레는 마음이 들어요.",
      emotion: EmotionType.Happy,
    },
    {
      id: 7,
      date: "2024.01.09",
      content: "오랜만에 가족들과 시간을 보냈어요. 웃음이 끊이지 않는 즐거운 시간이었어요.",
      emotion: EmotionType.Happy,
    },
    {
      id: 8,
      date: "2024.01.08",
      content: "혼자 있는 시간이 너무 길어서 외로움을 느꼈어요. 누군가와 이야기하고 싶었어요.",
      emotion: EmotionType.Sad,
    },
    {
      id: 9,
      date: "2024.01.07",
      content: "약속 시간에 늦어서 화가 났어요. 다음부터는 미리미리 준비해야겠어요.",
      emotion: EmotionType.Angry,
    },
    {
      id: 10,
      date: "2024.01.06",
      content: "우연히 오랜 친구를 만났어요! 정말 뜻밖의 만남이라 너무 반가웠어요.",
      emotion: EmotionType.Surprise,
    },
    {
      id: 11,
      date: "2024.01.05",
      content: "조용히 책을 읽으며 여유로운 시간을 보냈어요. 평화로운 하루였어요.",
      emotion: EmotionType.Etc,
    },
    {
      id: 12,
      date: "2024.01.04",
      content: "목표했던 일을 드디어 완성했어요! 성취감이 느껴지는 뿌듯한 하루였어요.",
      emotion: EmotionType.Happy,
    },
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
        {mockDiaries.map((diary) => {
          const emotionMeta = getEmotionMeta(diary.emotion);
          return (
            <div key={diary.id} className={styles.diaryCard}>
              <div className={styles.cardImage}>
                <Image
                  src={emotionMeta.imageMedium}
                  alt={emotionMeta.label}
                  width={274}
                  height={164}
                  className={styles.emotionImage}
                />
              </div>
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <div
                    className={styles.cardEmotion}
                    style={{ color: emotionMeta.color }}
                  >
                    {emotionMeta.label}
                  </div>
                  <div className={styles.cardDate}>{diary.date}</div>
                </div>
                <div className={styles.cardText}>{diary.content}</div>
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
