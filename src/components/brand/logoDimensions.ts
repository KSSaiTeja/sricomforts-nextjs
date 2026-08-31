/** Proportions from public/assets/brand/sricomforts-logo.png */
export const LOGO_LOCKUP = {
  icon: { width: 34, height: 35 },
  wordmark: { width: 192, height: 36 },
  gap: 14,
  full: { width: 988, height: 145 },
} as const;

/** On-screen lockup widths (CSS px). Source is 988×145 (~6.8:1). */
export const LOGO_DISPLAY = {
  nav: { min: 180, max: 270 },
  drawer: { min: 180, max: 220 },
  footer: { min: 240, max: 300 },
} as const;

export const LOGO_WORDMARK = LOGO_LOCKUP.wordmark;
