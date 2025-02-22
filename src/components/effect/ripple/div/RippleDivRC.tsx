import React, { useEffect, useState } from "react";
import { useTheme } from "../../../../ContextProvider/ThemeContext";

interface RippleDivRCProps {
  children?: React.ReactNode;
  className?: string;
}

const RippleDivRC = ({ children, className }: RippleDivRCProps) => {
  const { isDarkMode } = useTheme(); // Access current theme state
  const [coords, setCoords] = useState({ x: -1, y: -1 });
  const [rippleActive, setRippleActive] = useState(false);

  useEffect(() => {
    if (coords.x !== -1 && coords.y !== -1) setRippleActive(true);
    else setRippleActive(false);
  }, [coords]);

  useEffect(() => {
    if (rippleActive) setTimeout(() => setRippleActive(false), 1000);
    else setCoords({ x: -1, y: -1 });
  }, [rippleActive]);

  return (
    <div
      tabIndex={0}
      className={`relative overflow-hidden rounded-md focus:outline-none transition-colors duration-300 ${
        isDarkMode ? "bg-gray-800 text-white" : ""
      } ${className ?? ""}`}
      onClick={(e) => {
        const rect = (e.target as HTMLElement).getBoundingClientRect();
        setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
    >
      {rippleActive && (
        <span
          className={`absolute block w-0 h-0 rounded-full bg-white/40 animate-ripple ${
            isDarkMode ? "bg-white/20" : "bg-black/20"
          }`}
          style={{
            left: coords.x,
            top: coords.y,
          }}
        />
      )}
      {children}
    </div>
  );
};

export default RippleDivRC;
