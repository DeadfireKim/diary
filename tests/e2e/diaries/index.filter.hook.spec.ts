import { test, expect } from "@playwright/test";
import { EmotionType } from "../../../src/commons/constants/enum";

const TEST_DIARIES = [
  {
    id: 1,
    title: "행복한 날",
    content: "오늘은 행복해요",
    emotion: EmotionType.Happy,
    createdAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: 2,
    title: "슬픈 날",
    content: "오늘은 슬퍼요",
    emotion: EmotionType.Sad,
    createdAt: "2024-01-02T00:00:00.000Z",
  },
  {
    id: 3,
    title: "놀란 날",
    content: "오늘은 놀랐어요",
    emotion: EmotionType.Surprise,
    createdAt: "2024-01-03T00:00:00.000Z",
  },
  {
    id: 4,
    title: "화난 날",
    content: "오늘은 화나요",
    emotion: EmotionType.Angry,
    createdAt: "2024-01-04T00:00:00.000Z",
  },
  {
    id: 5,
    title: "행복한 날2",
    content: "또 행복해요",
    emotion: EmotionType.Happy,
    createdAt: "2024-01-05T00:00:00.000Z",
  },
];

test.describe("Diaries Filter Hook", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/diaries");
    await page.waitForSelector('[data-testid="diaries-container"]');
    await page.evaluate((diaries) => {
      localStorage.setItem("diaries", JSON.stringify(diaries));
    }, TEST_DIARIES);
    await page.reload();
    await page.waitForSelector('[data-testid="diaries-container"]');
  });

  test("필터 선택박스에 전체/행복해요/슬퍼요/놀랐어요/화나요 옵션이 존재한다", async ({ page }) => {
    // Given: 필터 선택박스 열기
    await page.locator('[data-testid="diary-filter"] button').click();

    // Then: 옵션 목록 확인
    await expect(page.getByRole("option", { name: "전체" })).toBeVisible();
    await expect(page.getByRole("option", { name: "행복해요" })).toBeVisible();
    await expect(page.getByRole("option", { name: "슬퍼요" })).toBeVisible();
    await expect(page.getByRole("option", { name: "놀랐어요" })).toBeVisible();
    await expect(page.getByRole("option", { name: "화나요" })).toBeVisible();
  });

  test("전체 선택 시 모든 일기 카드가 표시된다", async ({ page }) => {
    // Then: 모든 일기 카드 표시
    await expect(page.locator('[data-testid="diary-card-1"]')).toBeVisible();
    await expect(page.locator('[data-testid="diary-card-2"]')).toBeVisible();
    await expect(page.locator('[data-testid="diary-card-3"]')).toBeVisible();
    await expect(page.locator('[data-testid="diary-card-4"]')).toBeVisible();
    await expect(page.locator('[data-testid="diary-card-5"]')).toBeVisible();
  });

  test("행복해요 필터 선택 시 Happy 감정 일기만 표시된다", async ({ page }) => {
    // When: 행복해요 필터 선택
    await page.locator('[data-testid="diary-filter"] button').click();
    await page.getByRole("option", { name: "행복해요" }).click();

    // Then: Happy 일기만 표시
    await expect(page.locator('[data-testid="diary-card-1"]')).toBeVisible();
    await expect(page.locator('[data-testid="diary-card-5"]')).toBeVisible();

    // And: 다른 감정 일기는 표시되지 않음
    await expect(page.locator('[data-testid="diary-card-2"]')).not.toBeVisible();
    await expect(page.locator('[data-testid="diary-card-3"]')).not.toBeVisible();
    await expect(page.locator('[data-testid="diary-card-4"]')).not.toBeVisible();
  });

  test("슬퍼요 필터 선택 시 Sad 감정 일기만 표시된다", async ({ page }) => {
    // When: 슬퍼요 필터 선택
    await page.locator('[data-testid="diary-filter"] button').click();
    await page.getByRole("option", { name: "슬퍼요" }).click();

    // Then: Sad 일기만 표시
    await expect(page.locator('[data-testid="diary-card-2"]')).toBeVisible();

    // And: 다른 감정 일기는 표시되지 않음
    await expect(page.locator('[data-testid="diary-card-1"]')).not.toBeVisible();
    await expect(page.locator('[data-testid="diary-card-3"]')).not.toBeVisible();
    await expect(page.locator('[data-testid="diary-card-4"]')).not.toBeVisible();
    await expect(page.locator('[data-testid="diary-card-5"]')).not.toBeVisible();
  });

  test("검색 후 필터 적용 시 검색+감정 조건이 모두 적용된다", async ({ page }) => {
    // Given: '행복' 검색 → 행복한 날(Happy), 행복한 날2(Happy) 표시
    await page.fill('[data-testid="search-input"]', "행복");

    await expect(page.locator('[data-testid="diary-card-1"]')).toBeVisible();
    await expect(page.locator('[data-testid="diary-card-5"]')).toBeVisible();
    await expect(page.locator('[data-testid="diary-card-2"]')).not.toBeVisible();

    // When: 슬퍼요 필터 선택 (검색 결과 안에서 필터)
    await page.locator('[data-testid="diary-filter"] button').click();
    await page.getByRole("option", { name: "슬퍼요" }).click();

    // Then: 검색 + 감정 조건 교집합 → 결과 없음
    await expect(page.locator('[data-testid="diary-card-1"]')).not.toBeVisible();
    await expect(page.locator('[data-testid="diary-card-5"]')).not.toBeVisible();
  });
});
