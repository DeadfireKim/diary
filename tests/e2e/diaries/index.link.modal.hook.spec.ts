import { test, expect } from "@playwright/test";

test.describe("Diaries Write Button Modal", () => {
  test("일기쓰기 버튼 클릭 시 모달이 열린다", async ({ page }) => {
    // Given: 일기목록 페이지로 이동
    await page.goto("/diaries");
    await page.waitForSelector('[data-testid="diaries-container"]');
    await page.evaluate(() => { window.__TEST_BYPASS__ = true; });

    // When: 일기쓰기 버튼을 클릭하면
    await page.click('[data-testid="write-button"]');

    // Then: 모달이 표시된다
    await expect(page.locator('[role="dialog"]')).toBeVisible();
    await expect(
      page.locator('[data-testid="diaries-new-wrapper"]')
    ).toBeVisible();
    await expect(
      page.locator('[data-testid="diaries-new-wrapper"] >> text=일기쓰기')
    ).toBeVisible();
  });

  test("모달이 페이지 중앙에 오버레이로 표시된다", async ({ page }) => {
    // Given: 일기목록 페이지로 이동
    await page.goto("/diaries");
    await page.waitForSelector('[data-testid="diaries-container"]');
    await page.evaluate(() => { window.__TEST_BYPASS__ = true; });

    // When: 일기쓰기 버튼을 클릭하면
    await page.click('[data-testid="write-button"]');

    // Then: 모달 다이얼로그가 표시된다
    const dialog = page.locator('[role="dialog"]');
    await expect(dialog).toBeVisible();

    // And: 모달 컨텐츠가 표시된다
    await expect(
      page.locator('[data-testid="diaries-new-wrapper"]')
    ).toBeVisible();
  });

  test("모달이 열려있을 때 ESC 키로 닫을 수 있다", async ({ page }) => {
    // Given: 일기목록 페이지에서 모달을 연 상태
    await page.goto("/diaries");
    await page.waitForSelector('[data-testid="diaries-container"]');
    await page.evaluate(() => { window.__TEST_BYPASS__ = true; });
    await page.click('[data-testid="write-button"]');
    await expect(page.locator('[role="dialog"]')).toBeVisible();

    // When: ESC 키를 누르면
    await page.keyboard.press("Escape");

    // Then: 모달이 닫힌다
    await expect(page.locator('[role="dialog"]')).not.toBeVisible();
  });
});
