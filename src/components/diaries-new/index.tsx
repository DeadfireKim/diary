"use client";

import { useState } from "react";
import Input from "@/commons/components/input";
import Button from "@/commons/components/button";
import { EmotionType, getEmotionMeta, allEmotions } from "@/commons/constants/enum";
import styles from "./styles.module.css";

export default function DiariesNew() {
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleClose = () => {
    console.log("Close clicked");
  };

  const handleSubmit = () => {
    console.log("Submit:", { selectedEmotion, title, content });
  };

  return (
    <div className={styles.wrapper}>
      {/* Header: full * 24 */}
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>일기쓰기</h1>
      </div>

      {/* Gap: full * 40 */}
      <div className={styles.gap40} />

      {/* Emotion Box: full * 64 */}
      <div className={styles.emotionBox}>
        <p className={styles.emotionQuestion}>오늘 기분은 어땠나요?</p>
        <div className={styles.emotionButtons}>
          {allEmotions.map((emotion) => {
            const emotionMeta = getEmotionMeta(emotion);
            return (
              <button
                key={emotion}
                className={`${styles.emotionButton} ${
                  selectedEmotion === emotion ? styles.selected : ""
                }`}
                onClick={() => setSelectedEmotion(emotion)}
              >
                <span className={styles.radioCircle}>
                  {selectedEmotion === emotion && (
                    <span className={styles.radioFill} />
                  )}
                </span>
                <span className={styles.emotionLabel}>{emotionMeta.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Gap: full * 40 */}
      <div className={styles.gap40} />

      {/* Input Title: full * 76 */}
      <div className={styles.inputTitle}>
        <label className={styles.inputLabel}>제목</label>
        <Input
          variant="primary"
          size="medium"
          theme="light"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요"
          className={styles.titleInput}
        />
      </div>

      {/* Gap: full * 24 */}
      <div className={styles.gap24} />

      {/* Input Content: full * 156 */}
      <div className={styles.inputContent}>
        <label className={styles.inputLabel}>내용</label>
        <textarea
          className={styles.contentTextarea}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용을 입력하세요"
        />
      </div>

      {/* Gap: full * 40 */}
      <div className={styles.gap40} />

      {/* Footer: full * 48 */}
      <div className={styles.footer}>
        <Button
          variant="secondary"
          size="medium"
          theme="light"
          onClick={handleClose}
          className={styles.closeButton}
        >
          닫기
        </Button>
        <Button
          variant="primary"
          size="medium"
          theme="light"
          onClick={handleSubmit}
          className={styles.submitButton}
        >
          등록하기
        </Button>
      </div>
    </div>
  );
}
