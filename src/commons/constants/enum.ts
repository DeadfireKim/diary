import { colorPalette } from "./color";

/**
 * 감정(Emotion) Enum
 * 일기 작성 시 사용자의 감정 상태를 표현하는 데이터
 */
export enum EmotionType {
  Happy = "HAPPY",
  Sad = "SAD",
  Angry = "ANGRY",
  Surprise = "SURPRISE",
  Etc = "ETC",
}

/**
 * 감정별 메타데이터 인터페이스
 */
export interface EmotionMeta {
  label: string;
  imageMedium: string;
  imageSmall: string;
  color: string;
}

/**
 * 감정별 메타데이터 맵
 * 화면에 표시될 텍스트, 이미지 경로, 색상 정보를 포함
 */
export const emotionMetaMap: Record<EmotionType, EmotionMeta> = {
  [EmotionType.Happy]: {
    label: "행복해요",
    imageMedium: "/images/emotion-happy-m.png",
    imageSmall: "/images/emotion-happy-s.png",
    color: colorPalette.red["60"],
  },
  [EmotionType.Sad]: {
    label: "슬퍼요",
    imageMedium: "/images/emotion-sad-m.png",
    imageSmall: "/images/emotion-sad-s.png",
    color: colorPalette.blue["60"],
  },
  [EmotionType.Angry]: {
    label: "화나요",
    imageMedium: "/images/emotion-angry-m.png",
    imageSmall: "/images/emotion-angry-s.png",
    color: colorPalette.gray["60"],
  },
  [EmotionType.Surprise]: {
    label: "놀랐어요",
    imageMedium: "/images/emotion-surprise-m.png",
    imageSmall: "/images/emotion-surprise-s.png",
    color: colorPalette.yellow["60"],
  },
  [EmotionType.Etc]: {
    label: "기타",
    imageMedium: "/images/emotion-etc-m.png",
    imageSmall: "/images/emotion-etc-s.png",
    color: colorPalette.green["60"],
  },
};

/**
 * 감정 타입에 해당하는 메타데이터를 반환하는 헬퍼 함수
 */
export const getEmotionMeta = (emotion: EmotionType): EmotionMeta => {
  return emotionMetaMap[emotion];
};

/**
 * 모든 감정 타입 배열
 */
export const allEmotions = Object.values(EmotionType);
