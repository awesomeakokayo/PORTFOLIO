import LiquidMetalHero from './ui/liquid-metal-hero';

export default function HeroSection() {
  return (
    <div className="relative">
      <LiquidMetalHero
        badge="Available for new projects"
        title="Software Built to Convert."
        subtitle="I build websites and applications that turn visitors into paying clients — designed with precision, shipped with care."
        primaryCtaLabel="Book a Free Strategy Call"
        secondaryCtaLabel="View My Work"
        onPrimaryCtaClick={() => window.location.href = '/contact'}
        onSecondaryCtaClick={() => window.location.href = '/work'}
        features={["11+ projects shipped", "100% client satisfaction", "48hr response guarantee"]}
      />
    </div>
  );
}
