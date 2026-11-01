import { HeroSection } from "@/components/hero-section";
import { MarqueeSection } from "@/components/marquee-section";
import { SelectedWork } from "@/components/selected-work";
import { ServicesSection } from "@/components/services-section";
import { NumbersSection } from "@/components/numbers-section";
import { ProcessSection } from "@/components/process-section";
import { ContactSection } from "@/components/contact-section";
import { SiteFooter } from "@/components/site-footer";

export default function HomePage() {
  return (
    <>
      <main id="main-content" className="portfolio-main" tabIndex={-1}>
        <div id="top" aria-hidden="true" />
        <HeroSection />
        <MarqueeSection />
        <SelectedWork />
        <ServicesSection />
        <NumbersSection />
        <ProcessSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
