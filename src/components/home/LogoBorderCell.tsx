"use client";

import { type CSSProperties, useEffect, useRef } from "react";
import { useSmoothScroll } from "@/providers/SmoothScrollProvider";

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
  const mouseRef = useRef({ x: 0, y: 0 });
  const { scroll } = useSmoothScroll();

  const updateTransform = () => {
    const wrapper = wrapperRef.current;
    const border = borderRef.current;
    const gradient = gradientRef.current;
    if (!wrapper || !border || !gradient) return;

    const rect = wrapper.getBoundingClientRect();
    const x = round(mouseRef.current.x - rect.left);
    const y = round(mouseRef.current.y - rect.top);

    const transform = `translate3d(calc(${x}px - 50%), calc(${y}px - 50%), 0)`;
    border.style.transform = transform;
    gradient.style.transform = transform;
  };

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      mouseRef.current.x = event.clientX;
      mouseRef.current.y = event.clientY;
      updateTransform();
    };

    const observer = new ResizeObserver(updateTransform);
    if (wrapperRef.current) observer.observe(wrapperRef.current);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("resize", updateTransform);

    return () => {
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", updateTransform);
    };
  }, []);

  useEffect(() => {
    updateTransform();
  }, [scroll]);

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
