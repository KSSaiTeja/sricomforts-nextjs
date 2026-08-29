/** Proportions from public/assets/brand/sricomforts-logo.png */
export const LOGO_LOCKUP = {
  icon: { width: 34, height: 35 },
  wordmark: { width: 192, height: 36 },
  gap: 14,
  full: { width: 1957, height: 413 },
} as const;

/** On-screen lockup widths (CSS px). Export the source at 4× desktop nav = 960×203. */
export const LOGO_DISPLAY = {
  nav: { min: 200, max: 240 },
  drawer: { min: 176, max: 200 },
  footer: { min: 220, max: 280 },
} as const;

export const LOGO_WORDMARK = LOGO_LOCKUP.wordmark;
