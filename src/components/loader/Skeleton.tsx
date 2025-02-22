import React from 'react';

interface SkeletonProps {
  height?: string;
  width?: string;
  rows?: number;
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className = '', rows = 3, height = '1.5rem', width = '100%' }) => {
  return (
    <div className={`animate-pulse ${className}`}>
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className="rounded mb-4 bg-gray-300 dark:bg-gray-700" // Light & Dark mode support
          style={{ height, width }}
        />
      ))}
    </div>
  );
};

export default Skeleton;
