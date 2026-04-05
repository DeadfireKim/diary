import { test, expect } from "@playwright/test";

const uniqueEmail = () =>
  `test${Date.now()}${Math.random().toString(36).slice(2, 6)}@test.com`;

const TEST_PASSWORD = "Test1234!";
const TEST_NAME = "테스트유저";

const fillForm = async (
  page: Parameters<Parameters<typeof test>[1]>[0],
  email: string
) => {
  await page.fill('[data-testid="signup-email-input"]', email);
  await page.fill('[data-testid="signup-password-input"]', TEST_PASSWORD);
  await page.fill('[data-testid="signup-password-confirm-input"]', TEST_PASSWORD);
  await page.fill('[data-testid="signup-name-input"]', TEST_NAME);
};

test.describe.configure({ mode: "serial" });

test.describe("AuthSignup 폼 등록 기능", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/auth/signup");
    await page.waitForSelector('[data-testid="signup-container"]');
  });

  test("모든 인풋 입력 시 회원가입 버튼 활성화", async ({ page }) => {
    const submitButton = page.locator('[data-testid="signup-submit-button"]');

    // 초기 상태: 비활성화
    await expect(submitButton).toBeDisabled();

    await page.fill('[data-testid="signup-email-input"]', "test@test.com");
    await expect(submitButton).toBeDisabled();

    await page.fill('[data-testid="signup-password-input"]', TEST_PASSWORD);
    await expect(submitButton).toBeDisabled();

    await page.fill('[data-testid="signup-password-confirm-input"]', TEST_PASSWORD);
    await expect(submitButton).toBeDisabled();

    await page.fill('[data-testid="signup-name-input"]', TEST_NAME);

    // 모든 입력 완료: 활성화
    await expect(submitButton).toBeEnabled();
  });

  test("성공 시나리오: 회원가입 성공 시 _id가 반환된다", async ({ page }) => {
    await fillForm(page, uniqueEmail());

    await page.click('[data-testid="signup-submit-button"]');

    // 성공 모달 대기 (network timeout < 2000ms)
    const successModal = page.locator('[data-testid="signup-success-modal"]');
    await expect(successModal).toBeVisible({ timeout: 1900 });

    // _id 반환 확인
    const userId = await successModal.getAttribute("data-user-id");
    expect(userId).toBeTruthy();
    expect(userId!.length).toBeGreaterThan(0);
  });

  test("실패 시나리오: API 실패 시 가입 실패 모달을 표시한다", async ({ page }) => {
    // API 모킹 (실패 응답)
    await page.route("https://main-practice.codebootcamp.co.kr/graphql", (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          errors: [{ message: "이미 존재하는 이메일입니다." }],
          data: null,
        }),
      });
    });

    await fillForm(page, "existing@test.com");
    await page.click('[data-testid="signup-submit-button"]');

    // 실패 모달 확인 (network 아님 < 500ms)
    await expect(
      page.locator('[data-testid="signup-failure-modal"]')
    ).toBeVisible({ timeout: 500 });
  });

  test("성공 모달 확인 클릭 시 로그인 페이지로 이동", async ({ page }) => {
    await fillForm(page, uniqueEmail());
    await page.click('[data-testid="signup-submit-button"]');

    await expect(
      page.locator('[data-testid="signup-success-modal"]')
    ).toBeVisible({ timeout: 1900 });

    await page.click('[data-testid="signup-success-modal"] button:has-text("확인")');

    await page.waitForURL(/\/auth\/login/);
    expect(page.url()).toContain("/auth/login");
  });
});
