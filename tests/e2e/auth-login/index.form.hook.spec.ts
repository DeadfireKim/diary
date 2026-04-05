import { test, expect } from "@playwright/test";

const TEST_EMAIL = "a@c.com";
const TEST_PASSWORD = "1234qwer";

test.describe.configure({ mode: "serial" });

test.describe("AuthLogin 폼 등록 기능", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/auth/login");
    await page.waitForSelector('[data-testid="login-container"]');
  });

  test("모든 인풋 입력 시 로그인 버튼 활성화", async ({ page }) => {
    const submitButton = page.locator('[data-testid="login-submit-button"]');

    // 초기 상태: 비활성화
    await expect(submitButton).toBeDisabled();

    await page.fill('[data-testid="login-email-input"]', TEST_EMAIL);
    await expect(submitButton).toBeDisabled();

    await page.fill('[data-testid="login-password-input"]', TEST_PASSWORD);

    // 모든 입력 완료: 활성화
    await expect(submitButton).toBeEnabled();
  });

  test("성공 시나리오: loginUser API - accessToken이 정상적으로 반환된다", async ({
    page,
  }) => {
    await page.fill('[data-testid="login-email-input"]', TEST_EMAIL);
    await page.fill('[data-testid="login-password-input"]', TEST_PASSWORD);
    await page.click('[data-testid="login-submit-button"]');

    const successModal = page.locator('[data-testid="login-success-modal"]');
    await expect(successModal).toBeVisible({ timeout: 1900 });

    const accessToken = await successModal.getAttribute("data-access-token");
    expect(accessToken).toBeTruthy();
    expect(accessToken!.length).toBeGreaterThan(0);
  });

  test("성공 시나리오: fetchUserLoggedIn API - _id와 name이 정상적으로 반환된다", async ({
    page,
  }) => {
    await page.fill('[data-testid="login-email-input"]', TEST_EMAIL);
    await page.fill('[data-testid="login-password-input"]', TEST_PASSWORD);
    await page.click('[data-testid="login-submit-button"]');

    const successModal = page.locator('[data-testid="login-success-modal"]');
    await expect(successModal).toBeVisible({ timeout: 1900 });

    const userId = await successModal.getAttribute("data-user-id");
    const userName = await successModal.getAttribute("data-user-name");
    expect(userId).toBeTruthy();
    expect(userName).toBeTruthy();
  });

  test("실패 시나리오: API 실패 시 로그인 실패 모달을 표시한다", async ({ page }) => {
    await page.route("https://main-practice.codebootcamp.co.kr/graphql", (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          errors: [{ message: "이메일 또는 비밀번호가 올바르지 않습니다." }],
          data: null,
        }),
      });
    });

    await page.fill('[data-testid="login-email-input"]', "wrong@test.com");
    await page.fill('[data-testid="login-password-input"]', "wrongpassword");
    await page.click('[data-testid="login-submit-button"]');

    await expect(
      page.locator('[data-testid="login-failure-modal"]')
    ).toBeVisible({ timeout: 500 });
  });

  test("성공 모달 확인 클릭 시 일기목록 페이지로 이동", async ({ page }) => {
    await page.fill('[data-testid="login-email-input"]', TEST_EMAIL);
    await page.fill('[data-testid="login-password-input"]', TEST_PASSWORD);
    await page.click('[data-testid="login-submit-button"]');

    await expect(
      page.locator('[data-testid="login-success-modal"]')
    ).toBeVisible({ timeout: 1900 });

    await page.click('[data-testid="login-success-modal"] button:has-text("확인")');

    await page.waitForURL(/\/diaries/);
    expect(page.url()).toContain("/diaries");
  });
});
