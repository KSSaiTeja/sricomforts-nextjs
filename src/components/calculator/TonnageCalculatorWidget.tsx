"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const HIDDEN_PREFIXES = ["/resources/ac-tonnage-calculator"];
const CALCULATOR_HREF = "/resources/ac-tonnage-calculator";

function AcTonnageIcon() {
  return (
    <svg
      className="tonnage-widget__fab-icon"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      {/* Split-AC style mark: unit + cool airflow */}
      <rect
        x="3.5"
        y="7"
        width="11"
        height="10"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M6 10.25h6M6 13.75h4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M16.5 9.5c1.4.9 2.3 1.7 2.3 2.5s-.9 1.6-2.3 2.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M19 8.25c1.6 1.1 2.75 2.1 2.75 3.75S20.6 14.65 19 15.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

export function TonnageCalculatorWidget() {
  const pathname = usePathname();

  const hidden = HIDDEN_PREFIXES.some(
    (p) => pathname === p || pathname?.startsWith(`${p}/`),
  );

  if (hidden) return null;

  return (
    <div className="tonnage-widget">
      <Link
        href={CALCULATOR_HREF}
        className="tonnage-widget__fab"
        aria-label="AC tonnage quick estimate calculator"
      >
        <span className="tonnage-widget__fab-glyph">
          <AcTonnageIcon />
        </span>
        <span className="tonnage-widget__fab-text">
          <span className="tonnage-widget__fab-title">AC Tonnage</span>
          <span className="tonnage-widget__fab-sub">Quick estimate</span>
        </span>
        <span className="tonnage-widget__fab-arrow" aria-hidden>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M3.5 8h9M8.5 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </Link>
    </div>
  );
}
