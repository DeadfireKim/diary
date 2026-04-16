"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import { EmotionType } from "@/commons/constants/enum";
import { DiaryData } from "./index.binding.hook";

/**
 * 일기 수정 폼 스키마
 */
const updateDiarySchema = z.object({
  emotion: z.nativeEnum(EmotionType),
  title: z.string().min(1, "제목을 입력해주세요."),
  content: z.string().min(1, "내용을 입력해주세요."),
});

type UpdateDiaryFormValues = z.infer<typeof updateDiarySchema>;

const STORAGE_KEY = "diaries";

/**
 * 로컬스토리지에서 일기 목록 조회
 */
function getDiaries(): DiaryData[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? (JSON.parse(data) as DiaryData[]) : [];
  } catch {
    return [];
  }
}

/**
 * 로컬스토리지에 일기 목록 저장
 */
function saveDiaries(diaries: DiaryData[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(diaries));
}

/**
 * 일기 수정 Hook
 */
export function useUpdateDiary(diary: DiaryData | null) {
  const [isEditMode, setIsEditMode] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<UpdateDiaryFormValues>({
    resolver: zodResolver(updateDiarySchema),
    defaultValues: {
      emotion: EmotionType.Happy,
      title: "",
      content: "",
    },
  });

  // diary가 로드되면 폼 기본값을 일기 데이터로 초기화
  useEffect(() => {
    if (diary) {
      reset({
        emotion: diary.emotion,
        title: diary.title,
        content: diary.content,
      });
    }
  }, [diary, reset]);

  const watchedValues = watch();

  // 수정 버튼 활성화 조건: emotion/title/content 중 하나라도 변경된 경우
  const isSubmitEnabled = diary
    ? watchedValues.emotion !== diary.emotion ||
      watchedValues.title !== diary.title ||
      watchedValues.content !== diary.content
    : false;

  const onClickEdit = () => {
    setIsEditMode(true);
  };

  const onSubmit = handleSubmit((data: UpdateDiaryFormValues) => {
    if (!diary) return;

    const diaries = getDiaries();
    const updatedDiaries = diaries.map((d) =>
      d.id === diary.id
        ? {
            ...d,
            emotion: data.emotion,
            title: data.title,
            content: data.content,
          }
        : d,
    );

    saveDiaries(updatedDiaries);

    // 수정 완료 후 페이지 새로고침
    window.location.reload();
  });

  return {
    isEditMode,
    register,
    onClickEdit,
    onSubmit,
    errors,
    isSubmitEnabled,
  };
}
