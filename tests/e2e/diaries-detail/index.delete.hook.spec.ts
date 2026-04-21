import { test, expect } from "@playwright/test";

const testDiary = {
  id: 1,
  title: "테스트 일기",
  content: "오늘은 행복한 하루였어요.",
  emotion: "HAPPY",
  createdAt: "2024-01-15T00:00:00.000Z",
};

test.describe("일기 상세 삭제 기능", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript((diary) => {
      window.__TEST_BYPASS__ = true;
      localStorage.setItem("diaries", JSON.stringify([diary]));
      localStorage.removeItem("retrospects");
    }, testDiary);

    await page.goto("/diaries/1");
    await page.waitForSelector('[data-testid="diaries-detail-container"]');
  });

  test("삭제 버튼 클릭 시 일기 삭제 모달이 노출된다", async ({ page }) => {
    await page.locator('[data-testid="delete-diary-button"]').click();

    await expect(page.getByText("정말로 삭제하시겠습니까?")).toBeVisible();
  });

  test("삭제 모달에서 취소 클릭 시 모달이 닫혀야 한다", async ({ page }) => {
    await page.locator('[data-testid="delete-diary-button"]').click();
    await expect(page.getByText("정말로 삭제하시겠습니까?")).toBeVisible();

    await page.getByRole("button", { name: "취소" }).click();

    await expect(page.getByText("정말로 삭제하시겠습니까?")).not.toBeVisible();
  });

  test("삭제 모달에서 삭제 클릭 시 해당 일기가 로컬스토리지에서 제거되고 /diaries로 이동한다", async ({
    page,
  }) => {
    await page.locator('[data-testid="delete-diary-button"]').click();
    await expect(page.getByText("정말로 삭제하시겠습니까?")).toBeVisible();

    await Promise.all([
      page.waitForURL("**/diaries"),
      page.getByRole("dialog").getByRole("button", { name: "삭제" }).click(),
    ]);

    await page.waitForSelector('[data-testid="diaries-container"]');

    const diaries = await page.evaluate(() => {
      const data = localStorage.getItem("diaries");
      return data ? JSON.parse(data) : [];
    });

    const deletedDiary = diaries.find((d: { id: number }) => d.id === 1);
    expect(deletedDiary).toBeUndefined();

    expect(page.url()).toContain("/diaries");
  });
});
