"use client";

import { useModal } from "@/commons/providers/modal/modal.provider";
import { useRouter } from "next/navigation";
import Modal from "@/commons/components/modal";
import { routes } from "@/commons/constants/url";

export function useDiaryDetailDelete(diaryId: number) {
  const { openModal, closeModal } = useModal();
  const router = useRouter();

  const deleteDiary = () => {
    openModal(
      <Modal
        variant="danger"
        actions="dual"
        title="일기 삭제"
        message="정말로 삭제하시겠습니까?"
        confirmText="삭제"
        cancelText="취소"
        onConfirm={() => {
          const diariesJson = localStorage.getItem("diaries");
          if (diariesJson) {
            try {
              const diaries = JSON.parse(diariesJson);
              const updated = diaries.filter(
                (d: { id: number }) => d.id !== diaryId
              );
              localStorage.setItem("diaries", JSON.stringify(updated));
            } catch {
              /* no-op */
            }
          }
          closeModal();
          router.push(routes.diaries.path);
        }}
        onCancel={closeModal}
      />
    );
  };

  return { deleteDiary };
}
