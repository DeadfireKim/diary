import { usePathname } from "next/navigation";

/**
 * Layout 링크 라우팅을 위한 Hook
 * 현재 경로를 반환하여 active 상태 관리에 사용
 */
export const useLinkRouting = () => {
  const pathname = usePathname();

  return {
    pathname,
  };
};
