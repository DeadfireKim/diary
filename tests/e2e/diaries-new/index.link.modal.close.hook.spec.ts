import { test, expect } from "@playwright/test";

test.describe("Diaries New Modal Close Hook", () => {
  test("닫기 버튼 클릭 시 등록취소 모달이 2중 모달로 표시된다", async ({
    page,
  }) => {
    // Given: 일기목록 페이지에서 일기쓰기 모달을 연 상태
    await page.goto("/diaries");
    await page.waitForSelector('[data-testid="diaries-container"]');
    await page.click('[data-testid="write-button"]');
    await expect(page.locator('[data-testid="diaries-new-wrapper"]')).toBeVisible();

    // When: 닫기 버튼을 클릭하면
    await page.click('[data-testid="diaries-new-close-button"]');

    // Then: 등록취소 모달이 표시된다
    await expect(page.locator('[data-testid="cancel-confirm-modal"]')).toBeVisible();

    // And: 일기쓰기 모달도 여전히 보인다 (2중 모달)
    await expect(page.locator('[data-testid="diaries-new-wrapper"]')).toBeVisible();

    // And: 두 개의 dialog role이 존재한다
    const dialogs = page.locator('[role="dialog"]');
    await expect(dialogs).toHaveCount(2);
  });

  test("등록취소 모달의 계속작성 버튼 클릭 시 등록취소 모달만 닫힌다", async ({
    page,
  }) => {
    // Given: 일기쓰기 모달을 열고 닫기 버튼을 눌러 등록취소 모달을 연 상태
    await page.goto("/diaries");
    await page.waitForSelector('[data-testid="diaries-container"]');
    await page.click('[data-testid="write-button"]');
    await expect(page.locator('[data-testid="diaries-new-wrapper"]')).toBeVisible();
    await page.click('[data-testid="diaries-new-close-button"]');
    await expect(page.locator('[data-testid="cancel-confirm-modal"]')).toBeVisible();

    // When: 계속작성 버튼을 클릭하면
    await page.click('[data-testid="cancel-confirm-modal"] >> text=계속작성');

    // Then: 등록취소 모달은 닫힌다
    await expect(page.locator('[data-testid="cancel-confirm-modal"]')).not.toBeVisible();

    // And: 일기쓰기 모달은 여전히 보인다
    await expect(page.locator('[data-testid="diaries-new-wrapper"]')).toBeVisible();

    // And: 하나의 dialog role만 존재한다
    const dialogs = page.locator('[role="dialog"]');
    await expect(dialogs).toHaveCount(1);
  });

  test("등록취소 모달의 등록취소 버튼 클릭 시 모든 모달이 닫힌다", async ({
    page,
  }) => {
    // Given: 일기쓰기 모달을 열고 닫기 버튼을 눌러 등록취소 모달을 연 상태
    await page.goto("/diaries");
    await page.waitForSelector('[data-testid="diaries-container"]');
    await page.click('[data-testid="write-button"]');
    await expect(page.locator('[data-testid="diaries-new-wrapper"]')).toBeVisible();
    await page.click('[data-testid="diaries-new-close-button"]');
    await expect(page.locator('[data-testid="cancel-confirm-modal"]')).toBeVisible();

    // When: 등록취소 버튼을 클릭하면
    await page.click('[data-testid="cancel-confirm-modal"] >> text=등록취소');

    // Then: 등록취소 모달이 닫힌다
    await expect(page.locator('[data-testid="cancel-confirm-modal"]')).not.toBeVisible();

    // And: 일기쓰기 모달도 닫힌다
    await expect(page.locator('[data-testid="diaries-new-wrapper"]')).not.toBeVisible();

    // And: dialog role이 존재하지 않는다
    const dialogs = page.locator('[role="dialog"]');
    await expect(dialogs).toHaveCount(0);
  });
});
