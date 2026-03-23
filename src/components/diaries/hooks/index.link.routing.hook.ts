import { useRouter } from "next/navigation";
import { buildPath } from "@/commons/constants/url";

/**
 * 일기 카드 클릭 시 상세 페이지로 이동하는 Hook
 */
export function useDiaryRouting() {
  const router = useRouter();

  /**
   * 일기 상세 페이지로 이동
   * @param diaryId 일기 ID
   */
  const navigateToDiaryDetail = (diaryId: number) => {
    router.push(buildPath.diaryDetail(diaryId));
  };

  return { navigateToDiaryDetail };
}
