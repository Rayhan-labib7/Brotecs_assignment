import ProfileDropdown from "../../components/profile_dropdown/ProfileDropdown";
import Tooltip from "../../components/tooltip/tooltip";
import svgIcons from "../../service/svgService";
import Button from '../../components/buttons/ButtonRC';
import { Signal,useSignal } from "@preact/signals-react";

import cn from "../../utils/cn";
import RippleDivRC from "../../components/effect/ripple/div/RippleDivRC";

const ToggleButton = ({ onClickHandler }: { onClickHandler: React.MouseEventHandler<HTMLButtonElement> }) => (
  <Button type="button" onClick={onClickHandler} size="sm" className="pl-0">
    <RippleDivRC className="flex items-center w-10 h-10 bg-nps-black-4  justify-center rounded-md text-gray-700">
      <span dangerouslySetInnerHTML={{ __html: svgIcons.toggle }} />
    </RippleDivRC>
  </Button>
);
  
const AppLayout = () => {
    const isExpanded = useSignal<boolean>(true);
    const isFullScreen = useSignal(false);
    const username = useSignal<string>('');
   
    const handleFullScreenToggle = () => {
      if (!isFullScreen.value) {
        document.documentElement.requestFullscreen?.();
      } else {
        document.exitFullscreen?.();
      }
      isFullScreen.value = !isFullScreen.value;
    };
    return (
      <div className="flex bg-gray-100 font-inter">
      <header
      className={cn(
        `fixed top-0 left-0 right-0 z-20 flex items-center justify-between bg-nps-white  px-[2.7rem] py-[1rem] transition-all duration-500 ease-in-out`,
        isExpanded.value ? 'ml-64' : 'ml-20',
        'max-md:ml-0'
      )}
    >
      <div className="flex items-center space-x-4">
        {/* Toggle Button */}
        <ToggleButton onClickHandler={() => (isExpanded.value = !isExpanded.value)} />
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="bg-nps-white pl-8 pr-4 py-2 w-72 border-nps-default  border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:font-light placeholder:text-nps-default placeholder:text-sm placeholder:leading-5"
          />
          <SearchNormal1 className="absolute left-2 top-3 text-gray-400 w-4 h-4" />
        </div>
      </div>
      {/* Header Icons */}
      <div className="flex items-center space-x-6">
        <Tooltip content="Notifications" placement="bottom">
          <span
            dangerouslySetInnerHTML={{ __html: svgIcons.notification }}
            className="text-gray-600 cursor-pointer"
          />
        </Tooltip>
        <Tooltip content="Language" placement="bottom">
          <span dangerouslySetInnerHTML={{ __html: svgIcons.language }} className="text-gray-600 cursor-pointer" />{' '}
        </Tooltip>
        <Tooltip content={isFullScreen.value ? 'Exit' : 'Fullscreen'} placement="bottom">
          <div onClick={handleFullScreenToggle}>
            {isFullScreen.value ? (
              <span
                dangerouslySetInnerHTML={{ __html: svgIcons.fullscreen }}
                className="text-gray-600 cursor-pointer"
              />
            ) : (
              <Maximize1 className="text-gray-600 w-8 h-7 cursor-pointer" variant="Bulk" />
            )}
          </div>
        </Tooltip>
        {/* <ProfileDropdown image={userImage} username="JWT User" /> */}
        <ProfileDropdown image="assets/images/user.jpg" username={username.value} />
      </div>
    </header>
    </div>
    );

};
export default AppLayout;


