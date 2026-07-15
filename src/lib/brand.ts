/** Display name — non-breaking space keeps "Sri Comforts" on one line. */
export const BRAND_NAME = "Sri\u00A0Comforts";

/** Keep the brand name from wrapping mid-name in any copy string. */
export function keepBrandTogether(text: string): string {
  return text.replaceAll("Sri Comforts", BRAND_NAME);
}
