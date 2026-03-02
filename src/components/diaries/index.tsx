"use client";

import { useState } from "react";
import Image from "next/image";
import SelectBox from "@/commons/components/selectbox";
import Searchbar from "@/commons/components/searchbar";
import Button from "@/commons/components/button";
import { EmotionType, getEmotionMeta } from "@/commons/constants/enum";
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
                <div className={styles.cardDate}>{diary.date}</div>
                <div className={styles.cardText}>{diary.content}</div>
                <div
                  className={styles.cardEmotion}
                  style={{ color: emotionMeta.color }}
                >
                  {emotionMeta.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Gap: 1168 * 40 */}
      <div className={styles.gap40} />

      {/* Pagination section: 1168 * 32 */}
      <div className={styles.pagination}>Pagination Area</div>

      {/* Gap: 1168 * 40 */}
      <div className={styles.gap40} />
    </div>
  );
}
