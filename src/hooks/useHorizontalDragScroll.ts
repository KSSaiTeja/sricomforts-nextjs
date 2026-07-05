"use client";

import { useEffect, type RefObject } from "react";

type UseHorizontalDragScrollOptions = {
  onIndexChange?: (index: number) => void;
};

function nearestIndex(container: HTMLElement) {
  const scrollLeft = container.scrollLeft;
  let nearest = 0;
  let distance = Infinity;

  Array.from(container.children).forEach((child, index) => {
    const element = child as HTMLElement;
    const nextDistance = Math.abs(element.offsetLeft - scrollLeft);
    if (nextDistance < distance) {
      nearest = index;
      distance = nextDistance;
    }
  });

  return nearest;
}

export function useHorizontalDragScroll(
  ref: RefObject<HTMLElement | null>,
  { onIndexChange }: UseHorizontalDragScrollOptions = {},
) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let dragging = false;
    let startX = 0;
    let scrollStart = 0;
    let activePointer: number | null = null;

    const snapToNearest = (behavior: ScrollBehavior = "smooth") => {
      const index = nearestIndex(element);
      const child = element.children[index] as HTMLElement | undefined;
      if (!child) return;

      element.scrollTo({ left: child.offsetLeft, behavior });
      onIndexChange?.(index);
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return;

      dragging = true;
      activePointer = event.pointerId;
      startX = event.clientX;
      scrollStart = element.scrollLeft;
      element.setPointerCapture(event.pointerId);
      element.classList.add("is-dragging");
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!dragging || activePointer !== event.pointerId) return;

      element.scrollLeft = scrollStart - (event.clientX - startX);
    };

    const endDrag = (event: PointerEvent) => {
      if (!dragging || activePointer !== event.pointerId) return;

      dragging = false;
      activePointer = null;
      element.releasePointerCapture(event.pointerId);
      element.classList.remove("is-dragging");
      snapToNearest();
    };

    element.addEventListener("pointerdown", onPointerDown);
    element.addEventListener("pointermove", onPointerMove);
    element.addEventListener("pointerup", endDrag);
    element.addEventListener("pointercancel", endDrag);

    return () => {
      element.removeEventListener("pointerdown", onPointerDown);
      element.removeEventListener("pointermove", onPointerMove);
      element.removeEventListener("pointerup", endDrag);
      element.removeEventListener("pointercancel", endDrag);
      element.classList.remove("is-dragging");
    };
  }, [onIndexChange, ref]);
}
