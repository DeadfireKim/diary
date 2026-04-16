import { test, expect } from "@playwright/test";

test.describe("사진 필터", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/pictures");
    await page.waitForSelector('[data-testid="pictures-container"]');
  });

  test("기본 필터가 최초 자동 선택된다", async ({ page }) => {
    const filterSelect = page.locator('[data-testid="pictures-filter"]');
    await expect(filterSelect).toBeVisible({ timeout: 500 });
    const value = await filterSelect.inputValue();
    expect(value).toBe("default");
  });

  test("기본(640x640) 필터 적용 시 이미지 사이즈가 640x640 이다", async ({
    page,
  }) => {
    // 강아지 이미지 로드 대기 (실제 API, network timeout < 2000ms)
    const image = page.locator('[data-testid="dog-image"]').first();
    await expect(image).toBeVisible({ timeout: 1900 });

    const width = await image.getAttribute("width");
    const height = await image.getAttribute("height");
    expect(width).toBe("640");
    expect(height).toBe("640");
  });

  test("가로형(640x480) 필터 선택 시 이미지 사이즈가 변경된다", async ({
    page,
  }) => {
    const filterSelect = page.locator('[data-testid="pictures-filter"]');
    await expect(filterSelect).toBeVisible({ timeout: 500 });
    await filterSelect.selectOption("landscape");

    // 강아지 이미지 로드 대기 (실제 API, network timeout < 2000ms)
    const image = page.locator('[data-testid="dog-image"]').first();
    await expect(image).toBeVisible({ timeout: 1900 });

    const width = await image.getAttribute("width");
    const height = await image.getAttribute("height");
    expect(width).toBe("640");
    expect(height).toBe("480");
  });

  test("세로형(480x640) 필터 선택 시 이미지 사이즈가 변경된다", async ({
    page,
  }) => {
    const filterSelect = page.locator('[data-testid="pictures-filter"]');
    await expect(filterSelect).toBeVisible({ timeout: 500 });
    await filterSelect.selectOption("portrait");

    // 강아지 이미지 로드 대기 (실제 API, network timeout < 2000ms)
    const image = page.locator('[data-testid="dog-image"]').first();
    await expect(image).toBeVisible({ timeout: 1900 });

    const width = await image.getAttribute("width");
    const height = await image.getAttribute("height");
    expect(width).toBe("480");
    expect(height).toBe("640");
  });
});
