import { test, expect } from "@playwright/test";
import { EmotionType } from "../../../src/commons/constants/enum";

const TEST_DIARIES = [
  {
    id: 1,
    title: "첫 번째 일기",
    content: "첫 번째 일기 내용",
    emotion: EmotionType.Happy,
    createdAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: 2,
    title: "두 번째 일기",
    content: "두 번째 일기 내용",
    emotion: EmotionType.Sad,
    createdAt: "2024-01-02T00:00:00.000Z",
  },
];

const TEST_RETROSPECTS = [
  {
    id: 1,
    content: "일기1의 첫 번째 회고",
    diaryId: 1,
    createdAt: "2024.01.05",
  },
  {
    id: 2,
    content: "일기1의 두 번째 회고",
    diaryId: 1,
    createdAt: "2024.01.06",
  },
  {
    id: 3,
    content: "일기2의 회고",
    diaryId: 2,
    createdAt: "2024.01.07",
  },
];

test.describe("DiariesDetail 회고 바인딩", () => {
  test.beforeEach(async ({ page }) => {
    // 로그인 유저 기본값 설정 (테스트 바이패스)
    await page.addInitScript(() => {
      window.__TEST_BYPASS__ = true;
    });

    // localStorage에 데이터 설정 후 페이지 이동
    await page.goto("/diaries");
    await page.evaluate(
      ({ diaries, retrospects }) => {
        localStorage.setItem("diaries", JSON.stringify(diaries));
        localStorage.setItem("retrospects", JSON.stringify(retrospects));
      },
      { diaries: TEST_DIARIES, retrospects: TEST_RETROSPECTS }
    );
  });

  test("diaryId=1과 일치하는 회고만 표시된다", async ({ page }) => {
    await page.goto("/diaries/1");
    await page.waitForSelector('[data-testid="diaries-detail-container"]');

    const items = page.locator('[data-testid="retrospect-item"]');
    await expect(items).toHaveCount(2);
  });

  test("회고의 content가 올바르게 바인딩된다", async ({ page }) => {
    await page.goto("/diaries/1");
    await page.waitForSelector('[data-testid="diaries-detail-container"]');

    const items = page.locator('[data-testid="retrospect-item"]');
    await expect(items.first()).toContainText("일기1의 첫 번째 회고");
    await expect(items.nth(1)).toContainText("일기1의 두 번째 회고");
  });

  test("회고의 createdAt이 올바르게 바인딩된다", async ({ page }) => {
    await page.goto("/diaries/1");
    await page.waitForSelector('[data-testid="diaries-detail-container"]');

    const items = page.locator('[data-testid="retrospect-item"]');
    await expect(items.first()).toContainText("2024.01.05");
    await expect(items.nth(1)).toContainText("2024.01.06");
  });

  test("다른 diaryId의 회고는 표시되지 않는다", async ({ page }) => {
    await page.goto("/diaries/1");
    await page.waitForSelector('[data-testid="diaries-detail-container"]');

    const items = page.locator('[data-testid="retrospect-item"]');
    await expect(items).toHaveCount(2);
    const allText = await items.allTextContents();
    expect(allText.some((t) => t.includes("일기2의 회고"))).toBe(false);
  });

  test("로컬스토리지에 회고가 없으면 빈 목록이 표시된다", async ({ page }) => {
    await page.evaluate(() => localStorage.removeItem("retrospects"));
    await page.goto("/diaries/1");
    await page.waitForSelector('[data-testid="diaries-detail-container"]');

    const items = page.locator('[data-testid="retrospect-item"]');
    await expect(items).toHaveCount(0);
  });
});
