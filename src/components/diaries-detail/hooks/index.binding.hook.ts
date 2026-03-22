import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { EmotionType } from "@/commons/constants/enum";

/**
 * 일기 상세 데이터 타입
 */
export type DiaryData = {
  id: number;
  title: string;
  content: string;
  emotion: EmotionType;
  createdAt: string;
};

/**
 * 일기 상세 데이터 바인딩 Hook
 */
export function useDiaryBinding() {
  const params = useParams();
  const [diary, setDiary] = useState<DiaryData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 서버 사이드에서는 실행하지 않음
    if (typeof window === "undefined") {
      return;
    }

    // URL에서 id 추출
    const id = params?.id;
    if (!id) {
      setIsLoading(false);
      return;
    }

    // 로컬스토리지에서 일기 목록 조회
    const diariesJson = localStorage.getItem("diaries");
    if (!diariesJson) {
      setDiary(null);
      setIsLoading(false);
      return;
    }

    try {
      const diaries: DiaryData[] = JSON.parse(diariesJson);

      // id와 일치하는 일기 찾기
      const targetId = typeof id === "string" ? parseInt(id, 10) : id;
      const foundDiary = diaries.find((d) => d.id === targetId);

      setDiary(foundDiary || null);
    } catch (error) {
      console.error("Failed to parse diaries from localStorage:", error);
      setDiary(null);
    } finally {
      setIsLoading(false);
    }
  }, [params]);

  return { diary, isLoading };
}
