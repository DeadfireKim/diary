import { test, expect } from "@playwright/test";

test.describe("Diaries 카드 클릭 라우팅", () => {
  test.beforeEach(async ({ page }) => {
    // 로컬스토리지 초기화 및 테스트 데이터 설정
    await page.goto("/diaries");
    await page.evaluate(() => {
      localStorage.clear();
      const testDiaries = [
        {
          id: 1,
          title: "첫 번째 일기",
          content: "첫 번째 일기 내용입니다.",
          emotion: "HAPPY",
          createdAt: "2024-01-15T00:00:00.000Z",
        },
        {
          id: 2,
          title: "두 번째 일기",
          content: "두 번째 일기 내용입니다.",
          emotion: "SAD",
          createdAt: "2024-01-14T00:00:00.000Z",
        },
        {
          id: 3,
          title: "세 번째 일기",
          content: "세 번째 일기 내용입니다.",
          emotion: "ANGRY",
          createdAt: "2024-01-13T00:00:00.000Z",
        },
      ];
      localStorage.setItem("diaries", JSON.stringify(testDiaries));
    });
    // 페이지 새로고침하여 로컬스토리지 변경사항 반영
    await page.reload();
    await page.waitForSelector('[data-testid="diaries-container"]');
  });

  test("첫 번째 일기 카드 클릭 시 /diaries/1로 이동", async ({ page }) => {
    // 첫 번째 카드 클릭
    const firstCard = page.locator('[data-testid="diary-card-1"]');
    await firstCard.click();

    // URL 확인
    await page.waitForURL("/diaries/1");
    expect(page.url()).toContain("/diaries/1");
  });

  test("두 번째 일기 카드 클릭 시 /diaries/2로 이동", async ({ page }) => {
    const secondCard = page.locator('[data-testid="diary-card-2"]');
    await secondCard.click();

    await page.waitForURL("/diaries/2");
    expect(page.url()).toContain("/diaries/2");
  });

  test("세 번째 일기 카드 클릭 시 /diaries/3으로 이동", async ({ page }) => {
    const thirdCard = page.locator('[data-testid="diary-card-3"]');
    await thirdCard.click();

    await page.waitForURL("/diaries/3");
    expect(page.url()).toContain("/diaries/3");
  });

  test("일기 카드에 cursor: pointer 스타일이 적용되어 있다", async ({ page }) => {
    const firstCard = page.locator('[data-testid="diary-card-1"]');

    // cursor 스타일 확인
    const cursor = await firstCard.evaluate((el) => {
      return window.getComputedStyle(el).cursor;
    });

    expect(cursor).toBe("pointer");
  });
});
