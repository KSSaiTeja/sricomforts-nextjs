import { forwardRef, type SVGProps } from "react";
import { WordmarkPaths } from "@/components/brand/WordmarkPaths";
import { WORDMARK_VIEWBOX } from "@/components/brand/wordmarkSlices";

export const LogoWordmark = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  function LogoWordmark({ className, ...props }, ref) {
    return (
      <svg
        ref={ref}
        viewBox={`0 0 ${WORDMARK_VIEWBOX.width} ${WORDMARK_VIEWBOX.height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
        className={className}
        {...props}
      >
        <WordmarkPaths />
      </svg>
    );
  },
);
