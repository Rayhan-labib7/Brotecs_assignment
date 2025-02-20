import { useSignal } from '@preact/signals-react';
import React from 'react';
import cn from '../../utils/cn';

interface TooltipProps {
  content: string;
  placement?: 'top' | 'right' | 'bottom' | 'left';
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ content, placement = 'top', children }) => {
  const visible = useSignal(false);

  const showTooltip = () => (visible.value = true);
  const hideTooltip = () => (visible.value = false);

  const getTooltipPosition = () => {
    const positions = {
      top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
      right: 'top-1/2 left-full transform -translate-y-1/2 ml-2',
      bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
      left: 'top-1/2 right-full transform -translate-y-1/2 mr-2',
    };

    return positions[placement];
  };

  return (
    <div className="relative inline-block font-inter" onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
      {children}
      {visible.value && (
        <div
          className={cn(
            `absolute z-10 px-2 py-1 text-sm font-medium text-white  rounded-lg shadow-sm dark:bg-gray-700 bg-[#5b6b79] ${getTooltipPosition()}`
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
