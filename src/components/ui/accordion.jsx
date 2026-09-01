import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      'rounded-2xl bg-white text-[#141615] transition-all duration-300 shadow-md hover:shadow-xl border border-transparent overflow-hidden mb-4',
      className
    )}
    {...props}
  />
));
AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = React.forwardRef(({ className, children, showArrow = true, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'flex flex-1 items-center justify-between py-5 px-6 sm:px-8 font-bold text-base sm:text-lg lg:text-xl transition-all duration-300 text-right group select-none hover:bg-black/[0.02]',
        className
      )}
      {...props}
    >
      <span className="font-extrabold text-[#141615] tracking-tight">{children}</span>
      {showArrow && (
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-black/20 flex items-center justify-center shrink-0 ml-4 group-hover:border-[#FFB800] group-hover:bg-[#FFB800]/10 transition-all duration-300">
          <ArrowLeft className="h-5 w-5 text-[#141615] transition-transform duration-300 group-data-[state=open]:-rotate-90 group-hover:text-[#D97706]" />
        </div>
      )}
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn('px-6 sm:px-8 pb-6 pt-2 text-[#374151] border-t border-black/5 leading-relaxed', className)}>
      {children}
    </div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
