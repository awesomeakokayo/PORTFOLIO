import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ProblemSection from '../components/ProblemSection';
import ServicesSection from '../components/ServicesSection';
import ProcessSection from '../components/ProcessSection';
import StatsSection from '../components/StatsSection';
import PortfolioSection from '../components/PortfolioSection';
import TestimonialsSection from '../components/TestimonialsSection';
import AboutSection from '../components/AboutSection';
import FAQSection from '../components/FAQSection';
import FinalCTASection from '../components/FinalCTASection';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        {/* Section 1: Hero */}
        <HeroSection />

        {/* Section 2: Problem/Empathy */}
        <ProblemSection />

        {/* Section 3: Services */}
        <ServicesSection />

        {/* Section 4: Process */}
        <ProcessSection />

        {/* Section 5: Stats */}
        <StatsSection />

        {/* Section 6: Portfolio Preview */}
        <PortfolioSection />

        {/* Section 7: Testimonials */}
        <TestimonialsSection />

        {/* Section 8: About */}
        <AboutSection />

        {/* Section 9: FAQ */}
        <FAQSection />

        {/* Section 10: Final CTA */}
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
