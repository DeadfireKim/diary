import { test, expect } from "@playwright/test";

test.describe("DiariesNew 폼 등록 기능", () => {
  test.beforeEach(async ({ page }) => {
    // 일기쓰기 버튼 클릭을 위한 테스트 바이패스 설정
    await page.addInitScript(() => {
      window.__TEST_BYPASS__ = true;
    });
    // 로컬스토리지 초기화
    await page.goto("/diaries");
    await page.evaluate(() => {
      localStorage.clear();
    });
  });

  test("모든 필드 입력 시 등록하기 버튼 활성화", async ({ page }) => {
    await page.goto("/diaries");

    // 페이지 로드 대기 (data-testid로 식별)
    await page.waitForSelector('[data-testid="diaries-container"]');

    // 일기쓰기 버튼 클릭
    await page.click('[data-testid="write-button"]');

    // 모달이 열렸는지 확인
    await page.waitForSelector('[data-testid="diaries-new-wrapper"]');

    // 등록하기 버튼 찾기
    const submitButton = page.locator('[data-testid="diaries-new-submit-button"]');

    // 초기 상태: 버튼 비활성화
    await expect(submitButton).toBeDisabled();

    // 감정 선택
    await page.click('[data-testid="emotion-button-HAPPY"]');

    // 여전히 비활성화 (title, content 미입력)
    await expect(submitButton).toBeDisabled();

    // 제목 입력
    await page.fill('[data-testid="diary-title-input"]', "테스트 제목");

    // 여전히 비활성화 (content 미입력)
    await expect(submitButton).toBeDisabled();

    // 내용 입력
    await page.fill('[data-testid="diary-content-textarea"]', "테스트 내용입니다.");

    // 모든 필드 입력 완료: 버튼 활성화
    await expect(submitButton).toBeEnabled();
  });

  test("새로운 일기 등록 시 로컬스토리지에 id=1로 저장", async ({ page }) => {
    await page.goto("/diaries");
    await page.waitForSelector('[data-testid="diaries-container"]');

    // 일기쓰기 버튼 클릭
    await page.click('[data-testid="write-button"]');
    await page.waitForSelector('[data-testid="diaries-new-wrapper"]');

    // 모든 필드 입력
    await page.click('[data-testid="emotion-button-HAPPY"]');
    await page.fill('[data-testid="diary-title-input"]', "첫 번째 일기");
    await page.fill('[data-testid="diary-content-textarea"]', "첫 번째 일기 내용입니다.");

    // 등록하기 버튼 클릭
    await page.click('[data-testid="diaries-new-submit-button"]');

    // 등록완료 모달 대기
    await page.waitForSelector('[data-testid="completion-modal"]');

    // 로컬스토리지 확인
    const diaries = await page.evaluate(() => {
      const data = localStorage.getItem("diaries");
      return data ? JSON.parse(data) : null;
    });

    expect(diaries).not.toBeNull();
    expect(Array.isArray(diaries)).toBe(true);
    expect(diaries.length).toBe(1);
    expect(diaries[0].id).toBe(1);
    expect(diaries[0].title).toBe("첫 번째 일기");
    expect(diaries[0].content).toBe("첫 번째 일기 내용입니다.");
    expect(diaries[0].emotion).toBe("HAPPY");
    expect(diaries[0].createdAt).toBeDefined();
  });

  test("기존 일기가 있을 때 새 일기 등록 시 id를 가장 큰 id+1로 설정", async ({ page }) => {
    // 기존 일기 데이터 설정
    await page.goto("/diaries");
    await page.evaluate(() => {
      const existingDiaries = [
        {
          id: 1,
          title: "기존 일기 1",
          content: "기존 일기 내용 1",
          emotion: "HAPPY",
          createdAt: "2024-01-01T00:00:00.000Z",
        },
        {
          id: 3,
          title: "기존 일기 2",
          content: "기존 일기 내용 2",
          emotion: "SAD",
          createdAt: "2024-01-02T00:00:00.000Z",
        },
      ];
      localStorage.setItem("diaries", JSON.stringify(existingDiaries));
    });

    await page.waitForSelector('[data-testid="diaries-container"]');

    // 일기쓰기 버튼 클릭
    await page.click('[data-testid="write-button"]');
    await page.waitForSelector('[data-testid="diaries-new-wrapper"]');

    // 모든 필드 입력
    await page.click('[data-testid="emotion-button-ANGRY"]');
    await page.fill('[data-testid="diary-title-input"]', "새로운 일기");
    await page.fill('[data-testid="diary-content-textarea"]', "새로운 일기 내용입니다.");

    // 등록하기 버튼 클릭
    await page.click('[data-testid="diaries-new-submit-button"]');

    // 등록완료 모달 대기
    await page.waitForSelector('[data-testid="completion-modal"]');

    // 로컬스토리지 확인
    const diaries = await page.evaluate(() => {
      const data = localStorage.getItem("diaries");
      return data ? JSON.parse(data) : null;
    });

    expect(diaries).not.toBeNull();
    expect(diaries.length).toBe(3);

    // 새로 추가된 일기의 id는 기존 최대 id(3) + 1 = 4
    const newDiary = diaries.find((d: any) => d.title === "새로운 일기");
    expect(newDiary).toBeDefined();
    expect(newDiary.id).toBe(4);
    expect(newDiary.emotion).toBe("ANGRY");
  });

  test("등록완료 모달의 확인 버튼 클릭 시 상세페이지로 이동하고 모든 모달 닫기", async ({ page }) => {
    await page.goto("/diaries");
    await page.waitForSelector('[data-testid="diaries-container"]');

    // 일기쓰기 버튼 클릭
    await page.click('[data-testid="write-button"]');
    await page.waitForSelector('[data-testid="diaries-new-wrapper"]');

    // 모든 필드 입력
    await page.click('[data-testid="emotion-button-SURPRISE"]');
    await page.fill('[data-testid="diary-title-input"]', "테스트 일기");
    await page.fill('[data-testid="diary-content-textarea"]', "테스트 일기 내용입니다.");

    // 등록하기 버튼 클릭
    await page.click('[data-testid="diaries-new-submit-button"]');

    // 등록완료 모달 대기
    await page.waitForSelector('[data-testid="completion-modal"]');

    // 확인 버튼 클릭 (모달 내부의 버튼)
    const confirmButton = page.locator('[data-testid="completion-modal"] button:has-text("확인")');
    await confirmButton.click();

    // 상세페이지로 이동했는지 확인
    await page.waitForURL(/\/diaries\/\d+/);
    expect(page.url()).toMatch(/\/diaries\/1$/);

    // 모달이 모두 닫혔는지 확인
    const modalVisible = await page.locator('[data-testid="diaries-new-wrapper"]').isVisible().catch(() => false);
    expect(modalVisible).toBe(false);

    const completionModalVisible = await page.locator('[data-testid="completion-modal"]').isVisible().catch(() => false);
    expect(completionModalVisible).toBe(false);
  });
});
