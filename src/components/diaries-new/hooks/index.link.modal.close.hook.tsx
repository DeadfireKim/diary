"use client";

import { useModal } from "@/commons/providers/modal/modal.provider";
import Modal from "@/commons/components/modal";

/**
 * 일기쓰기 모달 닫기 Hook
 *
 * 닫기 버튼 클릭 시 등록취소 확인 모달을 2중 모달로 표시하고,
 * 사용자의 선택에 따라 모달을 제어합니다.
 */
export function useModalClose() {
  const { openModal, closeModal } = useModal();

  /**
   * 닫기 버튼 클릭 핸들러
   * 등록취소 확인 모달을 2중 모달로 오픈
   */
  const handleClose = () => {
    openModal(
      <div data-testid="cancel-confirm-modal">
        <Modal
          variant="info"
          actions="dual"
          title="등록을 취소하시겠습니까?"
          message="작성 중인 내용이 저장되지 않습니다."
          confirmText="등록취소"
          cancelText="계속작성"
          onConfirm={handleCancel}
          onCancel={handleContinue}
        />
      </div>
    );
  };

  /**
   * 계속작성 버튼 클릭 핸들러
   * 등록취소 모달만 닫기 (최상단 모달만 제거)
   */
  const handleContinue = () => {
    closeModal();
  };

  /**
   * 등록취소 버튼 클릭 핸들러
   * 등록취소 모달과 일기쓰기 모달 모두 닫기
   */
  const handleCancel = () => {
    closeModal(); // 등록취소 모달 닫기
    closeModal(); // 일기쓰기 모달 닫기
  };

  return {
    handleClose,
  };
}
