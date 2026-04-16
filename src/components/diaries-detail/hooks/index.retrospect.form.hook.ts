"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

/**
 * 회고 데이터 타입
 */
export type Retrospect = {
  id: number;
  content: string;
  diaryId: number;
  createdAt: string;
};

/**
 * 회고 폼 스키마
 */
const retrospectSchema = z.object({
  content: z.string().min(1, "회고 내용을 입력해주세요."),
});

type RetrospectFormValues = z.infer<typeof retrospectSchema>;

const STORAGE_KEY = "retrospects";

/**
 * 로컬스토리지에서 회고 목록 조회
 */
function getRetrospects(): Retrospect[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? (JSON.parse(data) as Retrospect[]) : [];
  } catch {
    return [];
  }
}

/**
 * 로컬스토리지에 회고 목록 저장
 */
function saveRetrospects(retrospects: Retrospect[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(retrospects));
}

/**
 * 회고 등록 폼 Hook
 */
export function useRetrospectForm(diaryId: number) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RetrospectFormValues>({
    resolver: zodResolver(retrospectSchema),
    defaultValues: {
      content: "",
    },
  });

  const contentValue = watch("content");
  const isSubmitEnabled = contentValue.trim().length > 0;

  const onSubmit = handleSubmit((data: RetrospectFormValues) => {
    const existing = getRetrospects();

    const newId =
      existing.length > 0 ? Math.max(...existing.map((r) => r.id)) + 1 : 1;

    const newRetrospect: Retrospect = {
      id: newId,
      content: data.content,
      diaryId,
      createdAt: new Date().toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).replace(/\. /g, ".").replace(/\.$/, ""),
    };

    saveRetrospects([...existing, newRetrospect]);

    // 등록 완료 후 페이지 새로고침
    window.location.reload();
  });

  return {
    register,
    onSubmit,
    errors,
    isSubmitEnabled,
  };
}
