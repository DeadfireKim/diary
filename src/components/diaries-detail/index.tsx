"use client";

import Image from "next/image";
import Button from "@/commons/components/button";
import { EmotionType, getEmotionMeta } from "@/commons/constants/enum";
import styles from "./styles.module.css";

// Mock 데이터 타입
type DiaryDetail = {
  id: number;
  title: string;
  content: string;
  emotion: EmotionType;
  createdAt: string;
};

export default function DiariesDetail() {
  // Mock 데이터
  const mockDiary: DiaryDetail = {
    id: 1,
    title: "오늘의 일기",
    content:
      "오늘은 정말 즐거운 하루였어요. 친구들과 함께 맛있는 음식을 먹고 재밌는 이야기를 나눴어요. 날씨도 좋고 기분도 좋았던 하루였습니다.",
    emotion: EmotionType.Happy,
    createdAt: "2024.01.15",
  };

  const emotionMeta = getEmotionMeta(mockDiary.emotion);

  const handleCopyContent = () => {
    navigator.clipboard.writeText(mockDiary.content);
  };

  const handleEdit = () => {
    console.log("Edit clicked");
  };

  const handleDelete = () => {
    console.log("Delete clicked");
  };

  return (
    <div className={styles.container}>
      {/* Gap: 1168 * 64 */}
      <div className={styles.gap64} />

      {/* Detail Title section: 1168 * 84 */}
      <div className={styles.detailTitle}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>{mockDiary.title}</h1>
          <div className={styles.titleMeta}>
            <div className={styles.emotionInfo}>
              <Image
                src={emotionMeta.imageSmall}
                alt={emotionMeta.label}
                width={24}
                height={24}
                className={styles.emotionIcon}
              />
              <span
                className={styles.emotionText}
                style={{ color: emotionMeta.color }}
              >
                {emotionMeta.label}
              </span>
            </div>
            <span className={styles.createdAt}>{mockDiary.createdAt}</span>
          </div>
        </div>
      </div>

      {/* Gap: 1168 * 24 */}
      <div className={styles.gap24} />

      {/* Detail Content section: 1168 * 169 */}
      <div className={styles.detailContent}>
        <p className={styles.contentText}>{mockDiary.content}</p>
        <button
          className={styles.copyButton}
          onClick={handleCopyContent}
          aria-label="내용 복사"
        >
          <Image
            src="/icons/copy_outline_light_m.svg"
            alt="복사"
            width={24}
            height={24}
          />
        </button>
      </div>

      {/* Gap: 1168 * 24 */}
      <div className={styles.gap24} />

      {/* Detail Footer section: 1168 * 56 */}
      <div className={styles.detailFooter}>
        <Button
          variant="secondary"
          size="medium"
          theme="light"
          onClick={handleEdit}
          className={styles.editButton}
        >
          수정
        </Button>
        <Button
          variant="secondary"
          size="medium"
          theme="light"
          onClick={handleDelete}
          className={styles.deleteButton}
        >
          삭제
        </Button>
      </div>

      {/* Gap: 1168 * 24 */}
      <div className={styles.gap24} />

      {/* Retrospect Input section: 1168 * 85 */}
      <div className={styles.retrospectInput}>Retrospect Input Area</div>

      {/* Gap: 1168 * 16 */}
      <div className={styles.gap16} />

      {/* Retrospect List section: 1168 * 72 */}
      <div className={styles.retrospectList}>Retrospect List Area</div>
    </div>
  );
}
