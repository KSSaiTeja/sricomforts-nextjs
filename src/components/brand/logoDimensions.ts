/** Proportions from public/assets/brand/sricomforts-logo.png */
export const LOGO_LOCKUP = {
  icon: { width: 34, height: 35 },
  wordmark: { width: 192, height: 36 },
  gap: 14,
  full: { width: 960, height: 159 },
} as const;

/** On-screen lockup widths (CSS px). Source is 960×159 (4× of ~240×40). */
export const LOGO_DISPLAY = {
  nav: { min: 240, max: 300 },
  drawer: { min: 220, max: 260 },
  footer: { min: 260, max: 340 },
} as const;

export const LOGO_WORDMARK = LOGO_LOCKUP.wordmark;
