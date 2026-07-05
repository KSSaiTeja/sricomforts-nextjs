"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { FullLogo } from "@/components/brand/FullLogo";
import { NavDropdownPanel, NavDropdownTrigger } from "@/components/layout/NavDropdown";
import { navigation, siteContact } from "@/data/navigation";

function DrawerChevron({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={className ?? "drawer-chevron"}
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

export function SiteHeader() {
  const innerRef = useRef<HTMLDivElement>(null);
  const closeDropdownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  const cancelCloseDropdown = useCallback(() => {
    if (closeDropdownTimerRef.current) {
      clearTimeout(closeDropdownTimerRef.current);
      closeDropdownTimerRef.current = null;
    }
  }, []);

  const openDropdownMenu = useCallback(
    (label: string) => {
      cancelCloseDropdown();
      setOpenDropdown(label);
    },
    [cancelCloseDropdown],
  );

  const scheduleCloseDropdown = useCallback(() => {
    cancelCloseDropdown();
    closeDropdownTimerRef.current = setTimeout(() => {
      setOpenDropdown(null);
      closeDropdownTimerRef.current = null;
    }, 120);
  }, [cancelCloseDropdown]);

  const closeDropdown = useCallback(() => {
    cancelCloseDropdown();
    setOpenDropdown(null);
  }, [cancelCloseDropdown]);

  useEffect(() => {
    return () => {
      cancelCloseDropdown();
    };
  }, [cancelCloseDropdown]);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    setMobileExpanded(null);
  }, []);

  const toggleMenu = useCallback(() => {
    setMenuOpen((open) => !open);
    setOpenDropdown(null);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [closeMenu, menuOpen]);

  return (
    <>
      <header className="site-header">
        <div className="site-container">
          <div className="site-grid">
            <div className="inner" ref={innerRef}>
              <Link href="/" className="logo-link brand-logo-highlight" aria-label="Go to homepage">
                <FullLogo className="logo" priority />
              </Link>

              <nav className="nav font-nav" aria-label="Primary">
                <ul>
                  {navigation.map((item) =>
                    item.href ? (
                      <li key={item.label}>
                        <Link href={item.href}>{item.label}</Link>
                      </li>
                    ) : (
                      <li
                        key={item.label}
                        onMouseEnter={() => openDropdownMenu(item.label)}
                        onMouseLeave={scheduleCloseDropdown}
                      >
                        <nav className="navigation-menu-root" aria-label="Main">
                          <div className="navigation-menu-anchor">
                            <ul>
                              <li>
                                <NavDropdownTrigger
                                  label={item.label}
                                  isOpen={openDropdown === item.label}
                                  controlsId={`nav-panel-${item.label}`}
                                />
                              </li>
                            </ul>
                          </div>
                        </nav>
                      </li>
                    ),
                  )}
                </ul>
                <ul className="nav-hidden-seo" aria-hidden="true">
                  {navigation.flatMap((item) =>
                    item.sections?.flatMap((section) =>
                      section.links.map((link) => (
                        <li key={`${item.label}-${section.title}-${link.href}-${link.label}`}>
                          <Link href={link.href} tabIndex={-1}>
                            {link.label}
                          </Link>
                        </li>
                      )),
                    ) ?? [],
                  )}
                </ul>
              </nav>

              <div className="header-actions">
                <div className="header-cta">
                  <Link href={siteContact.phoneHref} className="cta-button cta-button--secondary">
                    <span className="link-active">CALL US</span>
                  </Link>
                  <Link href={siteContact.contactHref} className="cta-button cta-button--primary">
                    <span className="link-active">CONTACT</span>
                  </Link>
                </div>
              </div>

              <button
                type="button"
                className={`toggle-mobile-menu-button${menuOpen ? " active" : ""}`}
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
                aria-haspopup="true"
                aria-controls="mobile-menu"
                onClick={toggleMenu}
              >
                <span className="wrapper">
                  <span className="hl --1 t" />
                  <span className="hl --2 t" />
                  <span className="cl --1 t">
                    <span className="cli --g t" />
                    <span className="cli t" />
                  </span>
                  <span className="cl --2 t">
                    <span className="cli --g t" />
                    <span className="cli t" />
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {openDropdown ? (
        <NavDropdownPanel
          anchorRef={innerRef}
          sections={
            navigation.find((item) => item.label === openDropdown && item.sections)?.sections ?? []
          }
          isOpen={Boolean(openDropdown)}
          panelId={`nav-panel-${openDropdown}`}
          onClose={closeDropdown}
          onPointerEnter={cancelCloseDropdown}
          onPointerLeave={scheduleCloseDropdown}
        />
      ) : null}

      <div
        className={`mobile-menu${menuOpen ? " is-open" : ""}`}
        data-lenis-prevent
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          className="mobile-menu-overlay"
          aria-label="Close menu"
          aria-hidden="true"
          onClick={closeMenu}
        />
        <aside className="mobile-menu-panel">
          <div className="mobile-drawer-logo">
            <Link href="/" className="mobile-drawer-logo-link brand-logo-highlight" onClick={closeMenu}>
              <FullLogo className="mobile-drawer-logo-icon" />
            </Link>
          </div>

          <nav id="mobile-menu" className="mobile-menu-drawer" aria-label="Mobile">
            <ul className="mobile-menu-items mobile-menu-items-level-1">
              {navigation.map((item) =>
                item.href ? (
                  <li key={item.label}>
                    <Link href={item.href} className="drawer-link" onClick={closeMenu}>
                      {item.label}
                    </Link>
                  </li>
                ) : (
                  <li key={item.label}>
                    <button
                      type="button"
                      className="drawer-dropdown-title"
                      aria-expanded={mobileExpanded === item.label}
                      onClick={() =>
                        setMobileExpanded((current) =>
                          current === item.label ? null : item.label,
                        )
                      }
                    >
                      <span>{item.label}</span>
                      <DrawerChevron
                        className={`drawer-chevron${mobileExpanded === item.label ? " chevron-up" : ""}`}
                      />
                    </button>

                    {mobileExpanded === item.label && item.sections ? (
                      <div className="drawer-section">
                        {item.sections.map((section) => (
                          <div key={section.title}>
                            <p className="drawer-section-title drawer-section-title--static">
                              {section.title}
                            </p>
                            <ul className="drawer-section-links">
                              {section.links.map((link) => (
                                <li key={`${link.href}-${link.label}`}>
                                  <Link
                                    href={link.href}
                                    className="drawer-sublink"
                                    onClick={closeMenu}
                                  >
                                    {link.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="mobile-menu-contact">
            <Link
              href={siteContact.phoneHref}
              className="drawer-cta-button drawer-cta-button--secondary"
              onClick={closeMenu}
            >
              CALL US
            </Link>
            <Link
              href={siteContact.contactHref}
              className="drawer-cta-button"
              onClick={closeMenu}
            >
              CONTACT
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}
