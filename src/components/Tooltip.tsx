import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { TooltipProps } from '../types/products.types';

function Tooltip({ text, children }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const ref = useRef<HTMLDivElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const handleMouseEnter = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 2,
        left: rect.left + rect.width / 2,
      });
      setIsVisible(true);
    }
  };

  const handleMouseLeave = (event: React.MouseEvent) => {
    const relatedTarget = event.relatedTarget as HTMLElement;
    if (!tooltipRef.current || !tooltipRef.current.contains(relatedTarget)) {
      setIsVisible(false);
    }
  };

  const handleTooltipMouseEnter = () => {
    setIsVisible(true);
  };

  const handleTooltipMouseLeave = () => {
    setIsVisible(false);
  };

  return (
    <>
      <div
        ref={ref}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="inline-block"
      >
        {children}
      </div>

      {isVisible &&
        createPortal(
          <div
            ref={tooltipRef}
            onMouseEnter={handleTooltipMouseEnter}
            onMouseLeave={handleTooltipMouseLeave}
            style={{ top: `${position.top}px`, left: `${position.left}px` }}
            className="absolute z-50 w-80 mt-3 transform -translate-x-1/2 p-2 text-center text-white bg-gray-800 rounded-md shadow-lg"
          >
            {text}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gray-800 rotate-45 -top-1" />
          </div>,
          document.body
        )}
    </>
  );
}

export default Tooltip;
