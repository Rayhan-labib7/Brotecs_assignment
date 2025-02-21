import React, { forwardRef } from 'react';
import cn from '../../utils/cn';
import svgIcons from '../../service/svgService';

export const InputField = forwardRef<
  HTMLInputElement,
  {
    label?: string;
    type: any;
    name: string;
    value?: any;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    icon?: React.ElementType;
    iconClick?: () => void;
    labelClassName?: string;
    inputClassName?: string;
    parentClassName?: string;
    chat?: boolean;
  }
>(
  (
    {
      label,
      type,
      name,
      value,
      onChange,
      onKeyDown,
      placeholder,
      disabled,
      required,
      icon: Icon,
      iconClick,
      labelClassName,
      inputClassName,
      parentClassName,
      chat,
    },
    ref
  ) => {
    return (
      <div className={cn('relative w-full mt-4 mb-4 font-inter', parentClassName)}>
        {/* Label for the input field */}
        <div>
          <label
            className={cn('text-base font-normal leading-5 tracking-wider text-nps-black-1/80', labelClassName)}
            htmlFor={name}
          >
            {label}
          </label>
        </div>
        {/* Input field */}
        <input
          ref={ref}
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          onKeyDown={onKeyDown}
          autoComplete="off"
          disabled={disabled}
          className={cn(
            'w-full px-3 py-4 border text-nps-black text-sm font-normal border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 placeholder:text-sm placeholder:text-nps-black-1/40',
            inputClassName,
            { 'opacity-50': disabled }
          )}
        />
        {/* Icon component with click handler */}
        {Icon && (
          <span
            onClick={iconClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                iconClick?.();
              }
            }}
            aria-label="Toggle visibility"
            className="absolute right-4 top-[55%] text-gray-500 cursor-pointer transform transition-transform duration-200 hover:scale-110 hover:text-blue-500"
          >
            <Icon />
          </span>
        )}
        {chat && (
          <span
            onClick={iconClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === '') {
                iconClick?.();
              }
            }}
            className="absolute -right-2 top-[5%] text-gray-500 cursor-pointer transform transition-transform duration-200 hover:scale-110 hover:text-blue-500"
            dangerouslySetInnerHTML={{ __html: svgIcons.chat }}
          />
        )}
      </div>
    );
  }
);

InputField.displayName = 'InputField'; // Helpful for debugging with React DevTools
export default InputField;
