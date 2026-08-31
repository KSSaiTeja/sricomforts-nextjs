"use client";

import { type CSSProperties, useEffect, useRef } from "react";

type LogoBorderCellProps = {
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
};

function round(value: number) {
  return Math.round(value * 10) / 10;
}

export function LogoBorderCell({ children, className, style }: LogoBorderCellProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const border = borderRef.current;
    const gradient = gradientRef.current;
    if (!wrapper || !border || !gradient) return;

    const move = (event: PointerEvent) => {
      const rect = wrapper.getBoundingClientRect();
      const x = round(event.clientX - rect.left);
      const y = round(event.clientY - rect.top);
      const transform = `translate3d(calc(${x}px - 50%), calc(${y}px - 50%), 0)`;
      border.style.transform = transform;
      gradient.style.transform = transform;
    };

    wrapper.addEventListener("pointermove", move, { passive: true });
    return () => wrapper.removeEventListener("pointermove", move);
  }, []);

  return (
    <div ref={wrapperRef} className={`border__wrapper ${className ?? ""}`} style={style}>
      <div className="overflow__wrapper">
        <div className="border-bg-v" />
        <div className="border-bg-h" />
        <div ref={borderRef} className="border-holder" />
        <div className="background-holder" />
        <div className="slot__wrapper">{children}</div>
        <div ref={gradientRef} className="background-gradient" />
      </div>
    </div>
  );
}
