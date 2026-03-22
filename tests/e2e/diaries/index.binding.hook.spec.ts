import { test, expect } from "@playwright/test";

test.describe("Diaries 데이터 바인딩", () => {
  test.beforeEach(async ({ page }) => {
    // 로컬스토리지 초기화 및 테스트 데이터 설정
    await page.goto("/diaries");
    await page.evaluate(() => {
      localStorage.clear();
      const testDiaries = [
        {
          id: 1,
          title: "첫 번째 일기 제목",
          content: "첫 번째 일기 내용입니다. 오늘은 정말 행복한 하루였어요.",
          emotion: "HAPPY",
          createdAt: "2024-01-15T00:00:00.000Z",
        },
        {
          id: 2,
          title: "두 번째 일기 제목",
          content: "두 번째 일기 내용입니다. 비가 와서 조금 우울했어요.",
          emotion: "SAD",
          createdAt: "2024-01-14T00:00:00.000Z",
        },
        {
          id: 3,
          title: "세 번째 일기 제목",
          content: "세 번째 일기 내용입니다. 화가 나는 일이 있었어요.",
          emotion: "ANGRY",
          createdAt: "2024-01-13T00:00:00.000Z",
        },
        {
          id: 4,
          title: "매우 긴 제목의 일기입니다. 이 제목은 카드의 너비를 넘어갈 정도로 아주 길게 작성되었습니다. 이런 경우에는 말줄임표로 표시되어야 합니다.",
          content: "긴 제목 테스트용 일기 내용입니다.",
          emotion: "SURPRISE",
          createdAt: "2024-01-12T00:00:00.000Z",
        },
      ];
      localStorage.setItem("diaries", JSON.stringify(testDiaries));
    });
    // 페이지 새로고침하여 로컬스토리지 변경사항 반영
    await page.reload();
    await page.waitForSelector('[data-testid="diaries-container"]');
  });

  test("첫 번째 일기 카드의 데이터가 올바르게 바인딩된다", async ({ page }) => {
    // 첫 번째 카드 선택
    const firstCard = page.locator('[data-testid="diary-card-1"]');

    // 감정 이미지 확인
    const emotionImage = firstCard.locator('[data-testid="diary-card-emotion-image"]');
    await expect(emotionImage).toBeVisible();
    await expect(emotionImage).toHaveAttribute("alt", "행복해요");

    // 감정 텍스트 확인 (HAPPY = 행복해요)
    const emotionText = firstCard.locator('[data-testid="diary-card-emotion-text"]');
    await expect(emotionText).toHaveText("행복해요");

    // 작성일 확인
    const createdAt = firstCard.locator('[data-testid="diary-card-created-at"]');
    const createdAtText = await createdAt.textContent();
    expect(createdAtText).toBeTruthy();

    // 제목 확인
    const title = firstCard.locator('[data-testid="diary-card-title"]');
    await expect(title).toHaveText("첫 번째 일기 제목");
  });

  test("두 번째 일기 카드의 감정이 올바르게 표시된다", async ({ page }) => {
    const secondCard = page.locator('[data-testid="diary-card-2"]');

    const emotionText = secondCard.locator('[data-testid="diary-card-emotion-text"]');
    await expect(emotionText).toHaveText("슬퍼요");

    const emotionImage = secondCard.locator('[data-testid="diary-card-emotion-image"]');
    await expect(emotionImage).toHaveAttribute("alt", "슬퍼요");
  });

  test("세 번째 일기 카드의 감정이 올바르게 표시된다", async ({ page }) => {
    const thirdCard = page.locator('[data-testid="diary-card-3"]');

    const emotionText = thirdCard.locator('[data-testid="diary-card-emotion-text"]');
    await expect(emotionText).toHaveText("화나요");

    const title = thirdCard.locator('[data-testid="diary-card-title"]');
    await expect(title).toHaveText("세 번째 일기 제목");
  });

  test("긴 제목이 ellipsis로 표시된다", async ({ page }) => {
    const fourthCard = page.locator('[data-testid="diary-card-4"]');
    const title = fourthCard.locator('[data-testid="diary-card-title"]');

    // 제목 요소가 있는지 확인
    await expect(title).toBeVisible();

    // CSS가 적용되어 overflow가 hidden인지 확인
    const overflow = await title.evaluate((el) => {
      return window.getComputedStyle(el).overflow;
    });
    expect(overflow).toBe("hidden");

    // text-overflow가 ellipsis인지 확인
    const textOverflow = await title.evaluate((el) => {
      return window.getComputedStyle(el).textOverflow;
    });
    expect(textOverflow).toBe("ellipsis");
  });

  test("로컬스토리지에 일기가 없을 때 빈 상태로 표시된다", async ({ page }) => {
    await page.evaluate(() => {
      localStorage.clear();
    });
    // 페이지 새로고침
    await page.reload();
    await page.waitForSelector('[data-testid="diaries-container"]');

    // 일기 카드가 없어야 함
    const diaryCards = page.locator('[data-testid^="diary-card-"]');
    const cardCount = await diaryCards.count();
    expect(cardCount).toBe(0);
  });
});
