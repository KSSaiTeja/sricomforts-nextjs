"use client";

import { useId } from "react";
import styles from "./preloader.module.css";

export function PathBackground() {
  const uid = useId().replace(/:/g, "");
  const gradientA = `path-bg-a-${uid}`;
  const gradientB = `path-bg-b-${uid}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1920"
      height="1080"
      fill="none"
      viewBox="0 0 1920 1080"
      className={styles.pathBackground}
      aria-hidden
    >
      <path
        stroke={`url(#${gradientA})`}
        d="M-700.91 637.033c-35.991 0-65.09-29.072-65.09-65.03V243.03c0-35.958 29.099-65.03 65.09-65.03h443.989c17.306 0 33.846 6.885 46.099 19.126l333.719 333.258a53 53 0 0 0 4.135 4.132c10.261 9.333 23.739 15.301 38.748 15.913 35.071 1.377 63.711-29.99 63.711-65.03V243.03c0-35.958 29.099-65.03 65.09-65.03H696.5c38.66 0 70-31.34 70-70v-298"
        opacity=".15"
      />
      <path
        stroke={`url(#${gradientB})`}
        d="M1243-383v495.474c0 35.957 29.1 65.029 65.09 65.029h275.35c35.99 0 65.09 29.072 65.09 65.03V436.5c0 33.137 26.87 60 60 60H2002"
        opacity=".15"
      />
      <path
        stroke="var(--color-border-decorative)"
        d="m284 1160.5 252.476-251.616a26 26 0 0 0 2.91-2.908c9.802-10.557 15.928-24.481 16.54-39.782C557.152 831.46 525.602 803 490.837 803H-7M1270 1115V913.089c0-35.99 29.07-65.089 65.03-65.089h429.55a79.98 79.98 0 0 1 46.91 15.195L2082 1059"
        opacity=".15"
      />
      <defs>
        <linearGradient
          id={gradientA}
          x1="384.5"
          x2="384.5"
          y1="53.5"
          y2="-181"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--color-border-decorative)" />
          <stop offset="1" stopColor="var(--color-border-decorative)" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id={gradientB}
          x1="1445.77"
          x2="1445.77"
          y1="-389.5"
          y2="726"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--color-border-decorative)" stopOpacity="0" />
          <stop offset=".25" stopColor="var(--color-border-decorative)" />
          <stop offset=".75" stopColor="var(--color-border-decorative)" />
          <stop offset="1" stopColor="var(--color-border-decorative)" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
