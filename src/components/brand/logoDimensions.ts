/** Proportions from public/assets/brand/sricomforts-logo.png (1000×215 ≈ 4.65:1) */
export const LOGO_LOCKUP = {
  icon: { width: 34, height: 35 },
  wordmark: { width: 192, height: 36 },
  gap: 14,
  full: { width: 1000, height: 215 },
} as const;

export const LOGO_WORDMARK = LOGO_LOCKUP.wordmark;
