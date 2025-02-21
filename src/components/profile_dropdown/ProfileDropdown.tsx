import { Logout } from 'iconsax-react';
import { useRef } from 'react';
import ProfileImage from './ProfileImage';
import Tooltip from '../tooltip/tooltip';
import { useSignal } from '@preact/signals-react';
import cn from '../../utils/cn';

const ProfileDropdown = ({ image, username }: { image: string; username: string }) => {
  const isOpen = useSignal(false);

  // Ref for the dropdown container and profile image
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const profileImageRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => (isOpen.value = !isOpen.value);

  // const handleLogout = async () => {
  //   try {
  //     const origin = window.location.origin;

  //     localStorage.clear();
  //     sessionStorage.clear();

  //     document.cookie.split(';').forEach((cookie) => {
  //       document.cookie = cookie.replace(/^ +/, '').replace(/=.*/, '=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/');
  //     });

  //     // Trigger the first redirect and from first redirect second redirect will occur
  //     window.location.href = `${oauthConfig.logoutUrl}?redirect=${origin}`;
  //   } catch (error) {
  //     console.error('Logout failed:', error);
  //   }
  // };

  return (
    <>
      <div
        role="button"
        className={cn(isOpen.value ? 'visible' : 'invisible', 'fixed z-40 right-0 top-0 h-full w-full')}
        onClick={() => {
          isOpen.value = false;
        }}
      ></div>
      <div className="relative font-inter">
        {/* Pass the ref to the ProfileImage to prevent closing when clicking on the profile */}
        <ProfileImage
          ref={profileImageRef}
          image={image}
          username={username}
          onClick={toggleDropdown}
          className="mr-0"
        />

        {isOpen.value && (
          <div ref={dropdownRef} className="absolute right-0 mt-2 w-[18rem] bg-white shadow-lg rounded-lg z-50">
            <div className="p-4 text-center flex justify-between items-center">
              <div className="flex">
                <ProfileImage image={image} username={username} className="mr-2" />
                <div className="flex items-start flex-col">
                  <p className="m-0 text-sm font-semibold leading-[1.57] text-nps-black-1">{username}</p>
                  <p className="m-0 text-xs leading-[1.66] font-normal text-nps-black-2">UI/UX Designer</p>
                </div>
              </div>
              <Tooltip content="Logout" placement="bottom">
                <div className="hover:bg-red-300 hover:rounded-md p-2 cursor-pointer" >
                  <Logout color="#dc2626" variant="Bulk" />
                </div>
              </Tooltip>
            </div>
            {/* underline */}
            <hr className="my-2 border-t border-gray-300" />
            <div className="flex cursor-pointer items-center hover:bg-gray-100 hover:rounded-md mx-3 my-4 px-1">
              <Logout color="#5b6b79" variant="Bulk" />
              <button className="w-full text-left text-sm text-gray-600 p-2" >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileDropdown;
