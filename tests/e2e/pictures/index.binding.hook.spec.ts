import { test, expect } from "@playwright/test";

test.describe("사진 목록 바인딩", () => {
  test("성공 시나리오: dog.ceo 이미지 주소가 반환된다", async ({ page }) => {
    await page.goto("/pictures");

    // 페이지 로드 식별: data-testid 대기
    await page.waitForSelector('[data-testid="pictures-container"]');

    // 강아지 이미지 로드 대기 (실제 API, network timeout < 2000ms)
    const dogImage = page.locator('[data-testid="dog-image"]').first();
    await expect(dogImage).toBeVisible({ timeout: 1900 });

    // dog.ceo 이미지 주소 확인
    const src = await dogImage.getAttribute("src");
    expect(src).toContain("dog.ceo");
  });

  test("실패 시나리오: API 실패 시 에러 상태를 표시한다", async ({ page }) => {
    // API 모킹 (실패 응답)
    await page.route("https://dog.ceo/api/breeds/image/random/6", (route) => {
      route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ status: "error", message: "Internal Server Error" }),
      });
    });

    await page.goto("/pictures");

    // 페이지 로드 식별: data-testid 대기
    await page.waitForSelector('[data-testid="pictures-container"]');

    // 에러 상태 확인 (network 아님 < 500ms)
    await expect(
      page.locator('[data-testid="pictures-error"]')
    ).toBeVisible({ timeout: 500 });
  });
});
