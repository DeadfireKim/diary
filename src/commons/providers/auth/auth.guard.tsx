"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/commons/providers/auth/auth.provider";
import { useModal } from "@/commons/providers/modal/modal.provider";
import Modal from "@/commons/components/modal";
import { routes, AccessLevel } from "@/commons/constants/url";

const isTestEnv = process.env.NEXT_PUBLIC_TEST_ENV === "test";

function isMemberOnlyPath(pathname: string): boolean {
  return Object.values(routes).some((route) => {
    if (route.accessLevel !== AccessLevel.MemberOnly) return false;
    const pattern = route.path.replace(/\[.*?\]/g, "[^/]+");
    const regex = new RegExp(`^${pattern}$`);
    return regex.test(pathname);
  });
}

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth();
  const { openModal, closeModal } = useModal();
  const pathname = usePathname();
  const router = useRouter();
  const [isInitialized, setIsInitialized] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const modalShownRef = useRef(false);

  // AuthProvider가 localStorage에서 동기화된 후 인가 진행
  useEffect(() => {
    setIsInitialized(true);
  }, []);

  // 페이지 이동 시 모달 노출 상태 초기화
  useEffect(() => {
    modalShownRef.current = false;
    setIsAuthorized(false);
  }, [pathname]);

  const handleConfirm = useCallback(() => {
    closeModal();
    router.push(routes.login.path);
  }, [closeModal, router]);

  // 인가 검사
  useEffect(() => {
    if (!isInitialized) return;

    const requiresAuth = isMemberOnlyPath(pathname);

    if (!requiresAuth) {
      setIsAuthorized(true);
      return;
    }

    // 테스트환경은 항상 로그인 유저로 처리
    const effectivelyLoggedIn = isTestEnv || isLoggedIn;

    if (effectivelyLoggedIn) {
      setIsAuthorized(true);
      return;
    }

    setIsAuthorized(false);

    // 모달은 한 번만 노출
    if (!modalShownRef.current) {
      modalShownRef.current = true;
      openModal(
        <Modal
          variant="info"
          actions="single"
          title="로그인이 필요합니다"
          message="이 페이지는 로그인 후 이용할 수 있습니다."
          onConfirm={handleConfirm}
        />
      );
    }
  }, [isInitialized, isLoggedIn, pathname, openModal, handleConfirm]);

  // 인가 완료 전: 빈 화면 유지
  if (!isInitialized || !isAuthorized) {
    return null;
  }

  return <>{children}</>;
}
