"use client";

import { useState } from "react";

export type FilterType = "default" | "landscape" | "portrait";

type ImageSize = {
  width: number;
  height: number;
};

const FILTER_SIZE_MAP: Record<FilterType, ImageSize> = {
  default: { width: 640, height: 640 },
  landscape: { width: 640, height: 480 },
  portrait: { width: 480, height: 640 },
};

export const FILTER_OPTIONS = [
  { value: "default", label: "기본" },
  { value: "landscape", label: "가로형" },
  { value: "portrait", label: "세로형" },
] as const;

export function usePicturesFilter() {
  const [filterType, setFilterType] = useState<FilterType>("default");

  const imageSize = FILTER_SIZE_MAP[filterType];

  return {
    filterType,
    setFilterType,
    imageSize,
    filterOptions: FILTER_OPTIONS,
  };
}
