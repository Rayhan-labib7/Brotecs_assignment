import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import cn from '../../../utils/cn';

const tooltipVariants = cva(
  'px-4 py-2 text-sm shadow-md transition-all', // Base styles
  {
    variants: {
      variant: {
        default: 'bg-black text-white',
        light: 'bg-white text-black border border-gray-300',
        destructive: 'bg-red-500 text-white',
      },
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
      borderRadius: {
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      borderRadius: 'md',
    },
  }
);

export interface TooltipProps extends React.PropsWithChildren, VariantProps<typeof tooltipVariants> {
  content: React.ReactNode;
  asChild?: boolean;
  placement?: 'top' | 'right' | 'bottom' | 'left';
  className?: string; // Added className prop
  maxHeight?: string;
  trigger?: 'hover' | 'click';
}

const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      content,
      className,
      maxHeight = '100vh',
      trigger = 'hover',
      variant,
      size,
      borderRadius,
      asChild = false,
      placement = 'top',
      children,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const Comp = asChild ? Slot : 'div';
    return (
      <TooltipPrimitive.Provider>
        <TooltipPrimitive.Root
          open={trigger === 'click' ? open : undefined}
          onOpenChange={(isOpen) => trigger === 'hover' && setOpen(isOpen)}
        >
          <TooltipPrimitive.Trigger onClick={trigger === 'click' ? () => setOpen((prev) => !prev) : undefined} asChild>
            <Comp ref={ref} {...props}>
              {content}
            </Comp>
          </TooltipPrimitive.Trigger>

          <TooltipPrimitive.Content
            side={placement}
            align="start"
            sideOffset={8}
            style={{ '--tooltip-max-height': maxHeight } as React.CSSProperties}
            className={cn(
              tooltipVariants({ variant, size, borderRadius, className }),
              'z-50 overflow-y-auto',
              'border-none',
              'max-h-[var(--tooltip-max-height)]'
            )}
          >
            {children}
            <TooltipPrimitive.Arrow className="fill-current text-[#FFFFFF]" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Root>
      </TooltipPrimitive.Provider>
    );
  }
);

Tooltip.displayName = 'Tooltip';

export { Tooltip, tooltipVariants };
