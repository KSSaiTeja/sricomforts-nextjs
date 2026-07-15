import Image from "next/image";
import type { CSSProperties } from "react";
import { BRAND_NAME } from "@/lib/brand";

type FullLogoProps = {
  className?: string;
  style?: CSSProperties;
  priority?: boolean;
};

export function FullLogo({ className, style, priority }: FullLogoProps) {
  return (
    <Image
      src="/logo/full-logo.svg"
      alt={BRAND_NAME}
      width={240}
      height={43}
      className={className}
      style={style}
      priority={priority}
    />
  );
}
