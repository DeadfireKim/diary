import { test, expect } from "@playwright/test";

test.describe.configure({ mode: "serial" });

const TEST_EMAIL = "a@c.com";
const TEST_PASSWORD = "1234qwer";

test.describe("Layout Auth Hook", () => {
  test("비로그인유저: /diaries 접속 시 로그인버튼 노출 및 클릭 시 /auth/login 이동", async ({
    page,
  }) => {
    // 비로그인 상태 보장
    await page.goto("/diaries");
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForSelector('[data-testid="diaries-container"]');

    // 로그인버튼 노출 확인
    await expect(page.locator('[data-testid="login-button"]')).toBeVisible();

    // 로그인버튼 클릭 → /auth/login 이동
    await page.click('[data-testid="login-button"]');
    await page.waitForURL(/\/auth\/login/);
    expect(page.url()).toContain("/auth/login");
  });

  test("로그인유저: 로그인 후 유저이름/로그아웃버튼 노출, 로그아웃 후 /diaries에서 로그인버튼 확인", async ({
    page,
  }) => {
    // 비로그인 상태에서 시작
    await page.goto("/auth/login");
    await page.evaluate(() => localStorage.clear());
    await page.waitForSelector('[data-testid="login-container"]');

    // 로그인
    await page.fill('[data-testid="login-email-input"]', TEST_EMAIL);
    await page.fill('[data-testid="login-password-input"]', TEST_PASSWORD);
    await page.click('[data-testid="login-submit-button"]');

    // 성공 모달 확인 클릭
    await expect(
      page.locator('[data-testid="login-success-modal"]')
    ).toBeVisible({ timeout: 1900 });
    await page.click('[data-testid="login-success-modal"] button:has-text("확인")');

    // /diaries 이동 확인
    await page.waitForURL(/\/diaries/);
    await page.waitForSelector('[data-testid="diaries-container"]');

    // 유저이름, 로그아웃버튼 노출 확인
    await expect(page.locator('[data-testid="auth-user-name"]')).toBeVisible();
    await expect(page.locator('[data-testid="logout-button"]')).toBeVisible();

    // 로그아웃 클릭 → /auth/login 이동
    await page.click('[data-testid="logout-button"]');
    await page.waitForURL(/\/auth\/login/);
    await page.waitForSelector('[data-testid="login-container"]');

    // /diaries 재접속
    await page.goto("/diaries");
    await page.waitForSelector('[data-testid="diaries-container"]');

    // 로그인버튼 노출 확인
    await expect(page.locator('[data-testid="login-button"]')).toBeVisible();
  });
});
