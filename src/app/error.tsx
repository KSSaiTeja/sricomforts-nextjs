"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "60vh",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        textAlign: "center",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <h2 style={{ fontSize: "1.75rem", color: "#051824", marginBottom: "0.75rem" }}>
        Something went wrong!
      </h2>
      <p
        style={{
          color: "rgba(5, 24, 36, 0.7)",
          marginBottom: "1.5rem",
          maxWidth: "28rem",
          fontSize: "0.9375rem",
          lineHeight: 1.5,
        }}
      >
        An error occurred while loading this page.
      </p>
      <button
        onClick={() => reset()}
        style={{
          padding: "0.75rem 1.5rem",
          backgroundColor: "#051824",
          color: "#ffffff",
          border: "none",
          borderRadius: "0.5rem",
          fontSize: "0.875rem",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Try again
      </button>
    </div>
  );
}
