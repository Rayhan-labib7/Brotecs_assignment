import ProfileDropdown from "../../components/profile_dropdown/ProfileDropdown";
import Tooltip from "../../components/tooltip/tooltip";
import svgIcons from "../../service/svgService";
import Button from '../../components/buttons/ButtonRC';
import { Signal, useSignal } from "@preact/signals-react";
import logo from '/assets/logo.png'
import cn from "../../utils/cn";
import RippleDivRC from "../../components/effect/ripple/div/RippleDivRC";
import { Box,HomeTrendUp, Maximize1, SearchNormal1, Setting2, Sun1, UserOctagon } from "iconsax-react";
import RNavItemRC from "../../components/sidebar/NavItemRC";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Placeholder from "../../components/ui/Placeholder";
import { useTheme } from "../../ContextProvider/ThemeContext";



const navItems = [
  { name: 'Employee Table', icon: HomeTrendUp, href: '/' },
  { name: 'Employee Card', icon: Box, href: '/employee-card' },
  {
    name: 'Test',
    icon: UserOctagon,
    child: [
      { name: 'Users', href: '/users' },
      { name: 'Roles & Permission', href: '/roles-permission' },
      { name: 'Resource & Permission', href: '/resource-permission' },
    ],
  },

];

const navWidth: any = {
  true: 'block w-64',
  false: 'w-0 md:w-20',
};

const Sidebar = ({ isExpanded }: { isExpanded: Signal<boolean> }) => {
  const { isDarkMode } = useTheme(); // Get the theme state

  return (
    <div
      className={cn(
        "fixed overflow-hidden inset-y-0 md:left-0 h-screen z-30 flex flex-col duration-500 ease-in-out",
        isDarkMode ? "bg-gray-800 text-gray-200" : "bg-brotecs-gray text-brotecs-black-2",
        navWidth[String(isExpanded)]
      )}
    >
      <div className="flex h-[10%] items-center justify-between px-4 py-8">
        <img src={logo} alt="Logo" className="h-full object-contain" />
      </div>

      {/* Scrollable Navigation */}
      <nav className="h-[80%] space-y-1 p-2 md:overflow-y-auto hover:overflow-y-auto overflow-x-hidden scrollbar">
        {navItems.map((item) => (
          <RNavItemRC
            key={item.name}
            name={item.name}
            route={item.href ?? ""}
            icon={<item.icon className="h-6 w-6" variant="Bulk" />}
            isChildren={!!item.child}
            isExpanded={isExpanded}
            isActive={window.location.pathname === item.href}
          >
            {item.child?.map((subItem) => (
              <RNavItemRC
                key={subItem.name}
                name={subItem.name}
                route={subItem.href}
                isExpanded={isExpanded}
                isActive={window.location.pathname === subItem.href}
                icon={undefined}
              />
            ))}
          </RNavItemRC>
        ))}
      </nav>

      {/* Settings Section */}
      <div
        className={cn(
          "border-t ml-2 p-4 h-[10%] cursor-pointer items-center gap-2 flex",
          isDarkMode ? "text-gray-300 border-gray-700 hover:bg-gray-800" : "text-brotecs-black-2 border-gray-300 hover:bg-gray-100",
          { "justify-center ml-0": !isExpanded.value }
        )}
      >
        <Setting2 />
        {isExpanded.value && <div className="text-sm">Settings</div>}
      </div>
    </div>
  );
};


// Assuming ThemeContext is in a context folder

const ToggleButton = ({ onClickHandler }: { onClickHandler: React.MouseEventHandler<HTMLButtonElement> }) => {
  const { isDarkMode } = useTheme();

  return (
    <Button type="button" onClick={onClickHandler} size="sm" className="pl-0">
      <RippleDivRC
        className={cn(
          "flex items-center w-10 h-10 justify-center rounded-md",
          isDarkMode ? "bg-gray-800 text-gray-300" : "bg-brotecs-black-4 text-gray-700"
        )}
      >
        <span dangerouslySetInnerHTML={{ __html: svgIcons.toggle }} />
      </RippleDivRC>
    </Button>
  );
};


