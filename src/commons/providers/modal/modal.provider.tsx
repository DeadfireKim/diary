"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import styles from "./styles.module.css";

/**
 * 모달 타입 정의
 */
interface Modal {
  id: string;
  content: React.ReactNode;
}

/**
 * 모달 컨텍스트 타입 정의
 */
interface ModalContextType {
  modals: Modal[];
  isOpen: boolean; // 하위 호환성을 위해 유지 (modals.length > 0)
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
}

/**
 * 모달 컨텍스트 생성
 */
const ModalContext = createContext<ModalContextType | undefined>(undefined);

/**
 * 모달 프로바이더 컴포넌트
 * children을 감싸서 전역 모달 상태를 제공
 * 중첩 모달(modal stack)을 지원
 */
export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modals, setModals] = useState<Modal[]>([]);

  const openModal = useCallback((content: React.ReactNode) => {
    const id = `modal-${Date.now()}-${Math.random()}`;
    setModals((prev) => [...prev, { id, content }]);
  }, []);

  const closeModal = useCallback(() => {
    setModals((prev) => {
      if (prev.length === 0) return prev;
      // 최상단 모달 제거
      return prev.slice(0, -1);
    });
  }, []);

  const isOpen = modals.length > 0;

  return (
    <ModalContext.Provider value={{ modals, isOpen, openModal, closeModal }}>
      {children}
      <ModalStack modals={modals} onClose={closeModal} />
    </ModalContext.Provider>
  );
}

/**
 * 모달 훅
 * 컴포넌트에서 모달을 제어하기 위해 사용
 */
export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within ModalProvider");
  }
  return context;
}

/**
 * 모달 스택 컴포넌트
 * 여러 모달을 중첩하여 렌더링
 */
interface ModalStackProps {
  modals: Modal[];
  onClose: () => void;
}

function ModalStack({ modals, onClose }: ModalStackProps) {
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // ESC 키로 최상단 모달 닫기
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && modals.length > 0) {
        onClose();
      }
    };

    if (modals.length > 0) {
      document.addEventListener("keydown", handleEscape);
      // 모달이 1개라도 열려 있으면 body 스크롤 방지
      document.body.style.overflow = "hidden";
    } else {
      // 모달이 모두 닫히면 body 스크롤 복원
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      // 컴포넌트 언마운트 시 body 스크롤 복원
      document.body.style.overflow = "unset";
    };
  }, [modals.length, onClose]);

  // 서버 사이드 렌더링 시 포털을 사용하지 않음
  if (!mounted) {
    return null;
  }

  if (modals.length === 0) {
    return null;
  }

  return createPortal(
    <>
      {modals.map((modal, index) => (
        <ModalLayer
          key={modal.id}
          index={index}
          isTopmost={index === modals.length - 1}
          onClose={onClose}
        >
          {modal.content}
        </ModalLayer>
      ))}
    </>,
    document.body
  );
}

/**
 * 개별 모달 레이어 컴포넌트
 * backdrop과 모달 content를 렌더링
 */
interface ModalLayerProps {
  index: number;
  isTopmost: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function ModalLayer({
  index,
  isTopmost,
  onClose,
  children,
}: ModalLayerProps) {
  const baseZIndex = 9999;
  const zIndex = baseZIndex + index * 2;

  const backdropClasses = [
    styles.backdrop,
    isTopmost ? styles.topmost : styles.notTopmost,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      role="dialog"
      aria-modal="true"
      className={styles.modalLayer}
      style={{ zIndex }}
    >
      {/* 오버레이 (배경) - 각 모달마다 backdrop이 쌓임 */}
      <div
        onClick={isTopmost ? onClose : undefined}
        aria-hidden="true"
        className={backdropClasses}
      />

      {/* 모달 컨텐츠 래퍼 */}
      <div className={styles.contentWrapper} style={{ zIndex: zIndex + 1 }}>
        {children}
      </div>
    </div>
  );
}
