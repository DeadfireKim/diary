import { useState, useEffect } from "react";
import { EmotionType } from "@/commons/constants/enum";

/**
 * 일기 데이터 타입
 */
export type DiaryData = {
  id: number;
  title: string;
  content: string;
  emotion: EmotionType;
  createdAt: string;
};

/**
 * 일기 목록 데이터 바인딩 Hook
 */
export function useDiariesBinding() {
  const [diaries, setDiaries] = useState<DiaryData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 서버 사이드에서는 실행하지 않음
    if (typeof window === "undefined") {
      return;
    }

    // 로컬스토리지에서 일기 목록 조회
    const diariesJson = localStorage.getItem("diaries");
    if (!diariesJson) {
      setDiaries([]);
      setIsLoading(false);
      return;
    }

    try {
      const parsedDiaries: DiaryData[] = JSON.parse(diariesJson);
      setDiaries(parsedDiaries);
    } catch (error) {
      console.error("Failed to parse diaries from localStorage:", error);
      setDiaries([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { diaries, isLoading };
}
