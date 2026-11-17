"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, Laptop } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ThemeSwitcher({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={cn("size-9 rounded-lg border border-border bg-card", className)} />
    );
  }

  const cycleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  return (
    <button
      type="button"
      onClick={cycleTheme}
      title={`Theme: ${theme || "system"}`}
      aria-label="Toggle theme"
      className={cn(
        "relative flex size-9 items-center justify-center rounded-xl border border-border bg-card/80 backdrop-blur-xs text-foreground hover:bg-muted/70 hover:text-primary transition-all shadow-2xs hover:border-primary/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        className
      )}
    >
      {theme === "light" && <Sun className="size-4.5 text-amber-500 transition-transform hover:rotate-45" />}
      {theme === "dark" && <Moon className="size-4.5 text-teal-400 transition-transform hover:-rotate-12" />}
      {theme === "system" && <Laptop className="size-4.5 text-blue-500" />}
    </button>
  );
}
