import React, { useEffect } from 'react';
import PortfolioSiteClean from './PortfolioSiteClean.jsx';

const CONTACT_EMAIL = 'awesomeakokayo@gmail.com';

function App() {
  useEffect(() => {
    const contactLinks = document.querySelectorAll('a[href="#contact"]');

    const handleContact = (event) => {
      event.preventDefault();
      window.location.href = `mailto:${CONTACT_EMAIL}`;
    };

    contactLinks.forEach((link) => link.addEventListener('click', handleContact));

    return () => {
      contactLinks.forEach((link) => link.removeEventListener('click', handleContact));
    };
  });

  return <PortfolioSiteClean />;
}

export default App;
