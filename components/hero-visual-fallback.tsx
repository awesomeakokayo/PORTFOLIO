export function HeroVisualFallback() {
  return (
    <div className="hero-visual-fallback" aria-hidden="true">
      <svg viewBox="0 0 420 420" fill="none" role="presentation">
        <g stroke="var(--color-foreground)" strokeWidth="1.15">
          <path d="M210 18 370 112 370 300 210 394 50 300 50 112Z" />
          <path d="M210 18 210 394M50 112 370 300M370 112 50 300M50 112 210 210 370 112M50 300 210 210 370 300" />
          <path d="M210 18 128 210 210 394 292 210 210 18Z" />
          <path d="M50 112 128 210 50 300M370 112 292 210 370 300" />
          <circle cx="210" cy="210" r="82" />
        </g>
        <g stroke="var(--color-accent)" strokeWidth="2">
          <path d="M210 18 292 210 210 394 128 210 210 18Z" />
          <circle cx="210" cy="210" r="6" fill="var(--color-accent)" />
        </g>
      </svg>
    </div>
  );
}
