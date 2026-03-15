import { useModal } from "@/commons/providers/modal/modal.provider";
import DiariesNew from "@/components/diaries-new";

/**
 * 일기쓰기 모달을 열기 위한 Hook
 * 모달 프로바이더를 활용하여 DiariesNew 컴포넌트를 모달로 표시
 */
export const useDiaryModal = () => {
  const { openModal, closeModal, isOpen } = useModal();

  const openDiaryModal = () => {
    openModal(<DiariesNew />);
  };

  return {
    openDiaryModal,
    closeDiaryModal: closeModal,
    isModalOpen: isOpen,
  };
};
