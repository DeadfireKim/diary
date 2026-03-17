"use client";

import Button from "@/commons/components/button";
import styles from "./styles.module.css";

type ModalVariant = "info" | "danger";
type ModalActions = "single" | "dual";
type ModalTheme = "light" | "dark";

export type ModalProps = {
  variant?: ModalVariant;
  actions?: ModalActions;
  theme?: ModalTheme;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
};

export default function Modal({
  variant = "info",
  actions = "single",
  theme = "light",
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "확인",
  cancelText = "취소",
}: ModalProps) {
  const modalClasses = [
    styles.modal,
    styles[`variant-${variant}`],
    styles[`theme-${theme}`],
  ]
    .filter(Boolean)
    .join(" ");

  const buttonAreaClasses = [
    styles.buttonArea,
    styles[`actions-${actions}`],
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={modalClasses}>
      {/* 텍스트 영역 */}
      <div className={styles.textArea}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.message}>{message}</p>
      </div>

      {/* 버튼 영역 */}
      <div className={buttonAreaClasses}>
        {actions === "dual" && onCancel && (
          <Button
            variant="secondary"
            theme="light"
            onClick={onCancel}
            className={styles.cancelButton}
          >
            {cancelText}
          </Button>
        )}
        <Button
          variant={variant === "danger" ? "danger" : "primary"}
          theme="light"
          onClick={onConfirm}
          className={
            actions === "single"
              ? styles.confirmButtonSingle
              : styles.confirmButtonDual
          }
        >
          {confirmText}
        </Button>
      </div>
    </div>
  );
}
