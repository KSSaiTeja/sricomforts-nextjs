"use client";

import { useEffect, type RefObject } from "react";

type UseHorizontalDragScrollOptions = {
  onIndexChange?: (index: number) => void;
  /** Snap to nearest child after drag. Default true. */
  snap?: boolean;
  /** When false, listeners are not attached. Default true. */
  enabled?: boolean;
};

const DRAG_THRESHOLD_PX = 8;

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

/**
 * Desktop/mouse drag for horizontal rails. On touch, native pan-x handles
 * scrolling — we must not capture the pointer or preventDefault, or vertical
 * page scroll gets stolen when a gesture starts on the rail.
 */
export function useHorizontalDragScroll(
  ref: RefObject<HTMLElement | null>,
  { onIndexChange, snap = true, enabled = true }: UseHorizontalDragScrollOptions = {},
) {
  useEffect(() => {
    const element = ref.current;
    if (!element || !enabled) return;

    let tracking = false;
    let dragging = false;
    let startX = 0;
    let startY = 0;
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
      // Touch / pen: let the browser own vertical + horizontal scrolling.
      if (event.pointerType !== "mouse") return;

      tracking = true;
      dragging = false;
      suppressClick = false;
      activePointer = event.pointerId;
      startX = event.clientX;
      startY = event.clientY;
      scrollStart = element.scrollLeft;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!tracking || activePointer !== event.pointerId) return;

      const deltaX = event.clientX - startX;
      const deltaY = event.clientY - startY;

      if (!dragging) {
        if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > DRAG_THRESHOLD_PX) {
          // Vertical intent — abandon so the page can scroll.
          tracking = false;
          activePointer = null;
          return;
        }

        if (Math.abs(deltaX) <= DRAG_THRESHOLD_PX) return;

        dragging = true;
        suppressClick = true;
        element.classList.add("is-dragging");
        try {
          element.setPointerCapture(event.pointerId);
        } catch {
          // Pointer may already be gone.
        }
      }

      event.preventDefault();
      element.scrollLeft = scrollStart - deltaX;
    };

    const endDrag = (event: PointerEvent) => {
      if (!tracking || activePointer !== event.pointerId) return;

      tracking = false;
      activePointer = null;

      try {
        if (element.hasPointerCapture(event.pointerId)) {
          element.releasePointerCapture(event.pointerId);
        }
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
  }, [enabled, onIndexChange, ref, snap]);
}
