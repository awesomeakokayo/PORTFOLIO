import React from 'react';
import Nav from './components/layout/Nav';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import ProofStrip from './components/sections/ProofStrip';
import About from './components/sections/About';
import Stack from './components/sections/Stack';
import Ventures from './components/sections/Ventures';
import InvestorSignal from './components/sections/InvestorSignal';
import Credibility from './components/sections/Credibility';
import CurrentlyBuilding from './components/sections/CurrentlyBuilding';
import Contact from './components/sections/Contact';

function App() {
  return (
    <div id="top" className="bg-base text-text-primary min-h-screen selection:bg-accent selection:text-white font-body">
      {/* Sticky Header Navigation */}
      <Nav />

      {/* Main Content Sections */}
      <main>
        <Hero />
        <ProofStrip />
        <About />
        <Stack />
        <Ventures />
        <InvestorSignal />
        <Credibility />
        <CurrentlyBuilding />
        <Contact />
      </main>

      {/* Minimal Footer */}
      <Footer />
    </div>
  );
}

export default App;
