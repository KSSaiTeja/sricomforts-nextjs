import { Fragment, type ReactNode } from "react";
import { BRAND_NAME } from "@/lib/brand";

export function formatBrandCopy(text: string): ReactNode {
  const parts = text.split(/(Sri[\u00A0 ]Comforts)/g);
  if (parts.length === 1) return text;

  return parts.map((part, index) =>
    part === "Sri Comforts" || part === BRAND_NAME ? (
      <span key={`brand-${index}`} className="brand-nowrap">
        {BRAND_NAME}
      </span>
    ) : (
      <Fragment key={`text-${index}`}>{part}</Fragment>
    ),
  );
}

export function BrandText({ children }: { children: string }) {
  return <>{formatBrandCopy(children)}</>;
}
