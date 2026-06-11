import React from 'react';

export const GhostButton = ({ href, children, onClick, type = "button" }) => {
  const classes = "inline-flex items-center justify-center font-display font-medium text-text-secondary border border-border-lit rounded-full px-7 py-3.5 transition-all duration-200 hover:border-accent hover:text-text-primary cursor-pointer";
  
  if (href) {
    const isExternal = href.startsWith('http') || href.startsWith('mailto:');
    return (
      <a
        href={href}
        onClick={onClick}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className={classes}
      >
        {children}
      </a>
    );
  }
  
  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
};

export default GhostButton;