const AppLayout = () => {
  const isExpanded = useSignal<boolean>(true);
  const isFullScreen = useSignal(false);
  // const [isDarkMode, setIsDarkMode] = useState(false);
  const username = useSignal<string>('');
  console.log("isexpan check ", isExpanded.value);
  const { isDarkMode, toggleDarkMode } = useTheme();

  const handleFullScreenToggle = () => {
    if (!isFullScreen.value) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
    isFullScreen.value = !isFullScreen.value;
  };
  return (
    <div className={`flex bg-gray-100 font-inter ${isDarkMode ? 'bg-gray-900 text-white' : ''}`}>
      {/* Header */}
      <header
        className={cn(
          `fixed top-0 left-0 right-0 z-20 flex items-center justify-between bg-[brotecs-white]  px-[2.7rem] py-[1rem] transition-all duration-500 ease-in-out`,
          isExpanded.value ? 'ml-64' : 'ml-20',
          'max-md:ml-0',
          isDarkMode ? 'bg-gray-900 text-white' : ''
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
              className={cn("bg-brotecs-white pl-8 pr-4 py-2 w-72 border-brotecs-default  border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:font-light placeholder:text-brotecs-default placeholder:text-sm placeholder:leading-5",
                isDarkMode ? "bg-gray-700 text-white border-gray-600 " : "bg-white text-black border-gray-300 placeholder-gray-600"
              )}

            />
            <SearchNormal1 className={cn("absolute left-2 top-3 w-4 h-4", isDarkMode ? "text-gray-300" : "text-gray-400")} />
          </div>
        </div>
        {/* Header Icons */}
        <div className="flex items-center space-x-6">
          <Tooltip content={isDarkMode ? 'Go Light' : 'Go Dark'} placement="bottom">
            <Sun1 size="24" className={cn("cursor-pointer", isDarkMode ? "text-yellow-400" : "text-gray-600")} onClick={toggleDarkMode} />
          </Tooltip>

          <Tooltip content="Notifications" placement="bottom">
            <span dangerouslySetInnerHTML={{ __html: svgIcons.notification }} className={cn("cursor-pointer", isDarkMode ? "text-gray-300" : "text-gray-600")} />
          </Tooltip>

          <Tooltip content="Language" placement="bottom">
            <span dangerouslySetInnerHTML={{ __html: svgIcons.language }} className={cn("cursor-pointer", isDarkMode ? "text-gray-300" : "text-gray-600")} />
          </Tooltip>
          <Tooltip content={isFullScreen.value ? 'Exit' : 'Fullscreen'} placement="bottom">
            <div onClick={handleFullScreenToggle}>
              {isFullScreen.value ? (
                <span dangerouslySetInnerHTML={{ __html: svgIcons.fullscreen }} className={cn("cursor-pointer", isDarkMode ? "text-gray-300" : "text-gray-600")} />
              ) : (
                <Maximize1 className={cn("w-8 h-7 cursor-pointer", isDarkMode ? "text-gray-300" : "text-gray-600")} variant="Bulk" />
              )}
            </div>
          </Tooltip>
          {/* <ProfileDropdown image={userImage} username="JWT User" /> */}
          <ProfileDropdown image="assets/images/user.jpg" username={username.value} />
        </div>
      </header>

      {/* Sidebar */}
      <Sidebar isExpanded={isExpanded} />

      {/* Overlay for Mobile */}
      <div
        role="button"
        className={cn('fixed z-30 bg-black/20 w-full h-full md:hidden ', isExpanded.value ? 'block ml-64' : 'hidden')}
        onClick={() => {
          isExpanded.value = !isExpanded.value;
        }}
      ></div>

      {/* Main Content */}
      <main
        className={cn(
          'flex-1 transition-all duration-500 ease-in-out p-6 pt-20 relative min-h-screen w-full overflow-hidden ',
          isExpanded.value ? 'ml-64' : 'ml-20',
          'max-md:ml-0'
        )}
      >
        <Suspense fallback={<Placeholder />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );

};
export default AppLayout;


