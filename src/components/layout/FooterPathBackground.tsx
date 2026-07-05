"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { pathFromPoints, type PathPoint } from "@/lib/svg/roundedPath";
import { useIsLargeViewport } from "@/hooks/useMediaQuery";

type FooterPathBackgroundProps = {
  children: ReactNode;
  className?: string;
  strokeColor?: string;
};

function getFooterPaths(width: number, height: number, isDesktop: boolean): PathPoint[][] {
  if (isDesktop) {
    return [
      [
        { x: width * 0.4, y: 0, radius: 0 },
        { x: width * 0.4, y: height * 0.15, radius: 50 },
        { x: width * 0.25, y: height * 0.15, radius: 50 },
        { x: width * 0.1, y: height * 0.15, radius: 50 },
        { x: width * 0.1, y: height * 0.55, radius: 75 },
        { x: 0, y: height * 0.37, radius: 0 },
      ],
      [
        { x: width * 0.6, y: 0, radius: 0 },
        { x: width * 0.6, y: height * 0.23, radius: 50 },
        { x: width * 0.9, y: height * 0.23, radius: 50 },
        { x: width * 0.9, y: height * 0.45, radius: 50 },
        { x: width, y: height * 0.45, radius: 0 },
      ],
      [
        { x: width, y: height * 0.8, radius: 0 },
        { x: width * 0.9, y: height * 0.65, radius: 20 },
        { x: width * 0.65, y: height * 0.65, radius: 50 },
        { x: width * 0.65, y: height, radius: 0 },
      ],
      [
        { x: 0, y: height * 0.65, radius: 0 },
        { x: width * 0.3, y: height * 0.65, radius: 120 },
        { x: width * 0.1, y: height, radius: 0 },
      ],
    ];
  }

  return [
    [
      { x: 0, y: height * 0.05, radius: 0 },
      { x: width * 0.2, y: height * 0.05, radius: 20 },
      { x: width * 0.7, y: height * 0.3, radius: 60 },
      { x: width * 0.7, y: height * 0.05, radius: 30 },
      { x: width, y: height * 0.05, radius: 0 },
    ],
    [
      { x: width, y: height * 0.8, radius: 0 },
      { x: width * 0.7, y: height * 0.8, radius: 30 },
      { x: width * 0.7, y: height, radius: 0 },
    ],
    [
      { x: 0, y: height * 0.75, radius: 0 },
      { x: width * 0.3, y: height * 0.75, radius: 75 },
      { x: 0, y: height * 0.95, radius: 0 },
    ],
  ];
}

export function FooterPathBackground({
  children,
  className,
  strokeColor = "#A2A2A2",
}: FooterPathBackgroundProps) {
  const isDesktop = useIsLargeViewport();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 1, height: 1 });

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const update = () => {
      setDimensions({
        width: element.offsetWidth || 1,
        height: element.offsetHeight || 1,
      });
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const paths = getFooterPaths(dimensions.width, dimensions.height, isDesktop).map((points) =>
    pathFromPoints(points, dimensions),
  );

  return (
    <div ref={containerRef} className={`path-background${className ? ` ${className}` : ""}`}>
      <svg
        width={dimensions.width}
        height={dimensions.height}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        className="path-background__svg"
        aria-hidden
      >
        {paths.map((path, index) => (
          <path
            key={index}
            d={path}
            stroke={strokeColor}
            fill="none"
            strokeOpacity="0.15"
            strokeWidth="1"
          />
        ))}
      </svg>
      <div className="path-background__content content">{children}</div>
    </div>
  );
}
