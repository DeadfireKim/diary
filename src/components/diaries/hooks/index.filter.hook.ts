import { useState, useMemo } from "react";
import { EmotionType, emotionMetaMap } from "@/commons/constants/enum";
import { DiaryData } from "./index.binding.hook";

export type FilterValue = "all" | EmotionType;

export function useDiaryFilter(diaries: DiaryData[]) {
  const [filterValue, setFilterValue] = useState<FilterValue>("all");

  const filterOptions = [
    { value: "all", label: "전체" },
    { value: EmotionType.Happy, label: emotionMetaMap[EmotionType.Happy].label },
    { value: EmotionType.Sad, label: emotionMetaMap[EmotionType.Sad].label },
    { value: EmotionType.Surprise, label: emotionMetaMap[EmotionType.Surprise].label },
    { value: EmotionType.Angry, label: emotionMetaMap[EmotionType.Angry].label },
  ];

  const emotionFilteredDiaries = useMemo(() => {
    if (filterValue === "all") return diaries;
    return diaries.filter((diary) => diary.emotion === filterValue);
  }, [diaries, filterValue]);

  return {
    filterValue,
    setFilterValue,
    filterOptions,
    emotionFilteredDiaries,
  };
}
