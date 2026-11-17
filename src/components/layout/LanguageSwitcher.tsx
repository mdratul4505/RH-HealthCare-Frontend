"use client";

import { useLanguage, Language } from "@/context/language-context";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";

export default function LanguageSwitcher({ className }: { className?: string }) {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (lang: Language) => {
    setLanguage(lang);
    setOpen(false);
  };

  return (
    <div className={cn("relative", className)} ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-9 items-center gap-1.5 rounded-xl border border-border bg-card/80 px-2.5 text-xs font-semibold text-foreground hover:bg-muted/70 hover:border-primary/40 transition-all shadow-2xs"
        aria-label="Language selection"
      >
        <Globe className="size-3.5 text-primary" />
        <span>{language === "en" ? "English" : "বাংলা"}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-1.5 w-32 rounded-xl border border-border bg-popover p-1 shadow-lg z-50 animate-in fade-in-50 zoom-in-95 duration-150">
          <button
            type="button"
            onClick={() => handleSelect("en")}
            className={cn(
              "flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors",
              language === "en"
                ? "bg-primary text-primary-foreground font-semibold"
                : "text-foreground hover:bg-muted"
            )}
          >
            <span>English</span>
            {language === "en" && <span className="text-xs">✓</span>}
          </button>
          <button
            type="button"
            onClick={() => handleSelect("bn")}
            className={cn(
              "flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors",
              language === "bn"
                ? "bg-primary text-primary-foreground font-semibold"
                : "text-foreground hover:bg-muted"
            )}
          >
            <span>বাংলা</span>
            {language === "bn" && <span className="text-xs">✓</span>}
          </button>
        </div>
      )}
    </div>
  );
}
