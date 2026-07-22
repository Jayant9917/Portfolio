"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  className?: string;
  hideIcon?: boolean;
};

function ThemeGlyph() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className="h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="M8 1.75V14.25"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M8 2.35C10.65 3.1 12.25 5.15 12.25 8C12.25 10.85 10.65 12.9 8 13.65"
        fill="currentColor"
        fillOpacity="0.95"
      />
    </svg>
  );
}

export function ThemeToggle({
  className = "",
  hideIcon = false,
}: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.key.toLowerCase() !== "d" ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target as HTMLElement | null;
      if (
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.tagName === "SELECT" ||
        target?.isContentEditable
      ) {
        return;
      }

      event.preventDefault();
      setTheme(resolvedTheme === "dark" ? "light" : "dark");
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [resolvedTheme, setTheme]);

  if (!mounted) {
    return <div className={className} aria-hidden />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className={cn(
            "border-border text-foreground hover:bg-accent hover:text-foreground focus-visible:ring-ring inline-flex items-center justify-center rounded-full border bg-transparent transition-colors focus-visible:ring-2 focus-visible:outline-none",
            className,
          )}
          aria-label="Toggle theme"
        >
          {hideIcon ? null : <ThemeGlyph />}
        </button>
      </TooltipTrigger>
      <TooltipContent
        side="bottom"
        sideOffset={12}
        className="bg-foreground text-background rounded-2xl px-3 py-2 shadow-none [&>svg]:hidden"
      >
        <div className="flex items-center gap-3 text-sm font-medium">
          <span>Toggle Mode</span>
          <span className="border-background/15 bg-background/12 text-background inline-flex h-7 min-w-7 items-center justify-center rounded-xl border px-2 text-xs font-semibold">
            D
          </span>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
