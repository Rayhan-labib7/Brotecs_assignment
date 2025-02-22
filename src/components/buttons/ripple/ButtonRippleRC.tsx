import { useState, useEffect } from "react";
import { useTheme } from "../../../ContextProvider/ThemeContext";

const ButtonRippleRC = ({ children, onClick, className }: any) => {
  const { isDarkMode } = useTheme(); // Access the current theme state
  const [coords, setCoords] = useState({ x: -1, y: -1 });
  const [isRippling, setIsRippling] = useState(false);

  useEffect(() => {
    if (coords.x !== -1 && coords.y !== -1) {
      setIsRippling(true);
      setTimeout(() => setIsRippling(false), 300);
    } else setIsRippling(false);
  }, [coords]);

  useEffect(() => {
    if (!isRippling) setCoords({ x: -1, y: -1 });
  }, [isRippling]);

  return (
    <button
      className={`relative overflow-hidden px-4 py-2 rounded-md transition-all duration-300 
        ${isDarkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"} 
        ${className}`}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = (e.target as HTMLButtonElement).getBoundingClientRect();
        setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        if (onClick) {
          onClick(e);
        }
      }}
    >
      {isRippling && (
        <span
          className={`absolute w-0 h-0 rounded-full bg-white/50 animate-ripple
            ${isDarkMode ? "bg-white/20" : "bg-black/20"}`}
          style={{
            left: coords.x,
            top: coords.y,
          }}
        />
      )}
      {children}
    </button>
  );
};

export default ButtonRippleRC;
