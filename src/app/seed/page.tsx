"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const EMOTIONS = ["HAPPY", "SAD", "ANGRY", "SURPRISE", "ETC"] as const;
const TITLES = [
  "오늘 하루도 수고했어",
  "좋은 하루였다",
  "힘든 하루였지만",
  "평범한 하루",
  "특별한 하루",
  "행복했던 하루",
  "슬펐던 하루",
  "화났던 하루",
  "놀라운 일이 있었다",
  "그냥 그런 하루",
  "친구를 만났다",
  "혼자 산책했다",
  "맛있는 걸 먹었다",
  "책을 읽었다",
  "영화를 봤다",
  "운동을 했다",
  "가족과 함께했다",
  "새로운 시작",
  "오랜만에 연락",
  "일이 잘 됐다",
];

function generateDiaries(count: number) {
  return Array.from({ length: count }, (_, i) => {
    const id = i + 1;
    const emotion = EMOTIONS[i % EMOTIONS.length];
    const title = TITLES[i % TITLES.length] + " " + id;
    const date = new Date(2024, Math.floor(i / 28), (i % 28) + 1);
    return {
      id,
      title,
      content:
        title + "에 대한 기록입니다. 오늘도 하루를 마무리하며 일기를 씁니다.",
      emotion,
      createdAt: date.toISOString(),
    };
  });
}

export default function SeedPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "done">("idle");
  const [count, setCount] = useState(0);

  useEffect(() => {
    const existing = JSON.parse(localStorage.getItem("diaries") || "[]");
    const existingIds = new Set(existing.map((d: { id: number }) => d.id));
    const newDiaries = generateDiaries(100).filter(
      (d) => !existingIds.has(d.id)
    );
    const merged = [...existing, ...newDiaries];
    localStorage.setItem("diaries", JSON.stringify(merged));
    setCount(merged.length);
    setStatus("done");

    const timer = setTimeout(() => router.push("/diaries"), 1500);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div style={{ padding: 40, fontFamily: "sans-serif" }}>
      {status === "idle" && <p>저장 중...</p>}
      {status === "done" && (
        <>
          <p>✅ diaries {count}개 저장 완료</p>
          <p style={{ color: "#888", fontSize: 14 }}>
            /diaries 페이지로 이동합니다...
          </p>
        </>
      )}
    </div>
  );
}
