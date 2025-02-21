// import React, { useEffect } from 'react';
// import { NavLink, useLocation } from 'react-router-dom';
// import RippleDivRC from '../effect/ripple/div/RippleDivRC';
// import { ArrowUp2 } from 'iconsax-react';
// import { Signal, useSignal } from '@preact/signals-react';
// import cn from '../../utils/cn';
// import { Tooltip } from 'react-tooltip';

// const navCss = `relative flex flex-row items-center font-medium focus:outline-none hover:no-underline rounded-md`;

// const navLinkClasses = ({ isActive }: any) =>
//   cn(isActive ? 'bg-indigo-50 text-[#4680FF]' : 'text-[#5B6B69] hover:bg-gray-200 hover:text-[#5B6B69]', navCss);

// const NavLinkItem = ({
//   name,
//   icon,
//   route,
//   isExpanded,
//   isChildren,
// }: {
//   name: string;
//   icon: any;
//   route: string;
//   isExpanded: Signal<boolean> | undefined;
//   isChildren: boolean;
// }) => {
//   const handleClick = () => {
//     document.title = name;
//   };

//   return (
//     <NavLink
//       className={({ isActive }) => cn(navLinkClasses({ isActive }), isChildren && 'ml-[.9rem]  bg-[#f8f9fa]')}
//       to={route}
//       onClick={handleClick}
//     >
//       <RippleDivRC
//         className={cn('w-full h-10 flex items-center rounded-md', isExpanded?.value ? '' : 'justify-center')}
//       >
//         <span className={cn('inline-flex justify-center items-center', isExpanded?.value && 'ml-4')}>{icon}</span>
//         {isChildren && <span className="text-lg leading-none">•</span>}
//         {isExpanded?.value && <span className="ml-2 text-sm tracking-wide truncate">{name}</span>}
//       </RippleDivRC>
//     </NavLink>
//   );
// };

// const DropdownButton = ({
//   name,
//   icon,
//   toggleDropdown,
//   isExpanded,
//   children,
// }: {
//   name: string;
//   icon: React.ReactNode;
//   toggleDropdown: (state: boolean) => void;
//   route: string;
//   isExpanded: Signal<boolean> | undefined;
//   children: React.ReactNode;
// }) => {
//   const isDropdownOpen = useSignal<boolean>(false);
//   const location = useLocation();

//   const isAnyChildActive = React.Children.toArray(children).some((child: any) => {
//     return child.props.route === location.pathname;
//   });

//   const handleClick = () => {
//     isDropdownOpen.value = !isDropdownOpen.value;
//   };
//   useEffect(() => {
//     toggleDropdown(isDropdownOpen.value);
//   }, [isDropdownOpen.value, toggleDropdown]);
//   console.log('check expaned ', isExpanded?.value);
//   return (
//     <div className="relative" onClick={handleClick}>
//       <a data-tooltip-id="my-tooltip" data-tooltip-content="Hello world tool tip check!">
//         ◕‿‿◕
//       </a>
//       <Tooltip id="my-tooltip" place="right" />
//     </div>
//   );
// };

// //   useEffect(() => {
// //     toggleDropdown(isDropdownOpen.value);
// //   }, [isDropdownOpen.value, toggleDropdown]);
// //   console.log('check expaned ', isExpanded?.value);
// //   return (
// //     <div className="relative" onClick={handleClick}>
// //       <button
// //         type="button"
// //         className={cn('w-full flex items-center h-10', navLinkClasses({ isActive: isAnyChildActive }))}
// //       >
// //         <RippleDivRC
// //           className={cn(
// //             'w-full h-10 flex items-center rounded-md',
// //             isExpanded?.value ? 'justify-between' : 'justify-center'
// //           )}
// //         >
// //           <div className="flex">
// //             <span className={cn('inline-flex justify-center items-center', isExpanded?.value && 'ml-4')}>
// //               {name === 'Lead' && !isExpanded?.value && (
// //                 <>
// //                   <div id="clickable">{icon}</div>

// //                   <Tooltip
// //                     anchorSelect="#clickable"
// //                     data-tooltip-place="right"
// //                     clickable
// //                     style={{ backgroundColor: 'red' }}
// //                   >
// //                     <div className="p-10 bg-green-800 border-2">hfdgh</div>
// //                     <div className="p-10 bg-green-400 border-2">fgh</div>
// //                   </Tooltip>

// //                   {/* <Tooltip
// //         content={
// //         //   <span  className="text-lg font-medium text-gray-700 px-4 py-2 bg-purple-500 cursor-pointer">
// //         //   Hover me
// //         // </span>
// //         icon
// //         }
// //         variant="light"
// //         size="sm"
// //         borderRadius="md"
// //         placement="right"
// //       >

// //         <div className="flex flex-col gap-2 ">
// //           <div>Hello</div>
// //           <div>Hi</div>
// //            <div>tooltip</div>

// //           </div>

// //       </Tooltip> */}
// //                 </>
// //               )}

// //               {isExpanded?.value && icon}
// //             </span>
// //             {isExpanded?.value && <span className="ml-2 text-sm tracking-wide truncate">{name}</span>}
// //           </div>
// //           {isExpanded?.value && (
// //             <ArrowUp2
// //               className={cn('transition-transform transform w-4 m-4', isDropdownOpen.value ? 'rotate-0' : 'rotate-180')}
// //             />
// //           )}
// //         </RippleDivRC>
// //       </button>
// //     </div>
// //   );
// // };

// const RNavItemRC = ({
//   name,
//   icon,
//   route,
//   isChildren = false,
//   children,
//   isExpanded,
// }: {
//   name: string;
//   icon: React.ReactNode;
//   route: string;
//   isChildren?: boolean;
//   children?: React.ReactNode;
//   isExpanded?: Signal<boolean>;
//   isActive: boolean;
// }) => {
//   const isDropdownOpen = useSignal<boolean>(false);
//   console.log('icon ', icon);
//   return (
//     <ul className="mx-1 py-1">
//       {isChildren ? (
//         <DropdownButton
//           name={name}
//           icon={icon}
//           toggleDropdown={(state) => (isDropdownOpen.value = state)}
//           route={route}
//           isExpanded={isExpanded}
//           children={children}
//         />
//       ) : (
//         <li>
//           <NavLinkItem name={name} icon={icon} route={route} isExpanded={isExpanded} isChildren={isChildren} />
//         </li>
//       )}
//       {isExpanded?.value &&
//         isDropdownOpen.value &&
//         React.Children.map(children, (child: any) => (
//           <NavLinkItem
//             key={child.props.name}
//             name={child.props.name}
//             icon={child.props.icon}
//             route={child.props.route}
//             isExpanded={isExpanded}
//             isChildren={isChildren}
//           />
//         ))}
//     </ul>
//   );
// };

// export default RNavItemRC;
