import { test, expect } from "@playwright/test";
import { EmotionType } from "../../../src/commons/constants/enum";

// 12개 데이터 (1페이지만 존재)
const DIARIES_12 = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  title: `일기 ${i + 1}`,
  content: `내용 ${i + 1}`,
  emotion: EmotionType.Happy,
  createdAt: `2024-01-${String(i + 1).padStart(2, "0")}T00:00:00.000Z`,
}));

// 13개 데이터 (2페이지 존재, 1페이지 12개 / 2페이지 1개)
const DIARIES_13 = Array.from({ length: 13 }, (_, i) => ({
  id: i + 1,
  title: `일기 ${i + 1}`,
  content: `내용 ${i + 1}`,
  emotion: EmotionType.Happy,
  createdAt: `2024-01-${String(i + 1).padStart(2, "0")}T00:00:00.000Z`,
}));

// 검색 테스트용 데이터: 3개 Happy + 1개 Sad
const DIARIES_SEARCH = [
  {
    id: 1,
    title: "행복한 날1",
    content: "내용1",
    emotion: EmotionType.Happy,
    createdAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: 2,
    title: "행복한 날2",
    content: "내용2",
    emotion: EmotionType.Happy,
    createdAt: "2024-01-02T00:00:00.000Z",
  },
  {
    id: 3,
    title: "행복한 날3",
    content: "내용3",
    emotion: EmotionType.Happy,
    createdAt: "2024-01-03T00:00:00.000Z",
  },
  {
    id: 4,
    title: "슬픈 날",
    content: "내용4",
    emotion: EmotionType.Sad,
    createdAt: "2024-01-04T00:00:00.000Z",
  },
];

test.describe("Diaries Pagination Hook", () => {
  test("12개 이하 데이터일 때 1페이지만 존재한다", async ({ page }) => {
    await page.addInitScript(() => {
      (window as unknown as { __TEST_BYPASS__: boolean }).__TEST_BYPASS__ = true;
    });
    await page.goto("/diaries");
    await page.waitForSelector('[data-testid="diaries-container"]');
    await page.evaluate((diaries) => {
      localStorage.setItem("diaries", JSON.stringify(diaries));
    }, DIARIES_12);
    await page.reload();
    await page.waitForSelector('[data-testid="diaries-container"]');

    // 1페이지에 12개 카드 모두 표시
    for (let i = 1; i <= 12; i++) {
      await expect(page.locator(`[data-testid="diary-card-${i}"]`)).toBeVisible();
    }

    // Page 2 버튼 없음 (totalPages=1)
    await expect(page.getByRole("button", { name: "Page 2" })).not.toBeVisible();
  });

  test("13개 데이터일 때 totalPages=2, 1페이지에 12개, 2페이지에 1개", async ({ page }) => {
    await page.addInitScript(() => {
      (window as unknown as { __TEST_BYPASS__: boolean }).__TEST_BYPASS__ = true;
    });
    await page.goto("/diaries");
    await page.waitForSelector('[data-testid="diaries-container"]');
    await page.evaluate((diaries) => {
      localStorage.setItem("diaries", JSON.stringify(diaries));
    }, DIARIES_13);
    await page.reload();
    await page.waitForSelector('[data-testid="diaries-container"]');

    // 1페이지: 12개 카드 표시
    for (let i = 1; i <= 12; i++) {
      await expect(page.locator(`[data-testid="diary-card-${i}"]`)).toBeVisible();
    }
    // 13번째는 1페이지에 없음
    await expect(page.locator('[data-testid="diary-card-13"]')).not.toBeVisible();

    // Page 2 버튼 존재
    await expect(page.getByRole("button", { name: "Page 2" })).toBeVisible();
  });

  test("페이지 번호 클릭 시 해당 페이지 일기가 표시된다", async ({ page }) => {
    await page.addInitScript(() => {
      (window as unknown as { __TEST_BYPASS__: boolean }).__TEST_BYPASS__ = true;
    });
    await page.goto("/diaries");
    await page.waitForSelector('[data-testid="diaries-container"]');
    await page.evaluate((diaries) => {
      localStorage.setItem("diaries", JSON.stringify(diaries));
    }, DIARIES_13);
    await page.reload();
    await page.waitForSelector('[data-testid="diaries-container"]');

    // 2페이지 버튼 클릭
    await page.getByRole("button", { name: "Page 2" }).click();

    // 2페이지: 13번째 카드만 표시
    await expect(page.locator('[data-testid="diary-card-13"]')).toBeVisible();
    // 1페이지 카드들은 보이지 않음
    await expect(page.locator('[data-testid="diary-card-1"]')).not.toBeVisible();
  });

  test("검색 후 검색 결과 기준으로 totalPages가 재계산된다", async ({ page }) => {
    await page.addInitScript(() => {
      (window as unknown as { __TEST_BYPASS__: boolean }).__TEST_BYPASS__ = true;
    });
    await page.goto("/diaries");
    await page.waitForSelector('[data-testid="diaries-container"]');
    await page.evaluate((diaries) => {
      localStorage.setItem("diaries", JSON.stringify(diaries));
    }, DIARIES_SEARCH);
    await page.reload();
    await page.waitForSelector('[data-testid="diaries-container"]');

    // 전체 데이터 4개 → 1페이지
    await expect(page.getByRole("button", { name: "Page 2" })).not.toBeVisible();

    // "행복" 검색 → 3개만 표시
    await page.fill('[data-testid="search-input"]', "행복");
    await expect(page.locator('[data-testid="diary-card-1"]')).toBeVisible();
    await expect(page.locator('[data-testid="diary-card-4"]')).not.toBeVisible();

    // 3개 → 1페이지 (여전히 Page 2 없음)
    await expect(page.getByRole("button", { name: "Page 2" })).not.toBeVisible();
  });

  test("필터 후 필터 결과 기준으로 totalPages가 재계산된다", async ({ page }) => {
    await page.addInitScript(() => {
      (window as unknown as { __TEST_BYPASS__: boolean }).__TEST_BYPASS__ = true;
    });
    await page.goto("/diaries");
    await page.waitForSelector('[data-testid="diaries-container"]');
    await page.evaluate((diaries) => {
      localStorage.setItem("diaries", JSON.stringify(diaries));
    }, DIARIES_SEARCH);
    await page.reload();
    await page.waitForSelector('[data-testid="diaries-container"]');

    // 전체 4개 → 1페이지
    await expect(page.getByRole("button", { name: "Page 2" })).not.toBeVisible();

    // 슬퍼요 필터 → 1개만 표시
    await page.locator('[data-testid="diary-filter"] button').click();
    await page.getByRole("option", { name: "슬퍼요" }).click();

    await expect(page.locator('[data-testid="diary-card-4"]')).toBeVisible();
    await expect(page.locator('[data-testid="diary-card-1"]')).not.toBeVisible();

    // 1개 → 1페이지 (Page 2 없음)
    await expect(page.getByRole("button", { name: "Page 2" })).not.toBeVisible();
  });
});
