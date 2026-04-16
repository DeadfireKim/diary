import { useModal } from "@/commons/providers/modal/modal.provider";
import { useAuthGuard } from "@/commons/providers/auth/auth.guard.hook";
import DiariesNew from "@/components/diaries-new";

/**
 * 일기쓰기 모달을 열기 위한 Hook
 * 액션 GUARD를 통해 로그인 여부를 확인 후 모달을 열거나 로그인 요청 모달을 표시
 */
export const useDiaryModal = () => {
  const { openModal, closeModal, isOpen } = useModal();
  const { guard } = useAuthGuard();

  const openDiaryModal = () => {
    guard(() => {
      openModal(<DiariesNew />);
    });
  };

  return {
    openDiaryModal,
    closeDiaryModal: closeModal,
    isModalOpen: isOpen,
  };
};
