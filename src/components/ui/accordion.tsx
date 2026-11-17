"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItemContextValue {
  isOpen: boolean;
  toggle: () => void;
}

const AccordionItemContext = React.createContext<AccordionItemContextValue>({
  isOpen: false,
  toggle: () => {},
});

export function Accordion({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("space-y-3", className)}>{children}</div>;
}

export function AccordionItem({
  children,
  className,
  defaultOpen = false,
}: {
  children: React.ReactNode;
  className?: string;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <AccordionItemContext.Provider
      value={{ isOpen, toggle: () => setIsOpen((prev) => !prev) }}
    >
      <div
        className={cn(
          "rounded-xl border border-border bg-card transition-all shadow-xs",
          isOpen && "ring-1 ring-primary/20",
          className
        )}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

export function AccordionTrigger({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { isOpen, toggle } = React.useContext(AccordionItemContext);

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        "flex w-full items-center justify-between p-4 sm:p-5 text-left font-medium text-foreground transition-all hover:text-primary",
        className
      )}
    >
      <span className="text-base sm:text-lg font-semibold">{children}</span>
      <ChevronDown
        className={cn(
          "size-5 text-muted-foreground transition-transform duration-200 shrink-0 ml-4",
          isOpen && "rotate-180 text-primary"
        )}
      />
    </button>
  );
}

export function AccordionContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { isOpen } = React.useContext(AccordionItemContext);

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "px-4 pb-5 pt-0 text-sm text-muted-foreground leading-relaxed animate-in fade-in-50 duration-200",
        className
      )}
    >
      {children}
    </div>
  );
}
