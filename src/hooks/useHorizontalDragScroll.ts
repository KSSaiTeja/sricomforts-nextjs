"use client";

import { useEffect, type RefObject } from "react";

type UseHorizontalDragScrollOptions = {
  onIndexChange?: (index: number) => void;
  /** Snap to nearest child after drag. Default true. */
  snap?: boolean;
};

const DRAG_THRESHOLD_PX = 6;

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
  { onIndexChange, snap = true }: UseHorizontalDragScrollOptions = {},
) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let tracking = false;
    let dragging = false;
    let startX = 0;
    let scrollStart = 0;
    let activePointer: number | null = null;
    let suppressClick = false;

    const snapToNearest = (behavior: ScrollBehavior = "smooth") => {
      const index = nearestIndex(element);
      const child = element.children[index] as HTMLElement | undefined;
      if (!child) return;

      element.scrollTo({ left: child.offsetLeft, behavior });
      onIndexChange?.(index);
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return;

      tracking = true;
      dragging = false;
      suppressClick = false;
      activePointer = event.pointerId;
      startX = event.clientX;
      scrollStart = element.scrollLeft;
      element.setPointerCapture(event.pointerId);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!tracking || activePointer !== event.pointerId) return;

      const deltaX = event.clientX - startX;

      if (!dragging && Math.abs(deltaX) > DRAG_THRESHOLD_PX) {
        dragging = true;
        suppressClick = true;
        element.classList.add("is-dragging");
      }

      if (!dragging) return;

      event.preventDefault();
      element.scrollLeft = scrollStart - deltaX;
    };

    const endDrag = (event: PointerEvent) => {
      if (!tracking || activePointer !== event.pointerId) return;

      tracking = false;
      activePointer = null;

      try {
        element.releasePointerCapture(event.pointerId);
      } catch {
        // Pointer may already be released.
      }

      if (dragging) {
        element.classList.remove("is-dragging");
        if (snap) snapToNearest();
      }

      dragging = false;
    };

    const onClickCapture = (event: MouseEvent) => {
      if (!suppressClick) return;
      event.preventDefault();
      event.stopPropagation();
      suppressClick = false;
    };

    element.addEventListener("pointerdown", onPointerDown);
    element.addEventListener("pointermove", onPointerMove);
    element.addEventListener("pointerup", endDrag);
    element.addEventListener("pointercancel", endDrag);
    element.addEventListener("click", onClickCapture, true);

    return () => {
      element.removeEventListener("pointerdown", onPointerDown);
      element.removeEventListener("pointermove", onPointerMove);
      element.removeEventListener("pointerup", endDrag);
      element.removeEventListener("pointercancel", endDrag);
      element.removeEventListener("click", onClickCapture, true);
      element.classList.remove("is-dragging");
    };
  }, [onIndexChange, ref, snap]);
}
