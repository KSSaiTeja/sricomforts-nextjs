"use client";

import { useEffect, useRef } from "react";

type PaddedCounterProps = {
  startValue?: number;
  endValue: number;
  progress: number;
  padLength?: number;
};

function getDigits(value: number, padLength: number) {
  return String(Math.floor(value))
    .padStart(padLength, "0")
    .split("")
    .map((digit) => parseInt(digit, 10));
}

export function PaddedCounter({
  startValue = 1,
  endValue,
  progress,
  padLength = 2,
}: PaddedCounterProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const stackRefs = useRef<(HTMLDivElement | null)[]>([]);
  const digitHeightRef = useRef(1);

  useEffect(() => {
    if (rootRef.current) {
      digitHeightRef.current = rootRef.current.offsetHeight || 1;
    }
  }, []);

  useEffect(() => {
    const digitHeight = digitHeightRef.current;
    const fromDigits = getDigits(startValue, padLength);
    const toDigits = getDigits(endValue, padLength);

    fromDigits.forEach((fromDigit, columnIndex) => {
      const stack = stackRefs.current[columnIndex];
      if (!stack) return;

      const toDigit = toDigits[columnIndex] ?? 0;
      const delta = (toDigit - fromDigit + 10) % 10;
      const value = (fromDigit + delta * progress) % 10;
      stack.style.transform = `translate3d(0, ${-value * digitHeight}px, 0)`;
    });
  }, [endValue, padLength, progress, startValue]);

  return (
    <div ref={rootRef} className="odometer" aria-hidden>
      {Array.from({ length: padLength }, (_, columnIndex) => (
        <div key={columnIndex} className="digit-column">
          <div
            ref={(node) => {
              stackRefs.current[columnIndex] = node;
            }}
            className="digit-stack"
          >
            {Array.from({ length: 10 }, (_, digit) => (
              <div key={digit} className="digit">
                <span>{digit}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
