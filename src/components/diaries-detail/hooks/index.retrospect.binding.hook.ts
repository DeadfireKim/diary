import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Retrospect } from "./index.retrospect.form.hook";

const STORAGE_KEY = "retrospects";

/**
 * 일기 상세 페이지의 회고 목록 바인딩 Hook
 * URL의 [id]와 일치하는 diaryId를 가진 회고만 반환
 */
export function useRetrospectBinding() {
  const params = useParams();
  const [retrospects, setRetrospects] = useState<Retrospect[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const id = params?.id;
    if (!id) {
      setRetrospects([]);
      return;
    }

    const diaryId =
      typeof id === "string" ? parseInt(id, 10) : Number(id);

    try {
      const data = localStorage.getItem(STORAGE_KEY);
      const all: Retrospect[] = data ? (JSON.parse(data) as Retrospect[]) : [];
      setRetrospects(all.filter((r) => r.diaryId === diaryId));
    } catch {
      setRetrospects([]);
    }
  }, [params]);

  return { retrospects };
}
