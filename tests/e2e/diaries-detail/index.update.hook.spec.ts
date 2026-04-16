import { test, expect } from "@playwright/test";
import { EmotionType } from "@/commons/constants/enum";

test.describe("DiariesDetail 일기 수정 기능", () => {
  test.beforeEach(async ({ page }) => {
    // 로그인 유저 기본값 설정 (테스트 바이패스)
    await page.addInitScript(() => {
      window.__TEST_BYPASS__ = true;
    });

    // 로컬스토리지에 테스트 일기 데이터 설정
    await page.goto("/diaries");
    await page.evaluate(() => {
      localStorage.clear();
      const testDiaries = [
        {
          id: 1,
          title: "첫 번째 일기",
          content: "오늘은 정말 행복한 하루였어요.",
          emotion: "HAPPY",
          createdAt: "2024-01-15T00:00:00.000Z",
        },
      ];
      localStorage.setItem("diaries", JSON.stringify(testDiaries));
      localStorage.removeItem("retrospects");
    });
  });

  test("수정 버튼 클릭 시 수정 모드로 전환된다", async ({ page }) => {
    await page.goto("/diaries/1");
    await page.waitForSelector('[data-testid="diaries-detail-container"]');

    // 수정 전: edit-mode가 없거나 view-mode 상태여야 함
    const editModeSection = page.locator('[data-testid="edit-mode"]');
    await expect(editModeSection).not.toBeVisible();

    // 수정 버튼 클릭
    const editButton = page.locator('[data-testid="edit-button"]');
    await editButton.click();

    // 수정 모드로 전환 확인
    await expect(editModeSection).toBeVisible();
  });

  test("수정 모드에서 회고 입력창이 비활성화(disabled)된다", async ({ page }) => {
    await page.goto("/diaries/1");
    await page.waitForSelector('[data-testid="diaries-detail-container"]');

    // 수정 버튼 클릭하여 수정 모드로 전환
    const editButton = page.locator('[data-testid="edit-button"]');
    await editButton.click();

    await page.waitForSelector('[data-testid="edit-mode"]');

    // 회고 입력창이 disabled 상태인지 확인
    const retrospectInput = page.locator('[data-testid="retrospect-input"]');
    await expect(retrospectInput).toBeDisabled();
  });

  test("수정 모드에서 title/content 변경 후 수정하기 클릭 시 localStorage가 업데이트된다", async ({
    page,
  }) => {
    await page.goto("/diaries/1");
    await page.waitForSelector('[data-testid="diaries-detail-container"]');

    // 수정 버튼 클릭
    const editButton = page.locator('[data-testid="edit-button"]');
    await editButton.click();

    await page.waitForSelector('[data-testid="edit-mode"]');

    // title 변경
    const titleInput = page.locator('[data-testid="edit-title-input"]');
    await titleInput.fill("수정된 제목입니다");

    // content 변경
    const contentInput = page.locator('[data-testid="edit-content-input"]');
    await contentInput.fill("수정된 내용입니다");

    // 수정하기 버튼 클릭
    const submitButton = page.locator('[data-testid="edit-submit-button"]');
    await Promise.all([
      page.waitForNavigation(),
      submitButton.click(),
    ]);

    // 페이지 새로고침 후 로컬스토리지 확인
    await page.waitForSelector('[data-testid="diaries-detail-container"]');

    const diaries = await page.evaluate(() => {
      const data = localStorage.getItem("diaries");
      return data ? JSON.parse(data) : null;
    });

    expect(diaries).not.toBeNull();
    const updatedDiary = diaries.find((d: { id: number }) => d.id === 1);
    expect(updatedDiary).toBeDefined();
    expect(updatedDiary.title).toBe("수정된 제목입니다");
    expect(updatedDiary.content).toBe("수정된 내용입니다");
  });

  test("수정 완료 후 수정 모드가 종료되고 수정전 화면으로 복귀된다", async ({
    page,
  }) => {
    await page.goto("/diaries/1");
    await page.waitForSelector('[data-testid="diaries-detail-container"]');

    // 수정 버튼 클릭
    const editButton = page.locator('[data-testid="edit-button"]');
    await editButton.click();

    await page.waitForSelector('[data-testid="edit-mode"]');

    // 내용 변경 후 수정하기
    const titleInput = page.locator('[data-testid="edit-title-input"]');
    await titleInput.fill("수정된 제목");

    const submitButton = page.locator('[data-testid="edit-submit-button"]');
    await Promise.all([
      page.waitForNavigation(),
      submitButton.click(),
    ]);

    // 새로고침 후 edit-mode가 사라지고 view-mode가 다시 보여야 함
    await page.waitForSelector('[data-testid="diaries-detail-container"]');

    const editModeSection = page.locator('[data-testid="edit-mode"]');
    await expect(editModeSection).not.toBeVisible();

    // 수정된 제목이 표시되는지 확인
    const titleElement = page.locator('[data-testid="diary-detail-title"]');
    await expect(titleElement).toContainText("수정된 제목");
  });

  test("emotion 변경 후 수정하기 클릭 시 localStorage에 업데이트된다", async ({
    page,
  }) => {
    await page.goto("/diaries/1");
    await page.waitForSelector('[data-testid="diaries-detail-container"]');

    // 수정 버튼 클릭
    const editButton = page.locator('[data-testid="edit-button"]');
    await editButton.click();

    await page.waitForSelector('[data-testid="edit-mode"]');

    // emotion 변경 (SAD로 변경)
    const emotionSelect = page.locator('[data-testid="edit-emotion-select"]');
    await emotionSelect.selectOption(EmotionType.Sad);

    // 수정하기 버튼 클릭 (emotion만 변경되어도 활성화)
    const submitButton = page.locator('[data-testid="edit-submit-button"]');
    await Promise.all([
      page.waitForNavigation(),
      submitButton.click(),
    ]);

    // 페이지 새로고침 후 로컬스토리지 확인
    await page.waitForSelector('[data-testid="diaries-detail-container"]');

    const diaries = await page.evaluate(() => {
      const data = localStorage.getItem("diaries");
      return data ? JSON.parse(data) : null;
    });

    const updatedDiary = diaries.find((d: { id: number }) => d.id === 1);
    expect(updatedDiary.emotion).toBe(EmotionType.Sad);
  });
});
