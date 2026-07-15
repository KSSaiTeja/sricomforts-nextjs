"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SvgMask } from "@/components/preloader/SvgMask";
import { registerGsap } from "@/lib/gsap/register";
import { createNotch, NotchDirection, type Notch } from "@/types/notch";
import { useIsLargeViewport } from "@/hooks/useMediaQuery";

type NotchEdge = {
  from: number;
  to: number;
};

type NotchSectionProps = {
  top?: NotchEdge | false;
  bottom?: NotchEdge | false;
  children: React.ReactNode;
};

function lerp(start: number, end: number, progress: number) {
  return start + (end - start) * progress;
}

export function NotchSection({ top = false, bottom = false, children }: NotchSectionProps) {
  const isDesktop = useIsLargeViewport();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [notches, setNotches] = useState<Notch[]>([]);

  useEffect(() => {
    const edgeOffset = isDesktop ? 40 : 20;
    const next: Notch[] = [];

    if (top !== false) {
      next.push(
        createNotch(NotchDirection.top, {
          size: 0.65,
          position: 0.5,
          offset: edgeOffset * (top?.from ?? -1),
          radius: 40,
          notchWidth: 0.95,
        }),
      );
    }

    if (bottom !== false) {
      next.push(
        createNotch(NotchDirection.bottom, {
          size: 0.65,
          position: 0.5,
          offset: edgeOffset * (bottom?.from ?? -1),
          radius: 40,
          notchWidth: 0.95,
        }),
      );
    }

    setNotches(next);
  }, [isDesktop, top, bottom]);

  useEffect(() => {
    if (!wrapperRef.current) return;
    if (top === false && bottom === false) return;

    registerGsap();
    const wrapper = wrapperRef.current;
    const edgeOffset = isDesktop ? 40 : 20;
    const triggers: ScrollTrigger[] = [];

    if (top !== false) {
      triggers.push(
        ScrollTrigger.create({
          trigger: wrapper,
          start: "top bottom",
          end: "top top",
          scrub: true,
          onUpdate: ({ progress }) => {
            setNotches((current) =>
              current.map((notch) =>
                notch.direction === NotchDirection.top
                  ? {
                      ...notch,
                      offset: lerp(top?.from ?? -1, top?.to ?? 1, progress) * edgeOffset,
                    }
                  : notch,
              ),
            );
          },
        }),
      );
    }

    if (bottom !== false) {
      triggers.push(
        ScrollTrigger.create({
          trigger: wrapper,
          start: "bottom bottom",
          end: "bottom top",
          scrub: true,
          onUpdate: ({ progress }) => {
            setNotches((current) =>
              current.map((notch) =>
                notch.direction === NotchDirection.bottom
                  ? {
                      ...notch,
                      offset: lerp(bottom?.from ?? -1, bottom?.to ?? 1, progress) * edgeOffset,
                    }
                  : notch,
              ),
            );
          },
        }),
      );
    }

    return () => triggers.forEach((trigger) => trigger.kill());
  }, [isDesktop, top, bottom]);

  return (
    <div ref={wrapperRef} className="notch-section__wrapper">
      <SvgMask notches={notches} useClip>
        {children}
      </SvgMask>
    </div>
  );
}
