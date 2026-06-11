import React from 'react';

export const AccentButton = ({ href, children, onClick, type = "button" }) => {
  const classes = "inline-flex items-center justify-center font-display font-semibold text-[15px] text-white bg-accent rounded-full px-7 py-3.5 transition-all duration-200 hover:bg-accent-hover hover:shadow-[0_0_24px_var(--accent-glow)] cursor-pointer";
  
  if (href) {
    return (
      <a href={href} onClick={onClick} className={classes}>
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

export default AccentButton;
