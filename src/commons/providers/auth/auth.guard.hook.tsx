"use client";

import { useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/commons/providers/auth/auth.provider";
import { useModal } from "@/commons/providers/modal/modal.provider";
import Modal from "@/commons/components/modal";
import { routes } from "@/commons/constants/url";

const isTestEnv = process.env.NEXT_PUBLIC_TEST_ENV === "test";

declare global {
  interface Window {
    __TEST_BYPASS__: boolean;
  }
}

function shouldBypass(isLoggedIn: boolean): boolean {
  if (typeof window !== "undefined") {
    // 테스트에서 명시적으로 패스 설정: window.__TEST_BYPASS__ = true
    if (window.__TEST_BYPASS__ === true) return true;
    // 테스트에서 명시적으로 검사 설정: window.__TEST_BYPASS__ = false
    if (window.__TEST_BYPASS__ === false) return isLoggedIn;
  }
  // NEXT_PUBLIC_TEST_ENV=test 환경변수로 구동된 경우: 기본 패스
  if (isTestEnv) return true;
  // 실제환경: isLoggedIn으로 검사
  return isLoggedIn;
}

export function useAuthGuard() {
  const { isLoggedIn } = useAuth();
  const { openModal, closeModal, modals } = useModal();
  const router = useRouter();
  const modalShownRef = useRef(false);
  const modalsRef = useRef(modals);
  modalsRef.current = modals;

  const closeAllModals = useCallback(() => {
    const count = modalsRef.current.length;
    for (let i = 0; i < count; i++) {
      closeModal();
    }
    modalShownRef.current = false;
  }, [closeModal]);

  const guard = useCallback(
    (action: () => void) => {
      if (shouldBypass(isLoggedIn)) {
        action();
        return;
      }

      // 모달은 한 번만 노출
      if (!modalShownRef.current) {
        modalShownRef.current = true;
        openModal(
          <Modal
            variant="info"
            actions="dual"
            title="로그인이 필요합니다"
            message="로그인하시겠습니까?"
            confirmText="로그인하러가기"
            cancelText="취소"
            onConfirm={() => {
              closeAllModals();
              router.push(routes.login.path);
            }}
            onCancel={() => {
              closeAllModals();
            }}
          />
        );
      }
    },
    [isLoggedIn, openModal, closeAllModals, router]
  );

  return { guard };
}
