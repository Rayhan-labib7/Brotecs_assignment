import { useState, useEffect } from 'react';

const ButtonRippleRC = ({ children, onClick, className }: any) => {
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
      className={`${className} ripple-div`}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = (e.target as HTMLButtonElement).getBoundingClientRect();
        setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        if (onClick) {
          onClick(e);
        }
      }}
    >
      {isRippling ? (
        <span
          className="bg-white/60 opacity-100 rounded-full ripple-span"
          style={{ left: coords.x, top: coords.y } as React.CSSProperties}
        />
      ) : null}
      {children}
    </button>
  );
};

export default ButtonRippleRC;
