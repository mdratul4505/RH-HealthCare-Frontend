import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive/15 text-destructive hover:bg-destructive/25",
        outline: "text-foreground border border-border",
        success:
          "border-transparent bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-medium",
        warning:
          "border-transparent bg-amber-500/15 text-amber-700 dark:text-amber-400 font-medium",
        teal:
          "border-transparent bg-teal-500/15 text-teal-700 dark:text-teal-300 font-medium",
        indigo:
          "border-transparent bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 font-medium",
        emerald:
          "border-transparent bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-medium",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
