import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright E2E 테스트 설정
 *
 * 주의사항:
 * - baseURL을 사용하여 page.goto()에서는 경로만 사용
 * - timeout은 2000ms 미만으로 설정
 * - data-testid를 사용하여 CSS Module 충돌 방지
 */

// 병렬 에이전트별 포트 분리: 기본 3000 + agent index
const agentIndex = parseInt(process.env.AGENT_INDEX ?? '0');
const port = 3000 + agentIndex;

export default defineConfig({
  // 테스트 디렉토리
  testDir: './tests/e2e',

  // 테스트 파일 패턴
  testMatch: '**/*.spec.ts',

  // 각 테스트의 최대 실행 시간 (30초)
  timeout: 30000,

  // expect()의 최대 대기 시간 (5초)
  expect: {
    timeout: 5000,
  },

  // 테스트 실패 시 재시도 횟수
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,

  // 병렬 실행 워커 수
  workers: process.env.CI ? 1 : undefined,

  // 리포터 설정
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['list'],
  ],

  // 모든 프로젝트에 공통으로 적용되는 설정
  use: {
    // Base URL (page.goto()에서 상대 경로 사용 가능)
    baseURL: `http://localhost:${port}`,

    // 테스트 실패 시 스크린샷 촬영
    screenshot: 'only-on-failure',

    // 테스트 실패 시 비디오 녹화
    video: 'retain-on-failure',

    // 테스트 실패 시 trace 수집
    trace: 'retain-on-failure',

    // 액션 타임아웃 (10초)
    actionTimeout: 10000,

    // 네비게이션 타임아웃 (30초)
    navigationTimeout: 30000,
  },

  // 브라우저별 테스트 프로젝트 설정
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // 필요시 아래 브라우저 주석 해제
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],

  // 웹 서버 설정 (테스트 실행 전 자동으로 dev 서버 시작)
  webServer: {
    command: `npm run dev -- --port ${port}`,
    url: `http://localhost:${port}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
    stdout: 'ignore',
    stderr: 'pipe',
    env: {
      NEXT_PUBLIC_TEST_ENV: 'test',
    },
  },
});
