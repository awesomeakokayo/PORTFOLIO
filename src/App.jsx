import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import PortfolioSiteClean from './PortfolioSiteClean.jsx';
import FramerMotionLayer from './FramerMotionLayer.jsx';
import LeadFunnel from './LeadFunnel.jsx';
import WhatsAppCTA from './WhatsAppCTA.jsx';
import BackToTop from './BackToTop.jsx';

function App() {
  return (
    <>
      <FramerMotionLayer />
      <PortfolioSiteClean />
      <LeadFunnel />
      <WhatsAppCTA />
      <BackToTop />
      <Analytics />
      <SpeedInsights />
    </>
  );
}

export default App;
