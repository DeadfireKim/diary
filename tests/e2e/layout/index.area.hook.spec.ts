import { test, expect } from "@playwright/test";

test.describe("Layout Area Visibility", () => {
  test("일기목록 페이지에서 모든 영역이 표시된다", async ({ page }) => {
    // Given: 일기목록 페이지로 이동
    await page.goto("/diaries");
    await page.waitForSelector('[data-testid="layout-main"]');

    // Then: 모든 레이아웃 영역이 표시된다
    await expect(page.locator('[data-testid="layout-header"]')).toBeVisible();
    await expect(page.locator('[data-testid="layout-banner"]')).toBeVisible();
    await expect(
      page.locator('[data-testid="layout-navigation"]')
    ).toBeVisible();
    await expect(page.locator('[data-testid="layout-footer"]')).toBeVisible();
  });

  test("일기상세 페이지에서 header와 footer만 표시된다", async ({ page }) => {
    // Given: 일기상세 페이지로 이동
    await page.goto("/diaries/123");
    await page.waitForSelector('[data-testid="layout-main"]');

    // Then: header와 footer는 표시된다
    await expect(page.locator('[data-testid="layout-header"]')).toBeVisible();
    await expect(page.locator('[data-testid="layout-footer"]')).toBeVisible();

    // And: banner와 navigation은 숨겨진다
    await expect(
      page.locator('[data-testid="layout-banner"]')
    ).not.toBeVisible();
    await expect(
      page.locator('[data-testid="layout-navigation"]')
    ).not.toBeVisible();
  });

  test("홈페이지에서 모든 영역이 표시된다", async ({ page }) => {
    // Given: 홈페이지로 이동
    await page.goto("/");
    await page.waitForSelector('[data-testid="layout-main"]');

    // Then: 모든 레이아웃 영역이 표시된다 (기본값)
    await expect(page.locator('[data-testid="layout-header"]')).toBeVisible();
    await expect(page.locator('[data-testid="layout-banner"]')).toBeVisible();
    await expect(
      page.locator('[data-testid="layout-navigation"]')
    ).toBeVisible();
    await expect(page.locator('[data-testid="layout-footer"]')).toBeVisible();
  });
});
