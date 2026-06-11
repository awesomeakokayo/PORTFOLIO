import React from 'react';

export const TechBadge = ({ label }) => (
  <span className="font-mono text-[12px] text-text-secondary bg-surface 
                   border border-border px-3 py-1.5 rounded-md 
                   whitespace-nowrap">
    {label}
  </span>
);

export default TechBadge;
