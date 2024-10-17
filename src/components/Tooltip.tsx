import React from 'react';
import { TooltipProps } from '../types/.types';

function Tooltip({ text, children }: TooltipProps) {
  return (
    <div className="relative inline-block group">
      {children}
      <span className="absolute w-3/4 left-1/2 transform -translate-x-1/2 -translate-y-3/4 mt-2 p-2 bg-gray-700 text-white text-sm rounded opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
        {text}
      </span>
    </div>
  );
}

export default Tooltip;
