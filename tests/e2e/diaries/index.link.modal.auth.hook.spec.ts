import { test, expect } from "@playwright/test";

test.describe("Diaries 일기쓰기버튼 액션 GUARD", () => {
  test("비로그인유저: 일기쓰기버튼 클릭 시 로그인요청모달 노출", async ({
    page,
  }) => {
    await page.goto("/diaries");
    await page.waitForSelector('[data-testid="diaries-container"]');

    // 비로그인 상태 설정
    await page.evaluate(() => {
      window.__TEST_BYPASS__ = false;
    });

    await page.click('[data-testid="write-button"]');

    // 로그인하시겠습니까 모달 노출 확인
    await expect(page.getByText("로그인하시겠습니까?")).toBeVisible();
  });

  test("로그인유저: 일기쓰기버튼 클릭 시 일기쓰기 모달 노출", async ({
    page,
  }) => {
    await page.goto("/diaries");
    await page.waitForSelector('[data-testid="diaries-container"]');

    // 로그인 상태 설정 (window.__TEST_BYPASS__ = true)
    await page.evaluate(() => {
      window.__TEST_BYPASS__ = true;
    });

    await page.click('[data-testid="write-button"]');

    // 일기쓰기 모달 노출 확인
    await expect(
      page.locator('[data-testid="diaries-new-wrapper"]')
    ).toBeVisible();
  });
});
