"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { IconBrandGithub, IconBrandX } from "@tabler/icons-react"
import { Home, Menu, X } from "lucide-react"
import { CommandMenu } from "@/components/command-menu"
import { ThemeToggle } from "@/components/theme/theme-toggle"
import { cn } from "@/lib/utils"

const navItems = [
  { title: "Home", href: "/" },
  { title: "Projects", href: "/projects" },
  { title: "Blog", href: "/blog" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
  { title: "Resume", href: "/Jayant_Pratap_Resume.pdf", external: true },
]

export function MobileDock() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const dockRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!open) {
      return
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!dockRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener("pointerdown", handlePointerDown)
    return () => document.removeEventListener("pointerdown", handlePointerDown)
  }, [open])

  return (
    <div
      ref={dockRef}
      className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4 [--mobile-dock-width:15.5rem] xl:hidden"
    >
      <div className="bg-background/90 border-border flex w-[var(--mobile-dock-width)] items-center justify-between gap-1 rounded-full border px-2 py-1.5 shadow-lg backdrop-blur-md">
        <Link
          href="/"
          className="text-muted-foreground hover:text-foreground flex h-9 w-9 items-center justify-center rounded-full transition-colors"
          aria-label="Home"
        >
          <Home className="h-4 w-4" />
        </Link>

        <Link
          href="https://github.com/Jayant9917"
          target="_blank"
          className="text-muted-foreground hover:text-foreground flex h-9 w-9 items-center justify-center rounded-full transition-colors"
          aria-label="X (Twitter)"
        >
          <IconBrandX className="h-4 w-4" />
        </Link>

        <Link
          href="https://github.com/Jayant9917"
          target="_blank"
          className="text-muted-foreground hover:text-foreground flex h-9 w-9 items-center justify-center rounded-full transition-colors"
          aria-label="GitHub"
        >
          <IconBrandGithub className="h-4 w-4" />
        </Link>

        <CommandMenu
          triggerClassName="text-muted-foreground hover:text-foreground flex h-9 w-9 items-center justify-center rounded-full transition-colors"
          hideLabel
          hideShortcut
        />

        <ThemeToggle className="text-muted-foreground hover:text-foreground flex h-9 w-9 items-center justify-center rounded-full border-0 bg-transparent transition-colors focus-visible:ring-0" />

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={cn(
            "text-muted-foreground hover:text-foreground flex h-9 w-9 items-center justify-center rounded-full transition-colors",
            open && "bg-accent text-foreground",
          )}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {open && (
        <div className="bg-background/95 border-border absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-[var(--mobile-dock-width)] rounded-2xl border p-1.5 shadow-lg backdrop-blur-md">
          {navItems.map((item) => {
            const isActive = !item.external && pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                onClick={() => setOpen(false)}
                className={cn(
                  "block rounded-lg px-3 py-2 text-[13px] font-medium transition-colors",
                  isActive
                    ? "text-foreground bg-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
                )}
              >
                {item.title}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
