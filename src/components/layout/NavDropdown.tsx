"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties, type RefObject } from "react";
import { createPortal } from "react-dom";
import type { NavSection } from "@/data/navigation";

type NavDropdownTriggerProps = {
  label: string;
  isOpen: boolean;
  controlsId: string;
};

export function NavDropdownTrigger({ label, isOpen, controlsId }: NavDropdownTriggerProps) {
  return (
    <button
      type="button"
      className={`nav-dropdown-trigger${isOpen ? " is-open" : ""}`}
      aria-expanded={isOpen}
      aria-controls={controlsId}
    >
      {label}{" "}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        className="arrow-icon"
        aria-hidden
      >
        <path
          d="M3 4.5L6 7.5L9 4.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

type NavDropdownPanelProps = {
  sections: NavSection[];
  isOpen: boolean;
  panelId: string;
  anchorRef: RefObject<HTMLElement | null>;
  onClose: () => void;
  onPointerEnter?: () => void;
  onPointerLeave?: () => void;
};

function TabArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="tab-arrow"
      aria-hidden
    >
      <path
        d="M6 12L10 8L6 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LinkArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="link-arrow"
      aria-hidden
    >
      <path
        d="M4.66669 11.3333L11.3334 4.66667M11.3334 4.66667H4.66669M11.3334 4.66667V11.3333"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function NavDropdownPanel({
  sections,
  isOpen,
  panelId,
  anchorRef,
  onClose,
  onPointerEnter,
  onPointerLeave,
}: NavDropdownPanelProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [panelStyle, setPanelStyle] = useState<CSSProperties>({});
  const panelRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(0);
    }
  }, [isOpen, sections]);

  useEffect(() => {
    if (!isOpen || !anchorRef.current) return;

    const updatePosition = () => {
      const anchor = anchorRef.current;
      if (!anchor) return;

      const rect = anchor.getBoundingClientRect();
      // Centered panel — not full viewport width
      const gutter = 24;
      const maxWidth = 56 * 16; // 56rem
      const width = Math.min(maxWidth, window.innerWidth - gutter * 2);
      const left = Math.max(gutter, (window.innerWidth - width) / 2);

      setPanelStyle({
        position: "fixed",
        top: rect.bottom,
        left,
        width,
      });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [anchorRef, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!mounted || !isOpen || sections.length === 0) {
    return null;
  }

  const activeSection = sections[activeTab] ?? sections[0];

  return createPortal(
    <div
      ref={panelRef}
      className="navigation-menu-viewport"
      style={panelStyle}
      onMouseEnter={onPointerEnter}
      onMouseLeave={onPointerLeave}
    >
      <div className="nav-dropdown-content" data-state="open" id={panelId}>
        <div className="dropdown-inner">
          <div className="dropdown-tabs">
            {sections.map((section, index) => (
              <button
                key={section.title}
                type="button"
                className={`dropdown-tab${index === activeTab ? " is-active" : ""}`}
                onClick={() => setActiveTab(index)}
              >
                <span className="tab-label">{section.title}</span>
                <TabArrowIcon />
              </button>
            ))}
          </div>

          <div className="dropdown-content">
            <div className="content-wrapper">
              <div className="content-main">
                <div className="content-text">
                  <h2>{activeSection.title}</h2>
                </div>
                <div className="content-links">
                  {activeSection.links.map((link) => (
                    <Link
                      key={`${link.href}-${link.label}`}
                      href={link.href}
                      className="content-link"
                      onClick={onClose}
                    >
                      <span className="content-link-text">{link.label}</span>
                      <LinkArrowIcon />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
