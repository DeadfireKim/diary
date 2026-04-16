import { test, expect } from "@playwright/test";
import { EmotionType } from "../../../src/commons/constants/enum";

const MOCK_DIARIES = [
  {
    id: 1,
    title: "오늘은 기분이 좋다",
    content: "행복한 하루였다",
    emotion: EmotionType.Happy,
    createdAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: 2,
    title: "슬픈 하루",
    content: "많이 울었다",
    emotion: EmotionType.Sad,
    createdAt: "2024-01-02T00:00:00.000Z",
  },
  {
    id: 3,
    title: "화가 난 날",
    content: "짜증나는 일이 있었다",
    emotion: EmotionType.Angry,
    createdAt: "2024-01-03T00:00:00.000Z",
  },
];

test.describe("Diaries Search Hook", () => {
  test.beforeEach(async ({ page }) => {
    // localStorage에 테스트 데이터 설정 후 페이지 이동
    await page.goto("/diaries");
    await page.waitForSelector('[data-testid="diaries-container"]');
    await page.evaluate((diaries) => {
      localStorage.setItem("diaries", JSON.stringify(diaries));
    }, MOCK_DIARIES);
    // 데이터 반영을 위해 페이지 리로드
    await page.reload();
    await page.waitForSelector('[data-testid="diaries-container"]');
  });

  test("검색어 입력 전에는 모든 일기가 표시된다", async ({ page }) => {
    // Then: 모든 일기 카드가 표시된다
    await expect(page.locator('[data-testid="diary-card-1"]')).toBeVisible();
    await expect(page.locator('[data-testid="diary-card-2"]')).toBeVisible();
    await expect(page.locator('[data-testid="diary-card-3"]')).toBeVisible();
  });

  test("검색어를 입력하면 제목에 포함된 일기만 표시된다", async ({ page }) => {
    // When: 검색창에 '슬픈' 입력
    await page.fill('[data-testid="search-input"]', "슬픈");

    // Then: '슬픈 하루' 일기만 표시된다
    await expect(page.locator('[data-testid="diary-card-2"]')).toBeVisible();

    // And: 다른 일기는 표시되지 않는다
    await expect(page.locator('[data-testid="diary-card-1"]')).not.toBeVisible();
    await expect(page.locator('[data-testid="diary-card-3"]')).not.toBeVisible();
  });

  test("검색어를 지우면 다시 모든 일기가 표시된다", async ({ page }) => {
    // Given: 검색어 입력 상태
    await page.fill('[data-testid="search-input"]', "슬픈");
    await expect(page.locator('[data-testid="diary-card-2"]')).toBeVisible();
    await expect(page.locator('[data-testid="diary-card-1"]')).not.toBeVisible();

    // When: 검색어를 지우면
    await page.fill('[data-testid="search-input"]', "");

    // Then: 모든 일기가 다시 표시된다
    await expect(page.locator('[data-testid="diary-card-1"]')).toBeVisible();
    await expect(page.locator('[data-testid="diary-card-2"]')).toBeVisible();
    await expect(page.locator('[data-testid="diary-card-3"]')).toBeVisible();
  });

  test("검색 결과가 없으면 일기 카드가 표시되지 않는다", async ({ page }) => {
    // When: 일치하는 일기가 없는 검색어 입력
    await page.fill('[data-testid="search-input"]', "존재하지않는일기제목");

    // Then: 어떤 일기 카드도 표시되지 않는다
    await expect(page.locator('[data-testid="diary-card-1"]')).not.toBeVisible();
    await expect(page.locator('[data-testid="diary-card-2"]')).not.toBeVisible();
    await expect(page.locator('[data-testid="diary-card-3"]')).not.toBeVisible();
  });

  test("검색은 대소문자를 구분하지 않는다", async ({ page }) => {
    // Given: 영문 소문자로 된 일기 추가
    const engDiaries = [
      ...MOCK_DIARIES,
      {
        id: 4,
        title: "Happy Day",
        content: "Great day",
        emotion: EmotionType.Happy,
        createdAt: "2024-01-04T00:00:00.000Z",
      },
    ];
    await page.evaluate((diaries) => {
      localStorage.setItem("diaries", JSON.stringify(diaries));
    }, engDiaries);
    await page.reload();
    await page.waitForSelector('[data-testid="diaries-container"]');

    // When: 대문자로 검색
    await page.fill('[data-testid="search-input"]', "happy");

    // Then: 'Happy Day' 일기가 표시된다
    await expect(page.locator('[data-testid="diary-card-4"]')).toBeVisible();

    // And: 다른 일기는 표시되지 않는다
    await expect(page.locator('[data-testid="diary-card-1"]')).not.toBeVisible();
    await expect(page.locator('[data-testid="diary-card-2"]')).not.toBeVisible();
    await expect(page.locator('[data-testid="diary-card-3"]')).not.toBeVisible();
  });
});
