import { usePathname } from "next/navigation";
import { routes, LayoutVisibility } from "@/commons/constants/url";

/**
 * Layout 영역 노출 제어를 위한 Hook
 * 현재 경로에 따라 각 레이아웃 영역의 노출 여부를 반환
 */
export const useAreaVisibility = (): LayoutVisibility => {
  const pathname = usePathname();

  // 현재 경로와 일치하는 route 설정 찾기
  const matchedRoute = Object.values(routes).find((route) => {
    // 다이나믹 라우팅 처리 (/diaries/[id] -> /diaries/123)
    if (route.path.includes("[id]")) {
      const pattern = route.path.replace("[id]", "\\d+");
      const regex = new RegExp(`^${pattern}$`);
      return regex.test(pathname);
    }
    // 일반 경로 매칭
    return route.path === pathname;
  });

  // 매칭되는 route가 있으면 해당 layout 설정 반환, 없으면 기본값 (모두 true)
  return (
    matchedRoute?.layout || {
      header: true,
      headerLogo: true,
      headerDarkModeToggle: false,
      banner: true,
      navigation: true,
      footer: true,
    }
  );
};
