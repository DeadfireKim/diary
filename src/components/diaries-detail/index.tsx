"use client";

import Image from "next/image";
import Button from "@/commons/components/button";
import Input from "@/commons/components/input";
import { getEmotionMeta, EmotionType, allEmotions } from "@/commons/constants/enum";
import { useDiaryBinding } from "./hooks/index.binding.hook";
import { useRetrospectForm } from "./hooks/index.retrospect.form.hook";
import { useRetrospectBinding } from "./hooks/index.retrospect.binding.hook";
import { useUpdateDiary } from "./hooks/index.update.hook";
import styles from "./styles.module.css";

export default function DiariesDetail() {
  const { diary, isLoading } = useDiaryBinding();
  const { retrospects } = useRetrospectBinding();

  const diaryId = diary?.id ?? 0;
  const { register, onSubmit, isSubmitEnabled } = useRetrospectForm(diaryId);
  const {
    isEditMode,
    register: registerUpdate,
    onClickEdit,
    onSubmit: onSubmitUpdate,
    isSubmitEnabled: isUpdateEnabled,
  } = useUpdateDiary(diary);

  if (isLoading) {
    return (
      <div className={styles.container} data-testid="diaries-detail-container">
        <div className={styles.gap64} />
        <p>로딩 중...</p>
      </div>
    );
  }

  if (!diary) {
    return (
      <div className={styles.container} data-testid="diaries-detail-container">
        <div className={styles.gap64} />
        <p data-testid="diary-not-found">일기를 찾을 수 없습니다.</p>
      </div>
    );
  }

  const emotionMeta = getEmotionMeta(diary.emotion);

  const handleCopyContent = () => {
    navigator.clipboard.writeText(diary.content);
  };

  const handleDelete = () => {
    console.log("Delete clicked");
  };

  return (
    <div className={styles.container} data-testid="diaries-detail-container">
      {/* Gap: 1168 * 64 */}
      <div className={styles.gap64} />

      {/* Detail Title section: 1168 * 84 */}
      <div className={styles.detailTitle}>
        <div className={styles.titleSection}>
          <h1 className={styles.title} data-testid="diary-detail-title">{diary.title}</h1>
          <div className={styles.titleMeta}>
            <div className={styles.emotionInfo}>
              <Image
                src={emotionMeta.imageSmall}
                alt={emotionMeta.label}
                width={24}
                height={24}
                className={styles.emotionIcon}
                data-testid="diary-detail-emotion-icon"
              />
              <span
                className={styles.emotionText}
                style={{ color: emotionMeta.color }}
                data-testid="diary-detail-emotion-text"
              >
                {emotionMeta.label}
              </span>
            </div>
            <span className={styles.createdAt} data-testid="diary-detail-created-at">
              {new Date(diary.createdAt).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              }).replace(/\. /g, ".").replace(/\.$/, "")}
            </span>
          </div>
        </div>
      </div>

      {/* Gap: 1168 * 24 */}
      <div className={styles.gap24} />

      {/* Detail Content section: 1168 * 169 */}
      <div className={styles.detailContent}>
        <p className={styles.contentText} data-testid="diary-detail-content">{diary.content}</p>
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
          <span className={styles.copyButtonText}>내용복사</span>
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
          onClick={onClickEdit}
          className={styles.editButton}
          data-testid="edit-button"
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

      {/* Edit Mode section */}
      {isEditMode && (
        <form
          onSubmit={onSubmitUpdate}
          className={styles.editModeSection}
          data-testid="edit-mode"
        >
          <div className={styles.editField}>
            <label className={styles.editLabel}>감정</label>
            <select
              {...registerUpdate("emotion")}
              className={styles.editEmotionSelect}
              data-testid="edit-emotion-select"
            >
              {allEmotions.map((emotion) => (
                <option key={emotion} value={emotion}>
                  {emotion}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.editField}>
            <label className={styles.editLabel}>제목</label>
            <Input
              variant="primary"
              size="medium"
              theme="light"
              {...registerUpdate("title")}
              placeholder="제목을 입력하세요"
              className={styles.editInputField}
              data-testid="edit-title-input"
            />
          </div>
          <div className={styles.editField}>
            <label className={styles.editLabel}>내용</label>
            <Input
              variant="primary"
              size="medium"
              theme="light"
              {...registerUpdate("content")}
              placeholder="내용을 입력하세요"
              className={styles.editInputField}
              data-testid="edit-content-input"
            />
          </div>
          <div className={styles.editFooter}>
            <Button
              variant="primary"
              size="medium"
              theme="light"
              type="submit"
              disabled={!isUpdateEnabled}
              className={styles.editSubmitButton}
              data-testid="edit-submit-button"
            >
              수정하기
            </Button>
          </div>
        </form>
      )}

      {/* Retrospect Title */}
      <h2 className={styles.retrospectTitle}>회고</h2>

      {/* Retrospect Input section: 1168 * 85 */}
      <form onSubmit={onSubmit} className={styles.retrospectInput}>
        <Input
          variant="primary"
          size="medium"
          theme="light"
          {...register("content")}
          placeholder="회고를 입력하세요"
          className={styles.retrospectInputField}
          data-testid="retrospect-input"
          disabled={isEditMode}
        />
        <Button
          variant="primary"
          size="medium"
          theme="light"
          type="submit"
          disabled={!isSubmitEnabled || isEditMode}
          className={styles.retrospectButton}
          data-testid="retrospect-submit-button"
        >
          입력
        </Button>
      </form>

      {/* Gap: 1168 * 16 */}
      <div className={styles.gap16} />

      {/* Retrospect List section: 1168 * 72 */}
      <div className={styles.retrospectList} data-testid="retrospect-list">
        {retrospects.map((retrospect) => (
          <div key={retrospect.id} className={styles.retrospectItem} data-testid="retrospect-item">
            <p className={styles.retrospectText}>{retrospect.content}</p>
            <span className={styles.retrospectDate}>[{retrospect.createdAt}]</span>
          </div>
        ))}
      </div>
    </div>
  );
}
