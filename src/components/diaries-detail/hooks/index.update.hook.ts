"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
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

function getDiaries(): DiaryData[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? (JSON.parse(data) as DiaryData[]) : [];
  } catch {
    return [];
  }
}

function saveDiaries(diaries: DiaryData[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(diaries));
}

/**
 * 일기 수정 Hook
 * 수정 완료 시 편집 모드를 닫고 페이지를 새로고침합니다.
 */
export function useUpdateDiary(diary: DiaryData | null) {
  const [isEditMode, setIsEditMode] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
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

  const isSubmitEnabled = diary
    ? watchedValues.emotion !== diary.emotion ||
      watchedValues.title !== diary.title ||
      watchedValues.content !== diary.content
    : false;

  const onClickEdit = () => {
    setIsEditMode(true);
  };

  const onClickCancel = () => {
    setIsEditMode(false);
    if (diary) {
      reset({
        emotion: diary.emotion,
        title: diary.title,
        content: diary.content,
      });
    }
  };

  const onSubmit = handleSubmit((data: UpdateDiaryFormValues) => {
    if (!diary) return;

    const diaries = getDiaries();
    const updatedDiaries = diaries.map((d) =>
      d.id === diary.id
        ? { ...d, emotion: data.emotion, title: data.title, content: data.content }
        : d
    );

    saveDiaries(updatedDiaries);
    setIsEditMode(false);
    window.location.reload();
  });

  return {
    isEditMode,
    register,
    onSubmit,
    watch,
    setValue,
    onClickEdit,
    onClickCancel,
    errors,
    isSubmitEnabled,
  };
}
