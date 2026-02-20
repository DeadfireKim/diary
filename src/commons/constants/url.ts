/**
 * URL 경로 관리
 * 모든 라우트 경로와 메타데이터를 중앙에서 관리
 */

/**
 * 접근 권한 타입
 */
export enum AccessLevel {
  /** 누구나 접근 가능 */
  Public = "PUBLIC",
  /** 회원 전용 */
  MemberOnly = "MEMBER_ONLY",
}

/**
 * 레이아웃 노출 설정 인터페이스
 */
export interface LayoutVisibility {
  /** 헤더 노출 여부 */
  header: boolean;
  /** 헤더 내 로고 노출 여부 */
  headerLogo: boolean;
  /** 헤더 내 다크모드 전환 토글 노출 여부 */
  headerDarkModeToggle: boolean;
  /** 배너 노출 여부 */
  banner: boolean;
  /** 네비게이션 노출 여부 */
  navigation: boolean;
  /** 푸터 노출 여부 */
  footer: boolean;
}

/**
 * 라우트 메타데이터 인터페이스
 */
export interface RouteMeta {
  /** 경로 */
  path: string;
  /** 접근 권한 */
  accessLevel: AccessLevel;
  /** 레이아웃 노출 설정 */
  layout: LayoutVisibility;
}

/**
 * 라우트 키 타입
 */
export type RouteKey =
  | "login"
  | "signup"
  | "diaries"
  | "diaryDetail"
  | "pictures";

/**
 * 라우트 설정 맵
 */
export const routes: Record<RouteKey, RouteMeta> = {
  login: {
    path: "/auth/login",
    accessLevel: AccessLevel.Public,
    layout: {
      header: false,
      headerLogo: false,
      headerDarkModeToggle: false,
      banner: false,
      navigation: false,
      footer: false,
    },
  },
  signup: {
    path: "/auth/signup",
    accessLevel: AccessLevel.Public,
    layout: {
      header: false,
      headerLogo: false,
      headerDarkModeToggle: false,
      banner: false,
      navigation: false,
      footer: false,
    },
  },
  diaries: {
    path: "/diaries",
    accessLevel: AccessLevel.Public,
    layout: {
      header: true,
      headerLogo: true,
      headerDarkModeToggle: false,
      banner: true,
      navigation: true,
      footer: true,
    },
  },
  diaryDetail: {
    path: "/diaries/[id]",
    accessLevel: AccessLevel.MemberOnly,
    layout: {
      header: true,
      headerLogo: true,
      headerDarkModeToggle: false,
      banner: false,
      navigation: false,
      footer: true,
    },
  },
  pictures: {
    path: "/pictures",
    accessLevel: AccessLevel.Public,
    layout: {
      header: true,
      headerLogo: true,
      headerDarkModeToggle: false,
      banner: true,
      navigation: true,
      footer: true,
    },
  },
};

/**
 * 다이나믹 라우팅을 위한 경로 생성 헬퍼 함수
 */
export const buildPath = {
  /**
   * 일기 상세 페이지 경로 생성
   * @param id 일기 ID
   * @returns /diaries/{id}
   */
  diaryDetail: (id: string | number): string => {
    return `/diaries/${id}`;
  },
};

/**
 * 특정 경로의 메타데이터를 가져오는 헬퍼 함수
 * @param routeKey 라우트 키
 * @returns 라우트 메타데이터
 */
export const getRouteMeta = (routeKey: RouteKey): RouteMeta => {
  return routes[routeKey];
};

/**
 * 현재 경로가 특정 접근 권한을 요구하는지 확인
 * @param routeKey 라우트 키
 * @param requiredLevel 요구되는 접근 레벨
 * @returns 권한 요구 여부
 */
export const requiresAccessLevel = (
  routeKey: RouteKey,
  requiredLevel: AccessLevel
): boolean => {
  return routes[routeKey].accessLevel === requiredLevel;
};

/**
 * 모든 라우트 경로 배열 (Link 컴포넌트 등에서 사용)
 */
export const allPaths = Object.values(routes).map((route) => route.path);

/**
 * 회원 전용 경로 배열
 */
export const memberOnlyPaths = Object.values(routes)
  .filter((route) => route.accessLevel === AccessLevel.MemberOnly)
  .map((route) => route.path);

/**
 * 공개 경로 배열
 */
export const publicPaths = Object.values(routes)
  .filter((route) => route.accessLevel === AccessLevel.Public)
  .map((route) => route.path);
