import { useState, useMemo } from "react";
import { DiaryData } from "./index.binding.hook";

/**
 * 일기 목록 검색 Hook
 * localStorage의 diaries 데이터를 title 기준으로 필터링
 */
export function useDiarySearch(diaries: DiaryData[]) {
  const [searchValue, setSearchValue] = useState("");

  const filteredDiaries = useMemo(() => {
    if (!searchValue.trim()) {
      return diaries;
    }
    const lowerSearch = searchValue.toLowerCase();
    return diaries.filter((diary) =>
      diary.title.toLowerCase().includes(lowerSearch)
    );
  }, [diaries, searchValue]);

  return {
    searchValue,
    setSearchValue,
    filteredDiaries,
  };
}
