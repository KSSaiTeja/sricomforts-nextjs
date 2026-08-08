import Image from "next/image";
import type { CSSProperties } from "react";
import { BRAND_NAME } from "@/lib/brand";
import { LOGO_LOCKUP } from "@/components/brand/logoDimensions";

type FullLogoProps = {
  className?: string;
  style?: CSSProperties;
  priority?: boolean;
};

export function FullLogo({ className, style, priority }: FullLogoProps) {
  return (
    <Image
      src="/assets/brand/sricomforts-logo.png"
      alt={BRAND_NAME}
      width={LOGO_LOCKUP.full.width}
      height={LOGO_LOCKUP.full.height}
      className={className}
      style={style}
      priority={priority}
    />
  );
}
