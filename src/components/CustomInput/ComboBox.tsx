import React, { useRef, useEffect, forwardRef } from 'react';
import cn from '../../utils/cn';
import { ArrowDown2 } from 'iconsax-react';
import { useSignal } from '@preact/signals-react';

interface ComboBoxProps {
  options?: { id: number | string; value: string; email?: string }[];
  placeholder?: string;
  onSelect?: (value: any) => void;
  inputClassName?: string;
  parentClassName?: string;
  labelClassName?: string;
  name?: string;
  label: string;
  dropdownClassName?: string;
  optionClassName?: string;
  disabled?: boolean;
  required?: boolean;
  value?: any;
  border?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  lazyLoading?: boolean;
  onScroll?: (event: React.UIEvent<HTMLDivElement>) => void;
}

const ComboBox = forwardRef<HTMLInputElement, ComboBoxProps>(
  (
    {
      options = [],
      name,
      label,
      placeholder = 'Search...',
      onSelect,
      onScroll,
      inputClassName = '',
      parentClassName = '',
      dropdownClassName = '',
      optionClassName = '',
      labelClassName = '',
      disabled,
      required,
      value,
      border,
      onClick,
    },
    ref
  ) => {
    const searchValue = useSignal('');
    const filteredOptions = useSignal(options);
    const isDropdownOpen = useSignal(false);

    const comboBoxRef = useRef<HTMLDivElement>(null);
    console.log('lazy loading check combobox ', onScroll);

    const handleScrollEvent = (e: any) => {
      console.log('Scroll event in ComboBox triggered');
      if (onScroll) {
        onScroll(e);
      }
    };

    useEffect(() => {
      filteredOptions.value = options;
    }, [options]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      searchValue.value = value;

      // Filter options based on search input
      const filtered = options?.filter((option) => option.value.toLowerCase().includes(value.toLowerCase()));
      filteredOptions.value = filtered;
      isDropdownOpen.value = filtered && filtered.length > 0 ? true : false;
    };

    const handleOptionSelect = (id: number | string, value: string) => {
      searchValue.value = value;

      if (onSelect) {
        onSelect({ id, value });
      }

      isDropdownOpen.value = false;
    };


    useEffect(() => {
      searchValue.value = value || '';
    }, [searchValue, value]);

    // Close dropdown when clicking outside of the ComboBox
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (comboBoxRef.current && !comboBoxRef.current.contains(event.target as Node)) {
          isDropdownOpen.value = false;
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isDropdownOpen]);

    return (
      <div className={cn('relative w-full mt-4 mb-2', parentClassName)} onClick={onClick}>
        {/* Label for the input field */}
        <label
          className={cn('text-sm font-normal leading-5 tracking-wider text-brotecs-black-1/80 dark:text-gray-300', labelClassName)}
          htmlFor={name}
        >
          {label}
        </label>

        <div ref={comboBoxRef}>
          <div className="relative flex items-center">
            <input
              type="text"
              className={cn(
                'p-3 w-full border text-brotecs-black dark:text-white text-sm font-normal border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 dark:focus:border-blue-400 placeholder:text-sm placeholder:text-brotecs-black-1/40 dark:placeholder:text-gray-400 bg-white dark:bg-gray-900',
                inputClassName,
                border,
                { 'opacity-50': disabled }
              )}
              placeholder={placeholder}
              value={searchValue.value}
              onChange={handleInputChange}
              disabled={disabled}
              onFocus={() => (isDropdownOpen.value = true)} // Open dropdown on focus
              required={required}
              ref={ref} // Forwarded ref
            />

            <ArrowDown2
              className="absolute right-3 text-brotecs-black-2/60 dark:text-gray-400 cursor-pointer"
              onClick={() => (isDropdownOpen.value = !isDropdownOpen.value)} // Toggle dropdown visibility
              variant="Bold"
              size="16"
            />
          </div>

          {/* Dropdown */}
          {isDropdownOpen.value && (
            <ul
              className={cn(
                'absolute mt-1 max-h-40 overflow-auto bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded w-full z-10',
                dropdownClassName
              )}
              onScroll={handleScrollEvent}
            >
              {filteredOptions.value && filteredOptions.value.length > 0 ? (
                filteredOptions.value.map((option) => (
                  <li
                    key={option.id}
                    className={cn(
                      `text-brotecs-black dark:text-white text-sm font-normal cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 ${optionClassName}`,
                      {
                        'bg-gray-200 dark:bg-gray-800': searchValue.value === option.value, // Highlight selected
                      }
                    )}
                    onClick={() => handleOptionSelect(option.id, option.value)}
                  >
                    {option.email ? (
                      <div className="flex flex-col">
                        <span className="font-bold text-[16px] text-brotecs-black dark:text-white">{option.value}</span>
                        <span className="text-gray-500 dark:text-gray-400">{option.email}</span>
                      </div>
                    ) : (
                      <span>{option.value}</span>
                    )}
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-gray-500 dark:text-gray-400">No results found</li>
              )}
            </ul>
          )}
        </div>
      </div>


    );
  }
);

ComboBox.displayName = 'ComboBox';

export default ComboBox;
