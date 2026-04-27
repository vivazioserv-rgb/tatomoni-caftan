"use client";
import { useState, useRef, useEffect } from "react";
import { useLocale } from "@/context/LocaleProvider";
import { LOCALES, LOCALE_LABELS, Locale } from "@/lib/i18n";
import { Globe } from "lucide-react";

export default function LocaleSwitcher() {
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium transition-colors hover:bg-[var(--accent)]/20"
        aria-label="Change language"
      >
        <Globe className="h-4 w-4" />
        <span>{LOCALE_LABELS[locale].flag}</span>
        <span className="hidden sm:inline uppercase">{locale}</span>
      </button>
      {open && (
        <div
          className="absolute right-0 top-full mt-2 w-44 overflow-hidden rounded-md border shadow-lg z-50"
          style={{ backgroundColor: "#faf6ef", borderColor: "#d4a84b" }}
        >
          {LOCALES.map((l: Locale) => (
            <button
              key={l}
              onClick={() => {
                setLocale(l);
                setOpen(false);
              }}
              className="flex w-full items-center gap-3 px-3 py-2 text-left text-sm transition-colors hover:bg-[var(--muted)]"
              style={{ color: "#1a0e09", backgroundColor: l === locale ? "#f0e8d6" : "transparent" }}
            >
              <span className="text-lg">{LOCALE_LABELS[l].flag}</span>
              <span>{LOCALE_LABELS[l].name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
