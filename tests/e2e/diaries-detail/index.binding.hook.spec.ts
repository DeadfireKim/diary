import { test, expect } from "@playwright/test";

test.describe("DiariesDetail 데이터 바인딩", () => {
  test.beforeEach(async ({ page }) => {
    // 로컬스토리지 초기화 및 테스트 데이터 설정
    await page.goto("/diaries");
    await page.evaluate(() => {
      localStorage.clear();
      const testDiaries = [
        {
          id: 1,
          title: "첫 번째 일기",
          content: "오늘은 정말 행복한 하루였어요. 친구들과 즐거운 시간을 보냈습니다.",
          emotion: "HAPPY",
          createdAt: "2024-01-15T00:00:00.000Z",
        },
        {
          id: 2,
          title: "두 번째 일기",
          content: "비가 와서 조금 우울했지만, 집에서 편안하게 쉬었어요.",
          emotion: "SAD",
          createdAt: "2024-01-16T00:00:00.000Z",
        },
        {
          id: 3,
          title: "세 번째 일기",
          content: "화가 나는 일이 있었지만, 금방 풀렸습니다.",
          emotion: "ANGRY",
          createdAt: "2024-01-17T00:00:00.000Z",
        },
      ];
      localStorage.setItem("diaries", JSON.stringify(testDiaries));
    });
  });

  test("id=1 일기 상세 페이지에 올바른 데이터 바인딩", async ({ page }) => {
    // id=1 일기 상세 페이지로 이동
    await page.goto("/diaries/1");

    // 페이지 로드 대기 (data-testid로 식별)
    await page.waitForSelector('[data-testid="diaries-detail-container"]');

    // 제목 확인
    const title = page.locator('[data-testid="diary-detail-title"]');
    await expect(title).toHaveText("첫 번째 일기");

    // 감정 텍스트 확인 (HAPPY = 행복해요)
    const emotionText = page.locator('[data-testid="diary-detail-emotion-text"]');
    await expect(emotionText).toHaveText("행복해요");

    // 감정 아이콘 확인
    const emotionIcon = page.locator('[data-testid="diary-detail-emotion-icon"]');
    await expect(emotionIcon).toBeVisible();
    await expect(emotionIcon).toHaveAttribute("alt", "행복해요");

    // 작성일 확인 (ISO 문자열이 포맷팅되어 표시됨)
    const createdAt = page.locator('[data-testid="diary-detail-created-at"]');
    const createdAtText = await createdAt.textContent();
    expect(createdAtText).toBeTruthy();

    // 내용 확인
    const content = page.locator('[data-testid="diary-detail-content"]');
    await expect(content).toHaveText("오늘은 정말 행복한 하루였어요. 친구들과 즐거운 시간을 보냈습니다.");
  });

  test("id=2 일기 상세 페이지에 올바른 데이터 바인딩", async ({ page }) => {
    await page.goto("/diaries/2");
    await page.waitForSelector('[data-testid="diaries-detail-container"]');

    const title = page.locator('[data-testid="diary-detail-title"]');
    await expect(title).toHaveText("두 번째 일기");

    const emotionText = page.locator('[data-testid="diary-detail-emotion-text"]');
    await expect(emotionText).toHaveText("슬퍼요");

    const content = page.locator('[data-testid="diary-detail-content"]');
    await expect(content).toHaveText("비가 와서 조금 우울했지만, 집에서 편안하게 쉬었어요.");
  });

  test("id=3 일기 상세 페이지에 올바른 데이터 바인딩", async ({ page }) => {
    await page.goto("/diaries/3");
    await page.waitForSelector('[data-testid="diaries-detail-container"]');

    const title = page.locator('[data-testid="diary-detail-title"]');
    await expect(title).toHaveText("세 번째 일기");

    const emotionText = page.locator('[data-testid="diary-detail-emotion-text"]');
    await expect(emotionText).toHaveText("화나요");

    const content = page.locator('[data-testid="diary-detail-content"]');
    await expect(content).toHaveText("화가 나는 일이 있었지만, 금방 풀렸습니다.");
  });

  test("존재하지 않는 id로 접근 시 데이터 없음 처리", async ({ page }) => {
    await page.goto("/diaries/999");
    await page.waitForSelector('[data-testid="diaries-detail-container"]');

    // 데이터가 없을 때의 처리 확인
    const notFound = page.locator('[data-testid="diary-not-found"]');
    await expect(notFound).toBeVisible();
  });
});
