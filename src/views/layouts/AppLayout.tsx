import ProfileDropdown from "../../components/profile_dropdown/ProfileDropdown";
import Tooltip from "../../components/tooltip/tooltip";
import svgIcons from "../../service/svgService";
import Button from '../../components/buttons/ButtonRC';
import { Signal, useSignal } from "@preact/signals-react";
import logo from '/assets/logo.png'
import cn from "../../utils/cn";
import RippleDivRC from "../../components/effect/ripple/div/RippleDivRC";
import { Box, CloudLightning, HomeTrendUp, Maximize1, Profile2User, ProfileAdd, SearchNormal1, Setting2, Sun1, UserOctagon } from "iconsax-react";
import RNavItemRC from "../../components/sidebar/NavItemRC";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Placeholder from "../../components/ui/Placeholder";



const navItems = [
  { name: 'Dashboard', icon: HomeTrendUp, href: '/home' },
  { name: 'Home', icon: Box, href: '/home' },
  { name: 'Leads', icon: ProfileAdd, href: '/lead' },
  { name: 'Opportunaties', icon: CloudLightning, href: '/opportunity' },
  { name: 'Contact', icon: Profile2User, href: '/contact' },
  { name: 'Product', icon: Profile2User, href: '/product' },
  // {
  //   name: 'Lead',
  //   icon: ProfileAdd,
  //   child: [
  //     { name: 'Leads', href: '/lead' },
  //     // { name: 'Create Leads', href: '/create-lead' },
  //     { name: 'View Leads', href: '/view-lead' },
  //     { name: 'Empty', href: '/empty' },
  //   ],
  // },
  // {
  //   name: 'Opportunaties',
  //   icon: CloudLightning,
  //   child: [
  //     { name: 'Opportunity', href: '/opportunity' },
  //     { name: 'Create Opportunity', href: '/create-opportunity' },
  //     { name: 'View Opportunity', href: '/view-opportunity' },
  //   ],
  // },
  // { name: 'Customer', icon: CloudLightning, href: '/customer' },
  {
    name: 'Users & permissions',
    icon: UserOctagon,
    child: [
      { name: 'Users', href: '/users' },
      { name: 'Roles & Permission', href: '/roles-permission' },
      { name: 'Resource & Permission', href: '/resource-permission' },
    ],
  },
  {
    name: 'Test',
    icon: Profile2User,
    child: [
      { name: 'Empty', href: '/empty' },
      { name: 'FormTest', href: '/test-form' },
    ],
  },
  {
    name: 'Test2',
    icon: Profile2User,
    child: [
      { name: 'Create Product', href: '/product-create' },
      { name: 'FormTest', href: '/test-form' },
    ],
  },
];

const navWidth: any = {
  true: 'block w-64',
  false: 'w-0 md:w-20',
};

const Sidebar = ({ isExpanded }: { isExpanded: Signal<boolean> }) => (
  <div
    className={cn(
      'fixed overflow-hidden inset-y-0 md:left-0 h-screen z-30 flex flex-col bg-brotecs-gray duration-500 ease-in-out',
      navWidth[String(isExpanded)]
    )}
  >
    <div className="flex h-[10%] items-center justify-between px-4 py-8">
      <img src={logo} alt="Logo" className="h-full object-contain" />
    </div>

    {/* Add this wrapper for scrollable nav */}
    <nav className=" h-[80%] space-y-1 p-2 md:overflow-y-atuto hover:overflow-y-auto overflow-x-hidden scrollbar  ">
      {navItems.map((item) => (
        <RNavItemRC
          key={item.name}
          name={item.name}
          route={item.href ?? ''}
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
    <div
      className={cn('border-t ml-2 p-4 h-[10%] text-brotecs-black-2 cursor-pointer items-center gap-2 flex', {
        'justify-center ml-0': !isExpanded.value,
      })}
    >
      <Setting2 />
      {isExpanded.value && <div className="text-sm">Settings</div>}
    </div>
  </div>
);


const ToggleButton = ({ onClickHandler }: { onClickHandler: React.MouseEventHandler<HTMLButtonElement> }) => (
  <Button type="button" onClick={onClickHandler} size="sm" className="pl-0 " >
    <RippleDivRC className="flex items-center w-10 h-10 bg-brotecs-black-4  justify-center rounded-md text-gray-700">
      <span dangerouslySetInnerHTML={{ __html: svgIcons.toggle }} />
    </RippleDivRC>
  </Button >
);

const AppLayout = () => {
  const isExpanded = useSignal<boolean>(true);
  const isFullScreen = useSignal(false);
  const isDarkMode = useSignal(false);
  const username = useSignal<string>('');
  console.log("isexpan check ", isExpanded.value);
  const toggleDarkMode = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };
  
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
      {/* Header */}
      <header
        className={cn(
          `fixed top-0 left-0 right-0 z-20 flex items-center justify-between bg-[brotecs-white]  px-[2.7rem] py-[1rem] transition-all duration-500 ease-in-out`,
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
              className="bg-brotecs-white pl-8 pr-4 py-2 w-72 border-brotecs-default  border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:font-light placeholder:text-brotecs-default placeholder:text-sm placeholder:leading-5"
            />
            <SearchNormal1 className="absolute left-2 top-3 text-gray-400 w-4 h-4" />
          </div>
        </div>
        {/* Header Icons */}
        <div className="flex items-center space-x-6">
          <Tooltip content={isDarkMode.value ? 'Go Light' : 'Go Dark'} placement="bottom">
            <Sun1 size="24" className="text-gray-600 cursor-pointer" onClick={toggleDarkMode} />
          </Tooltip>

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


