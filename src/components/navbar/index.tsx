"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CommandMenu } from "@/components/command-menu";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { IconArrowUpRight, IconBrandGithub } from "@tabler/icons-react";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const primaryNavItems = [
  { title: "home", href: "/" },
  { title: "projects", href: "/projects" },
  { title: "blog", href: "/blog" },
  { title: "contact", href: "/contact" },
];

const moreNavItems = [
  { title: "about", href: "/about" },
  { title: "stack", href: "/#stack" },
  { title: "experience", href: "/#experience" },
  { title: "socials", href: "/#socials" },
  {
    title: "resume",
    href: "/Jayant_Pratap_Resume.pdf",
    external: true,
  },
];

export const Navbar = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/projects") return pathname.startsWith("/projects");
    if (href === "/blog") return pathname.startsWith("/blog");
    if (href === "/contact") return pathname === "/contact";
    return isHome && href !== "/";
  };

  const handleMoreNavigation = (href: string, external?: boolean) => {
    window.setTimeout(() => {
      if (external) {
        window.open(href, "_blank", "noopener,noreferrer");
        return;
      }

      if (href.startsWith("/#") && pathname === "/") {
        window.location.hash = href.slice(2);
        return;
      }

      window.location.href = href;
    }, 120);
  };
  return (
    <header className="site-header animate-slide-in slide-in-from-top-10 sticky top-0 z-50 hidden xl:block">
      <div className="site-header-shell">
        <nav className="site-nav" aria-label="Primary navigation">
          {primaryNavItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className={cn(
                "site-nav-link",
                isActive(item.href)
                  ? "text-foreground"
                  : "text-muted-foreground",
              )}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.title}
            </Link>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="site-more-trigger"
                aria-label="More navigation options"
              >
                more
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              sideOffset={10}
              className="border-border bg-card min-w-44 rounded-2xl border p-2 shadow-sm"
              onCloseAutoFocus={(event) => event.preventDefault()}
            >
              {moreNavItems.map((item) => (
                <DropdownMenuItem
                  key={item.title}
                  className="rounded-xl px-3 py-2 text-sm"
                  onSelect={() =>
                    handleMoreNavigation(item.href, item.external)
                  }
                >
                  <div className="text-foreground flex w-full items-center justify-between gap-3">
                    <span>{item.title}</span>
                    {item.external ? (
                      <IconArrowUpRight className="text-muted-foreground h-3.5 w-3.5" />
                    ) : null}
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="site-header-actions" aria-label="Header actions">
          <CommandMenu triggerClassName="site-action-button site-search-button" />
          <Link
            href="https://github.com/Jayant9917"
            target="_blank"
            rel="noreferrer"
            className="site-action-button site-github-button"
            aria-label="GitHub profile"
          >
            <IconBrandGithub className="size-4" aria-hidden />
          </Link>
          <ThemeToggle className="site-action-button site-theme-button" />
        </div>
      </div>
    </header>
  );
};
