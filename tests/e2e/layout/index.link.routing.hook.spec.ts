import { test, expect } from "@playwright/test";

test.describe("Layout Link Routing", () => {
  test("Header 로고 클릭 시 일기목록 페이지로 이동", async ({ page }) => {
    // Given: 사진목록 페이지에 있을 때
    await page.goto("/pictures");
    await page.waitForSelector('[data-testid="layout-header"]');

    // When: Header 로고를 클릭하면
    await page.click('[data-testid="header-logo"]');
    await page.waitForSelector('[data-testid="layout-main"]');

    // Then: 일기목록 페이지로 이동한다
    await expect(page).toHaveURL("/diaries");
  });

  test("Navigation 일기보관함 클릭 시 일기목록 페이지로 이동 및 active 상태 확인", async ({
    page,
  }) => {
    // Given: 홈페이지에 있을 때
    await page.goto("/");
    await page.waitForSelector('[data-testid="layout-navigation"]');

    // When: Navigation 일기보관함을 클릭하면
    await page.click('[data-testid="nav-link-diaries"]');
    await page.waitForSelector('[data-testid="layout-main"]');

    // Then: 일기목록 페이지로 이동하고 active 클래스가 적용된다
    await expect(page).toHaveURL("/diaries");
    const diariesLink = page.locator('[data-testid="nav-link-diaries"]');
    await expect(diariesLink).toHaveClass(/active/);
  });

  test("일기목록에서 사진보관함으로 이동 시 active 상태 변경 확인", async ({
    page,
  }) => {
    // Given: 일기목록 페이지에 있을 때
    await page.goto("/diaries");
    await page.waitForSelector('[data-testid="layout-navigation"]');

    // Then: 일기보관함이 active 상태이다
    const diariesLink = page.locator('[data-testid="nav-link-diaries"]');
    await expect(diariesLink).toHaveClass(/active/);

    // When: 사진보관함을 클릭하면
    await page.click('[data-testid="nav-link-pictures"]');
    await page.waitForSelector('[data-testid="layout-main"]');

    // Then: 사진보관함 페이지로 이동하고 사진보관함이 active 상태가 된다
    await expect(page).toHaveURL("/pictures");
    const picturesLink = page.locator('[data-testid="nav-link-pictures"]');
    await expect(picturesLink).toHaveClass(/active/);

    // And: 일기보관함은 active 상태가 아니다
    await expect(diariesLink).not.toHaveClass(/active/);
  });

  test("사진보관함에서 일기보관함으로 이동 시 active 상태 변경 확인", async ({
    page,
  }) => {
    // Given: 사진보관함 페이지에 있을 때
    await page.goto("/pictures");
    await page.waitForSelector('[data-testid="layout-navigation"]');

    // Then: 사진보관함이 active 상태이다
    const picturesLink = page.locator('[data-testid="nav-link-pictures"]');
    await expect(picturesLink).toHaveClass(/active/);

    // When: 일기보관함을 클릭하면
    await page.click('[data-testid="nav-link-diaries"]');
    await page.waitForSelector('[data-testid="layout-main"]');

    // Then: 일기목록 페이지로 이동하고 일기보관함이 active 상태가 된다
    await expect(page).toHaveURL("/diaries");
    const diariesLink = page.locator('[data-testid="nav-link-diaries"]');
    await expect(diariesLink).toHaveClass(/active/);

    // And: 사진보관함은 active 상태가 아니다
    await expect(picturesLink).not.toHaveClass(/active/);
  });
});
