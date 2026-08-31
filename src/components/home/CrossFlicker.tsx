/** Static corner mark — never GSAP. Per-logo timelines were melting the CPU. */
export function CrossFlicker() {
  return (
    <div className="cross-flicker__wrapper" aria-hidden>
      <div className="vertical" />
      <div className="horizontal" />
    </div>
  );
}
