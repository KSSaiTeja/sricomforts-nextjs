/** Proportions from public/logo/full-logo.svg viewBox="0 0 240 43" */
export const LOGO_LOCKUP = {
  icon: { width: 34, height: 35 },
  wordmark: { width: 192, height: 36 },
  gap: 14,
  full: { width: 240, height: 43 },
} as const;

export const LOGO_WORDMARK = LOGO_LOCKUP.wordmark;
