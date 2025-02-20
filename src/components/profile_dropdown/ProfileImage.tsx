import { ForwardedRef, forwardRef } from 'react';
import cn from '../../utils/cn';

const ProfileImage = (
  {
    image,
    username,
    onClick,
    className,
  }: {
    image: string;
    username: string;
    className: string;
    onClick?: () => void;
  },
  ref: ForwardedRef<HTMLDivElement>
) => (
  <div ref={ref} className={cn(`w-9 h-9 rounded-full cursor-pointer ${className}`)} onClick={onClick}>
    <img src={image} alt={username} className="w-full h-full rounded-full object-cover" />
  </div>
);

// Forward the ref to the ProfileImage component
export default forwardRef(ProfileImage);
