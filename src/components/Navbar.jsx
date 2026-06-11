import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    setIsMobileMenuOpen(false);

    if (location.pathname !== '/') {
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isHomePage = location.pathname === '/';

  return (
    <>
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md border-b border-[#D2D2D7]'
            : 'bg-white border-b border-[#D2D2D7]'
        }`}
      >
        <div className="max-w-[980px] mx-auto px-[clamp(1.5rem,5vw,4rem)]">
          <div className="flex items-center justify-between h-[68px]">
            {/* Logo / Name */}
            <Link
              to="/"
              className="font-['Fraunces'] text-[17px] font-[600] text-[#1D1D1F]"
            >
              Awesome Akokayo
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link
                to="/"
                className="font-['Manrope'] text-[14px] font-[500] text-[#1D1D1F] hover:text-[#2563EB] transition-colors"
              >
                Home
              </Link>
              <Link
                to="/work"
                className="font-['Manrope'] text-[14px] font-[500] text-[#1D1D1F] hover:text-[#2563EB] transition-colors"
              >
                Work
              </Link>

              {isHomePage ? (
                <button
                  onClick={() => scrollToSection('about')}
                  className="font-['Manrope'] text-[14px] font-[500] text-[#1D1D1F] hover:text-[#2563EB] transition-colors"
                >
                  About
                </button>
              ) : (
                <Link
                  to="/#about"
                  className="font-['Manrope'] text-[14px] font-[500] text-[#1D1D1F] hover:text-[#2563EB] transition-colors"
                >
                  About
                </Link>
              )}

              <Link
                to="/contact"
                className="font-['Manrope'] text-[14px] font-[500] text-[#1D1D1F] hover:text-[#2563EB] transition-colors"
              >
                Contact
              </Link>

              {/* CTA Button */}
              <Link
                to="/contact"
                className="bg-[#2563EB] text-white rounded-full px-5 py-2 text-[14px] font-[600] hover:bg-[#1D4ED8] transition-colors duration-200 font-['Manrope']"
              >
                Let's Talk
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-[#1D1D1F]"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white md:hidden pt-[68px]">
          <div className="flex flex-col items-center justify-start h-full gap-10 pt-20">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-['Fraunces'] text-2xl font-medium text-[#1D1D1F]"
            >
              Home
            </Link>
            <Link
              to="/work"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-['Fraunces'] text-2xl font-medium text-[#1D1D1F]"
            >
              Work
            </Link>

            {isHomePage ? (
              <button
                onClick={() => scrollToSection('about')}
                className="font-['Fraunces'] text-2xl font-medium text-[#1D1D1F]"
              >
                About
              </button>
            ) : (
              <Link
                to="/#about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-['Fraunces'] text-2xl font-medium text-[#1D1D1F]"
              >
                About
              </Link>
            )}

            <Link
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-['Fraunces'] text-2xl font-medium text-[#1D1D1F]"
            >
              Contact
            </Link>

            <Link
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-4 px-8 py-3 font-['Manrope'] font-[600] text-white rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] transition-colors"
            >
              Let's Talk
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
