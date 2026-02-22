"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { createPortal } from "react-dom";

/**
 * 모달 컨텍스트 타입 정의
 */
interface ModalContextType {
  isOpen: boolean;
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
 */
export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  const openModal = useCallback((content: React.ReactNode) => {
    setModalContent(content);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    // 애니메이션을 위해 약간의 지연 후 컨텐츠 제거
    setTimeout(() => setModalContent(null), 300);
  }, []);

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
      <ModalPortal isOpen={isOpen} onClose={closeModal}>
        {modalContent}
      </ModalPortal>
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
 * 모달 포털 컴포넌트
 * DOM의 body에 직접 렌더링
 */
interface ModalPortalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function ModalPortal({ isOpen, onClose, children }: ModalPortalProps) {
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // ESC 키로 모달 닫기
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // 모달이 열렸을 때 body 스크롤 방지
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // 서버 사이드 렌더링 시 포털을 사용하지 않음
  if (!mounted) {
    return null;
  }

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      {/* 오버레이 (배경) */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* 모달 컨텐츠 래퍼 (max-w-md, w-full 제거됨) */}
      <div className="relative z-10 transition-transform">
        {children}
      </div>
    </div>,
    document.body
  );
}
