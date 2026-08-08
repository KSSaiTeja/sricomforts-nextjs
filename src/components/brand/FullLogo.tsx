import Image from "next/image";
import type { CSSProperties } from "react";
import { BRAND_NAME } from "@/lib/brand";
import { LOGO_LOCKUP } from "@/components/brand/logoDimensions";

/** Exact brand lockup — do not point elsewhere */
export const BRAND_LOGO_SRC = "/assets/brand/sricomforts-logo.png";

type FullLogoProps = {
  className?: string;
  style?: CSSProperties;
  priority?: boolean;
};

export function FullLogo({ className, style, priority }: FullLogoProps) {
  return (
    <Image
      src={BRAND_LOGO_SRC}
      alt={BRAND_NAME}
      width={LOGO_LOCKUP.full.width}
      height={LOGO_LOCKUP.full.height}
      className={className}
      style={style}
      priority={priority}
      // Avoid Next image optimizer crushing the thin ® strokes
      unoptimized
      sizes="(min-width: 1024px) 16rem, 12.5rem"
    />
  );
}
