"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string | null;
  alt?: string;
  fallback?: string;
}

export function Avatar({
  src,
  alt = "User avatar",
  fallback = "U",
  className,
  children,
  ...props
}: AvatarProps) {
  const [hasError, setHasError] = React.useState(!src);

  React.useEffect(() => {
    setHasError(!src);
  }, [src]);

  return (
    <div
      className={cn(
        "relative flex size-10 shrink-0 overflow-hidden rounded-full border border-border bg-muted/60 items-center justify-center font-medium text-xs text-muted-foreground select-none",
        className
      )}
      {...props}
    >
      {children ? (
        children
      ) : !hasError && src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          onError={() => setHasError(true)}
          className="aspect-square size-full object-cover"
        />
      ) : (
        <span className="uppercase font-semibold text-primary">
          {fallback.slice(0, 2)}
        </span>
      )}
    </div>
  );
}

export function AvatarImage({
  src,
  alt = "User",
  className,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) {
  if (!src) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={cn("aspect-square size-full object-cover", className)}
      {...props}
    />
  );
}

export function AvatarFallback({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "flex size-full items-center justify-center font-bold text-xs uppercase",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
