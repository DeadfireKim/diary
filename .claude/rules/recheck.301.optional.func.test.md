# 테스트조건 재검토 요청

테스트 코드 작성 규칙이 올바르게 적용되었는지 재검토합니다.

## 검토 항목

- Playwright 테스트 작성 여부
- playwright.config.ts 무단 수정 여부
- Mock 데이터 사용 대신 실제 데이터 사용 여부
- data-testid 사용 여부 (CSS Module 충돌 방지)
- timeout 설정 규칙 준수 여부 (2000ms 미만)
- baseUrl 포함 여부 확인 (경로만 사용)
