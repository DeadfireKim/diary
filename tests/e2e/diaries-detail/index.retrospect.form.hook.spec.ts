import { test, expect } from "@playwright/test";

test.describe("DiariesDetail 회고 폼 등록", () => {
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
      // 기존 retrospects 초기화
      localStorage.removeItem("retrospects");
    });
  });

  test("회고 인풋이 비어있으면 입력 버튼이 비활성화된다", async ({ page }) => {
    await page.goto("/diaries/1");
    await page.waitForSelector('[data-testid="diaries-detail-container"]');

    const submitButton = page.locator('[data-testid="retrospect-submit-button"]');
    await expect(submitButton).toBeDisabled();
  });

  test("회고 인풋에 내용을 입력하면 입력 버튼이 활성화된다", async ({ page }) => {
    await page.goto("/diaries/1");
    await page.waitForSelector('[data-testid="diaries-detail-container"]');

    const input = page.locator('[data-testid="retrospect-input"]');
    const submitButton = page.locator('[data-testid="retrospect-submit-button"]');

    await input.fill("오늘의 회고입니다.");
    await expect(submitButton).toBeEnabled();
  });

  test("로컬스토리지에 retrospects가 없을 때 등록하면 id=1로 새로 생성된다", async ({ page }) => {
    await page.goto("/diaries/1");
    await page.waitForSelector('[data-testid="diaries-detail-container"]');

    const input = page.locator('[data-testid="retrospect-input"]');
    const submitButton = page.locator('[data-testid="retrospect-submit-button"]');

    await input.fill("첫 번째 회고입니다.");
    await submitButton.click();

    // 페이지 새로고침 후 로컬스토리지 확인
    await page.waitForSelector('[data-testid="diaries-detail-container"]');

    const retrospects = await page.evaluate(() => {
      const data = localStorage.getItem("retrospects");
      return data ? JSON.parse(data) : null;
    });

    expect(retrospects).not.toBeNull();
    expect(retrospects).toHaveLength(1);
    expect(retrospects[0].id).toBe(1);
    expect(retrospects[0].content).toBe("첫 번째 회고입니다.");
    expect(retrospects[0].diaryId).toBe(1);
    expect(retrospects[0].createdAt).toBeTruthy();
  });

  test("로컬스토리지에 retrospects가 이미 존재할 때 등록하면 가장 큰 id+1로 추가된다", async ({ page }) => {
    // 기존 retrospects 데이터 설정
    await page.evaluate(() => {
      const existing = [
        {
          id: 1,
          content: "기존 회고",
          diaryId: 1,
          createdAt: "2024-01-15",
        },
        {
          id: 3,
          content: "기존 회고 2",
          diaryId: 1,
          createdAt: "2024-01-16",
        },
      ];
      localStorage.setItem("retrospects", JSON.stringify(existing));
    });

    await page.goto("/diaries/1");
    await page.waitForSelector('[data-testid="diaries-detail-container"]');

    const input = page.locator('[data-testid="retrospect-input"]');
    const submitButton = page.locator('[data-testid="retrospect-submit-button"]');

    await input.fill("새로운 회고입니다.");
    await submitButton.click();

    // 페이지 새로고침 후 로컬스토리지 확인
    await page.waitForSelector('[data-testid="diaries-detail-container"]');

    const retrospects = await page.evaluate(() => {
      const data = localStorage.getItem("retrospects");
      return data ? JSON.parse(data) : null;
    });

    expect(retrospects).toHaveLength(3);
    // 가장 큰 id(3) + 1 = 4
    const newRetrospect = retrospects.find((r: { id: number }) => r.id === 4);
    expect(newRetrospect).toBeDefined();
    expect(newRetrospect.content).toBe("새로운 회고입니다.");
    expect(newRetrospect.diaryId).toBe(1);
  });

  test("등록 완료 후 현재 페이지가 새로고침되어 회고 목록에 표시된다", async ({ page }) => {
    await page.goto("/diaries/1");
    await page.waitForSelector('[data-testid="diaries-detail-container"]');

    const input = page.locator('[data-testid="retrospect-input"]');
    const submitButton = page.locator('[data-testid="retrospect-submit-button"]');

    await input.fill("페이지 새로고침 테스트 회고");
    await submitButton.click();

    // 새로고침 후 페이지 로드 대기
    await page.waitForSelector('[data-testid="diaries-detail-container"]');

    // 등록된 회고가 목록에 표시되는지 확인
    const retrospectList = page.locator('[data-testid="retrospect-list"]');
    await expect(retrospectList).toBeVisible();

    const retrospectItems = page.locator('[data-testid="retrospect-item"]');
    await expect(retrospectItems).toHaveCount(1);

    const firstItem = retrospectItems.first();
    await expect(firstItem).toContainText("페이지 새로고침 테스트 회고");
  });
});
