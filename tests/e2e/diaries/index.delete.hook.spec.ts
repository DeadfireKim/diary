import { test, expect } from "@playwright/test";

const testDiaries = [
  {
    id: 1,
    title: "첫 번째 일기",
    content: "오늘은 행복한 하루였어요.",
    emotion: "HAPPY",
    createdAt: "2024-01-15T00:00:00.000Z",
  },
  {
    id: 2,
    title: "두 번째 일기",
    content: "오늘은 슬픈 하루였어요.",
    emotion: "SAD",
    createdAt: "2024-01-14T00:00:00.000Z",
  },
];

test.describe("일기 삭제 - 비로그인 유저", () => {
  test.beforeEach(async ({ page }) => {
    // addInitScript: 모든 네비게이션마다 bypass만 설정 (localStorage 제외)
    await page.addInitScript(() => {
      window.__TEST_BYPASS__ = false;
    });

    await page.goto("/diaries");

    // localStorage 데이터는 goto 이후 평가로 설정
    await page.evaluate((diaries) => {
      localStorage.setItem("diaries", JSON.stringify(diaries));
    }, testDiaries);

    await page.reload();
    await page.waitForSelector('[data-testid="diaries-container"]');
  });

  test("비로그인 시 삭제 아이콘(X)이 노출되지 않아야 한다", async ({ page }) => {
    // 일기 카드가 로드될 때까지 대기
    await expect(page.locator('[data-testid="diary-card-1"]')).toBeVisible();

    // 삭제 버튼이 존재하지 않아야 함
    const deleteButtons = page.locator('[data-testid^="diary-delete-btn-"]');
    await expect(deleteButtons).toHaveCount(0);
  });
});

test.describe("일기 삭제 - 로그인 유저", () => {
  test.beforeEach(async ({ page }) => {
    // addInitScript: 모든 네비게이션마다 bypass만 설정 (localStorage 제외)
    await page.addInitScript(() => {
      window.__TEST_BYPASS__ = true;
    });

    await page.goto("/diaries");

    // localStorage 데이터는 goto 이후 평가로 설정
    await page.evaluate((diaries) => {
      localStorage.setItem("diaries", JSON.stringify(diaries));
    }, testDiaries);

    await page.reload();
    await page.waitForSelector('[data-testid="diaries-container"]');
  });

  test("로그인 시 각 일기 카드에 삭제 아이콘(X)이 노출되어야 한다", async ({
    page,
  }) => {
    await expect(
      page.locator('[data-testid="diary-delete-btn-1"]')
    ).toBeVisible();
    await expect(
      page.locator('[data-testid="diary-delete-btn-2"]')
    ).toBeVisible();
  });

  test("삭제 아이콘(X) 클릭 시 일기 삭제 모달이 노출된다", async ({ page }) => {
    await page.locator('[data-testid="diary-delete-btn-1"]').click();

    await expect(page.getByText("정말로 삭제하시겠습니까?")).toBeVisible();
  });

  test("삭제 모달에서 취소 클릭 시 모달이 닫혀야 한다", async ({ page }) => {
    await page.locator('[data-testid="diary-delete-btn-1"]').click();
    await expect(page.getByText("정말로 삭제하시겠습니까?")).toBeVisible();

    await page.getByRole("button", { name: "취소" }).click();

    await expect(page.getByText("정말로 삭제하시겠습니까?")).not.toBeVisible();
  });

  test("삭제 모달에서 삭제 클릭 시 해당 일기가 로컬스토리지에서 제거되고 페이지가 새로고침된다", async ({
    page,
  }) => {
    await page.locator('[data-testid="diary-delete-btn-1"]').click();
    await expect(page.getByText("정말로 삭제하시겠습니까?")).toBeVisible();

    await Promise.all([
      page.waitForLoadState("domcontentloaded"),
      page.getByRole("dialog").getByRole("button", { name: "삭제" }).click(),
    ]);

    await page.waitForSelector('[data-testid="diaries-container"]');

    const diaries = await page.evaluate(() => {
      const data = localStorage.getItem("diaries");
      return data ? JSON.parse(data) : [];
    });

    const deletedDiary = diaries.find((d: { id: number }) => d.id === 1);
    expect(deletedDiary).toBeUndefined();
  });
});
