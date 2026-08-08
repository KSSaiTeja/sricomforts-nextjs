/** Proportions from public/assets/brand/sricomforts-logo.png (2000×800 = 2.5:1) */
export const LOGO_LOCKUP = {
  icon: { width: 34, height: 35 },
  wordmark: { width: 192, height: 36 },
  gap: 14,
  full: { width: 1000, height: 400 },
} as const;

export const LOGO_WORDMARK = LOGO_LOCKUP.wordmark;
