import React from 'react';

export const StatusDot = ({ status }) => {
  const colors = {
    live:     'bg-[#4ADE80]',
    building: 'bg-[#FF6200]',
    built:    'bg-[#444444]',
  };
  
  return (
    <span className="relative flex h-2.5 w-2.5 items-center justify-center">
      {status !== 'built' && (
        <span className={`animate-pulse-glow absolute inline-flex h-full w-full 
                         rounded-full ${colors[status]} opacity-50`} />
      )}
      <span className={`relative inline-flex rounded-full h-2.5 w-2.5 
                       ${colors[status]}`} />
    </span>
  );
};

export default StatusDot;
