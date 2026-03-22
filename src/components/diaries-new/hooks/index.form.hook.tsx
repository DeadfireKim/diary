import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { EmotionType } from "@/commons/constants/enum";
import { buildPath } from "@/commons/constants/url";
import { useModal } from "@/commons/providers/modal/modal.provider";
import Modal from "@/commons/components/modal";

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
 * 폼 데이터 스키마
 */
const diaryFormSchema = z.object({
  emotion: z.nativeEnum(EmotionType, { message: "감정을 선택해주세요." }),
  title: z.string().min(1, { message: "제목을 입력해주세요." }),
  content: z.string().min(1, { message: "내용을 입력해주세요." }),
});

export type DiaryFormData = z.infer<typeof diaryFormSchema>;

/**
 * 일기 작성 폼 Hook
 */
export function useDiaryForm() {
  const router = useRouter();
  const { openModal, closeModal } = useModal();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm<DiaryFormData>({
    resolver: zodResolver(diaryFormSchema),
    mode: "onChange",
    defaultValues: {
      emotion: undefined,
      title: "",
      content: "",
    },
  });

  /**
   * 로컬스토리지에서 기존 일기 목록 조회
   */
  const getDiaries = (): DiaryData[] => {
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem("diaries");
    return data ? JSON.parse(data) : [];
  };

  /**
   * 로컬스토리지에 일기 저장
   */
  const saveDiary = (formData: DiaryFormData): number => {
    const existingDiaries = getDiaries();

    // 새 일기 ID 생성: 기존 일기가 있으면 최대 id+1, 없으면 1
    const newId = existingDiaries.length > 0
      ? Math.max(...existingDiaries.map((d) => d.id)) + 1
      : 1;

    const newDiary: DiaryData = {
      id: newId,
      title: formData.title,
      content: formData.content,
      emotion: formData.emotion,
      createdAt: new Date().toISOString(),
    };

    const updatedDiaries = [...existingDiaries, newDiary];
    localStorage.setItem("diaries", JSON.stringify(updatedDiaries));

    return newId;
  };

  /**
   * 등록완료 모달 표시
   */
  const showCompletionModal = (diaryId: number) => {
    openModal(
      <div data-testid="completion-modal">
        <Modal
          variant="info"
          actions="single"
          title="등록 완료"
          message="일기가 성공적으로 등록되었습니다."
          confirmText="확인"
          onConfirm={() => {
            // 모든 모달 닫기 (completion-modal과 diaries-new-wrapper)
            closeModal(); // completion-modal 닫기
            closeModal(); // diaries-new-wrapper 닫기
            // 상세 페이지로 이동
            router.push(buildPath.diaryDetail(diaryId));
          }}
        />
      </div>
    );
  };

  /**
   * 폼 제출 핸들러
   */
  const onSubmit = (data: DiaryFormData) => {
    const diaryId = saveDiary(data);
    showCompletionModal(diaryId);
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isValid,
    setValue,
    watch,
  };
}
