import type { CSSProperties, ElementType, ReactNode } from "react";

type TextRevealProps = {
  as?: ElementType;
  children: ReactNode;
  progress: number;
  startColor?: string;
  endColor?: string;
  className?: string;
};

export function TextReveal({
  as: Tag = "p",
  children,
  progress,
  startColor = "#ffffff",
  endColor = "rgba(255, 255, 255, 0.12)",
  className,
}: TextRevealProps) {
  const style = {
    "--text-reveal-start": startColor,
    "--text-reveal-end": endColor,
    "--text-reveal-progress": String(progress),
  } as CSSProperties;

  return (
    <Tag className={["text-reveal", className].filter(Boolean).join(" ")} style={style}>
      <span className="text-reveal-content">{children}</span>
    </Tag>
  );
}
