import { useState, useMemo, useEffect } from "react";
import { DiaryData } from "./index.binding.hook";

const PAGE_SIZE = 12;

/**
 * 일기 목록 페이지네이션 Hook
 * @param diaries - 검색 및 필터링이 완료된 일기 배열
 * @returns currentPage, setCurrentPage, pagedDiaries, totalPages
 */
export function useDiaryPagination(diaries: DiaryData[]) {
  const [currentPage, setCurrentPage] = useState(1);

  // diaries 변경(검색/필터) 시 1페이지로 초기화
  useEffect(() => {
    setCurrentPage(1);
  }, [diaries]);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(diaries.length / PAGE_SIZE));
  }, [diaries]);

  const pagedDiaries = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return diaries.slice(start, end);
  }, [diaries, currentPage]);

  return {
    currentPage,
    setCurrentPage,
    pagedDiaries,
    totalPages,
  };
}
