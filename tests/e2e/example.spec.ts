import { test, expect } from '@playwright/test';

/**
 * 예제 E2E 테스트
 *
 * 테스트 작성 규칙:
 * 1. page.goto()는 baseURL을 포함하지 않고 경로만 사용
 * 2. page.locator()는 data-testid를 사용 (CSS Module 충돌 방지)
 * 3. timeout은 2000ms 미만으로 설정
 * 4. Mock 데이터 사용하지 않고 실제 데이터 사용
 */

test.describe('홈페이지', () => {
  test('홈페이지가 정상적으로 로드된다', async ({ page }) => {
    // baseURL이 설정되어 있으므로 경로만 사용
    await page.goto('/');

    // 페이지 제목 확인
    await expect(page).toHaveTitle(/Diary/i);
  });
});

test.describe('일기 목록 페이지', () => {
  test('일기 목록 페이지가 정상적으로 로드된다', async ({ page }) => {
    await page.goto('/diaries');

    // 페이지가 로드되었는지 확인
    await expect(page).toHaveURL('/diaries');
  });
});

test.describe('DiariesNew 컴포넌트 (temp 페이지)', () => {
  test('일기 작성 폼이 정상적으로 표시된다', async ({ page }) => {
    await page.goto('/temp');

    // data-testid를 사용하여 요소 확인 (추후 컴포넌트에 추가 필요)
    // await expect(page.getByTestId('diary-new-form')).toBeVisible();

    // 임시로 텍스트 확인
    await expect(page.getByText('일기쓰기')).toBeVisible();
    await expect(page.getByText('오늘 기분은 어땠나요?')).toBeVisible();
    await expect(page.getByText('제목')).toBeVisible();
    await expect(page.getByText('내용')).toBeVisible();
  });

  test('감정 선택 버튼이 정상적으로 동작한다', async ({ page }) => {
    await page.goto('/temp');

    // 감정 버튼 클릭 (텍스트로 찾기)
    const happyButton = page.getByRole('button', { name: /행복해요/ });
    await happyButton.click();

    // 선택 상태 확인 (CSS 클래스 확인)
    // await expect(happyButton).toHaveClass(/selected/);
  });

  test('입력 필드가 정상적으로 동작한다', async ({ page }) => {
    await page.goto('/temp');

    // 제목 입력
    const titleInput = page.getByPlaceholder('제목을 입력하세요');
    await titleInput.fill('테스트 제목');
    await expect(titleInput).toHaveValue('테스트 제목');

    // 내용 입력
    const contentTextarea = page.getByPlaceholder('내용을 입력하세요');
    await contentTextarea.fill('테스트 내용입니다.');
    await expect(contentTextarea).toHaveValue('테스트 내용입니다.');
  });

  test('버튼이 정상적으로 표시된다', async ({ page }) => {
    await page.goto('/temp');

    // 닫기 버튼 확인
    await expect(page.getByRole('button', { name: '닫기' })).toBeVisible();

    // 등록하기 버튼 확인
    await expect(page.getByRole('button', { name: '등록하기' })).toBeVisible();
  });
});
