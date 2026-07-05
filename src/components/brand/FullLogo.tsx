import Image from "next/image";
import type { CSSProperties } from "react";

type FullLogoProps = {
  className?: string;
  style?: CSSProperties;
  priority?: boolean;
};

export function FullLogo({ className, style, priority }: FullLogoProps) {
  return (
    <Image
      src="/logo/full-logo.svg"
      alt="Sri Comforts"
      width={240}
      height={43}
      className={className}
      style={style}
      priority={priority}
    />
  );
}
