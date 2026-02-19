export type TypographyToken = Readonly<{
  fontWeight: number;
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
}>;

export const typography = {
  fontFamily: {
    ko: '"Pretendard", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
    en: '"SUIT Variable", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
  },
  ko: {
    web: {
      headline01: { fontWeight: 600, fontSize: 48, lineHeight: 60, letterSpacing: 0 },
      headline02: { fontWeight: 600, fontSize: 36, lineHeight: 48, letterSpacing: 0 },
      headline03: { fontWeight: 600, fontSize: 28, lineHeight: 36, letterSpacing: 0 },
    },
    mobile: {
      headline01: { fontWeight: 700, fontSize: 24, lineHeight: 32, letterSpacing: 0 },
      headline02: { fontWeight: 800, fontSize: 22, lineHeight: 30, letterSpacing: 0 },
      headline03: { fontWeight: 700, fontSize: 20, lineHeight: 28, letterSpacing: 0 },

      title01: { fontWeight: 700, fontSize: 18, lineHeight: 24, letterSpacing: 0 },
      title02: { fontWeight: 700, fontSize: 16, lineHeight: 22, letterSpacing: 0 },
      title03: { fontWeight: 700, fontSize: 14, lineHeight: 20, letterSpacing: 0 },

      subtitle01: { fontWeight: 600, fontSize: 14, lineHeight: 22, letterSpacing: 0 },
      subtitle02: { fontWeight: 600, fontSize: 12, lineHeight: 18, letterSpacing: 0 },

      body01: { fontWeight: 500, fontSize: 16, lineHeight: 24, letterSpacing: 0 },
      body02m: { fontWeight: 500, fontSize: 14, lineHeight: 22, letterSpacing: 0 },
      body02s: { fontWeight: 400, fontSize: 14, lineHeight: 20, letterSpacing: 0 },
      body03: { fontWeight: 500, fontSize: 12, lineHeight: 18, letterSpacing: 0 },

      caption01: { fontWeight: 600, fontSize: 12, lineHeight: 14, letterSpacing: 0 },
      caption02m: { fontWeight: 600, fontSize: 10, lineHeight: 12, letterSpacing: 0 },
      caption02s: { fontWeight: 500, fontSize: 10, lineHeight: 12, letterSpacing: 0 },
      caption03: { fontWeight: 600, fontSize: 8, lineHeight: 12, letterSpacing: 0 },

      /** Draft tokens from Figma labeled '(미정)' */
      body01Draft: { fontWeight: 400, fontSize: 16, lineHeight: 24, letterSpacing: 0 },
      body03Draft: { fontWeight: 400, fontSize: 12, lineHeight: 18, letterSpacing: 0 },
    },
  },
  /**
   * English/Number tokens are intentionally separated so they can diverge later.
   * For now, they mirror the KO scale.
   */
  en: {
    web: {
      headline01: { fontWeight: 600, fontSize: 48, lineHeight: 60, letterSpacing: 0 },
      headline02: { fontWeight: 600, fontSize: 36, lineHeight: 48, letterSpacing: 0 },
      headline03: { fontWeight: 600, fontSize: 28, lineHeight: 36, letterSpacing: 0 },
    },
    mobile: {
      headline01: { fontWeight: 700, fontSize: 24, lineHeight: 32, letterSpacing: 0 },
      headline02: { fontWeight: 800, fontSize: 22, lineHeight: 30, letterSpacing: 0 },
      headline03: { fontWeight: 700, fontSize: 20, lineHeight: 28, letterSpacing: 0 },

      title01: { fontWeight: 700, fontSize: 18, lineHeight: 24, letterSpacing: 0 },
      title02: { fontWeight: 700, fontSize: 16, lineHeight: 22, letterSpacing: 0 },
      title03: { fontWeight: 700, fontSize: 14, lineHeight: 20, letterSpacing: 0 },

      subtitle01: { fontWeight: 600, fontSize: 14, lineHeight: 22, letterSpacing: 0 },
      subtitle02: { fontWeight: 600, fontSize: 12, lineHeight: 18, letterSpacing: 0 },

      body01: { fontWeight: 500, fontSize: 16, lineHeight: 24, letterSpacing: 0 },
      body02m: { fontWeight: 500, fontSize: 14, lineHeight: 22, letterSpacing: 0 },
      body02s: { fontWeight: 400, fontSize: 14, lineHeight: 20, letterSpacing: 0 },
      body03: { fontWeight: 500, fontSize: 12, lineHeight: 18, letterSpacing: 0 },

      caption01: { fontWeight: 600, fontSize: 12, lineHeight: 14, letterSpacing: 0 },
      caption02m: { fontWeight: 600, fontSize: 10, lineHeight: 12, letterSpacing: 0 },
      caption02s: { fontWeight: 500, fontSize: 10, lineHeight: 12, letterSpacing: 0 },
      caption03: { fontWeight: 600, fontSize: 8, lineHeight: 12, letterSpacing: 0 },

      body01Draft: { fontWeight: 400, fontSize: 16, lineHeight: 24, letterSpacing: 0 },
      body03Draft: { fontWeight: 400, fontSize: 12, lineHeight: 18, letterSpacing: 0 },
    },
  },
} as const;

export type Typography = typeof typography;

export function toCssFontShorthand(
  token: TypographyToken,
  fontFamilyCssVar: string,
): string {
  return `${token.fontWeight} ${token.fontSize}px/${token.lineHeight}px var(${fontFamilyCssVar})`;
}
