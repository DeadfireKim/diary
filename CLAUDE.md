# Diary Project

일기 작성 및 감정 기록 웹 애플리케이션

## 프로젝트 개요

사용자의 일상과 감정을 기록하고 관리할 수 있는 Next.js 기반 웹 애플리케이션입니다.

## 기술 스택

### Core
- **Next.js 14.2** - App Router
- **React 18** - UI 라이브러리
- **TypeScript 5** - 타입 안정성

### Styling
- **Tailwind CSS 3.4** - 유틸리티 기반 CSS
- **PostCSS 8** - CSS 처리

### State Management & Data Fetching
- **@tanstack/react-query 5.90** - 서버 상태 관리 및 캐싱
- **React Query Devtools** - 개발 도구

### UI/UX
- **next-themes 0.4** - 다크모드 테마 관리
- **Modal Portal** - 전역 모달 시스템

## 폴더 구조

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # 루트 레이아웃 (Provider 설정)
│   └── page.tsx                 # 홈페이지
├── commons/                      # 공통 모듈
│   ├── constants/               # 상수 정의
│   │   ├── color.ts            # 컬러 팔레트 토큰
│   │   ├── typography.ts       # 타이포그래피 토큰
│   │   ├── enum.ts             # 감정(Emotion) Enum 타입
│   │   ├── url.ts              # URL 라우트 관리
│   │   └── prompts/            # 구현 요구사항 문서
│   └── providers/              # React Context Providers
│       ├── modal/
│       │   └── modal.provider.tsx
│       ├── next-themes/
│       │   └── next-themes.provider.tsx
│       └── react-query/
│           └── react-query.provider.tsx
.claude/
└── rules/                        # 개발 규칙 문서
    ├── 01-common.md             # 공통 개발 규칙
    ├── 02-wireframe.md          # Wireframe 및 CSS 규칙
    ├── 03-ui.md                 # UI 및 에셋 규칙
    ├── 04-func.md               # 기능 구현 규칙
    └── 05-func.role.md          # 권한 분기 및 가드 규칙
docs/
└── .pdca-status.json            # bkit PDCA 상태 관리
```

## 주요 기능

### 1. 감정 타입 시스템 (Emotion Enum)
- 5가지 감정 타입: Happy, Sad, Angry, Surprise, Etc
- 각 감정별 메타데이터 (라벨, 이미지 경로, 색상)
- 위치: `src/commons/constants/enum.ts`

### 2. URL 라우트 관리
- 중앙 집중식 라우트 설정
- 접근 권한 레벨 (Public, MemberOnly)
- 페이지별 레이아웃 노출 설정
- 다이나믹 라우팅 지원
- 위치: `src/commons/constants/url.ts`

### 3. 컬러 시스템
- Palette: blue, gray, coolGray, red, green, yellow
- Gradient: primary, skeleton
- CSS Variables 지원
- 위치: `src/commons/constants/color.ts`

### 4. Provider 시스템
전역 상태 관리를 위한 Provider 중첩 구조:
```tsx
<ThemeProvider>           // 테마 관리
  <ReactQueryProvider>    // 서버 상태 관리
    <ModalProvider>        // 모달 시스템
      {children}
    </ModalProvider>
  </ReactQueryProvider>
</ThemeProvider>
```

## 라우트 구조

| 경로 | 설명 | 접근 권한 |
|------|------|-----------|
| `/auth/login` | 로그인 | Public |
| `/auth/signup` | 회원가입 | Public |
| `/diaries` | 일기 목록 | Public |
| `/diaries/[id]` | 일기 상세 | MemberOnly |
| `/pictures` | 사진 목록 | Public |

## 개발 규칙

> 📖 상세한 개발 규칙은 `.claude/rules/` 폴더의 문서를 참조하세요.
> - [01-common.md](.claude/rules/01-common.md) - 공통 개발 규칙
> - [02-wireframe.md](.claude/rules/02-wireframe.md) - Wireframe 및 CSS 규칙
> - [03-ui.md](.claude/rules/03-ui.md) - UI 및 에셋 규칙
> - [04-func.md](.claude/rules/04-func.md) - 기능 구현 규칙
> - [05-func.role.md](.claude/rules/05-func.role.md) - 권한 분기 및 가드 규칙

## 핵심 개발 규칙 요약

### Import 경로
- `@/` 별칭 사용 (tsconfig paths)
- 예: `import { EmotionType } from '@/commons/constants/enum'`

### 컴포넌트 규칙
- Client Components: 파일 최상단에 `"use client"` 선언
- Server Components: 기본값 (선언 불필요)

### 스타일링 규칙
- Tailwind CSS 유틸리티 클래스 우선 사용
- 컬러는 `colorPalette`에서 import하여 사용
- CSS Variables는 `cssVar` 객체 활용

### TypeScript 규칙
- 엄격한 타입 정의 사용
- `any` 타입 사용 금지
- interface보다 type 선호

### Provider 사용법

#### 테마 전환
```typescript
import { useTheme } from "next-themes";

const { theme, setTheme } = useTheme();
setTheme("dark"); // or "light", "system"
```

#### 모달 제어
```typescript
import { useModal } from "@/commons/providers/modal/modal.provider";

const { openModal, closeModal } = useModal();
openModal(<YourComponent />);
```

#### React Query
```typescript
import { useQuery } from "@tanstack/react-query";

const { data, isLoading } = useQuery({
  queryKey: ["key"],
  queryFn: fetchFunction,
});
```

## 개발 명령어

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start

# Lint 검사
npm run lint
```

## 주의사항

### React Query 설정
- `staleTime`: 5분 (데이터가 fresh 상태로 유지되는 시간)
- `gcTime`: 10분 (캐시 데이터가 메모리에 유지되는 시간)
- `refetchOnWindowFocus`: false (윈도우 포커스 시 자동 refetch 비활성화)

### 모달 시스템
- 모달 wrapper의 크기 제한 없음 (max-w, w-full 제거됨)
- 각 모달 컴포넌트에서 원하는 크기/스타일 적용
- ESC 키 및 오버레이 클릭으로 닫기 가능
- 모달 열릴 때 body 스크롤 자동 방지

### 테마 시스템
- Tailwind CSS의 `dark:` 클래스와 연동
- 시스템 테마 자동 감지 활성화
- 테마 전환 시 깜빡임 방지 설정됨

## 다음 작업 예정

- [ ] 일기 작성 UI 컴포넌트
- [ ] 감정 선택 컴포넌트
- [ ] 사진 업로드 기능
- [ ] 사용자 인증 시스템
- [ ] API 엔드포인트 구현

## Git 커밋 컨벤션

```
feat: 새로운 기능 추가
fix: 버그 수정
chore: 빌드 작업, 패키지 매니저 설정 등
docs: 문서 수정
style: 코드 포맷팅, 세미콜론 누락 등
refactor: 코드 리팩토링
test: 테스트 코드 추가/수정
```

모든 커밋에는 `Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>` 포함
