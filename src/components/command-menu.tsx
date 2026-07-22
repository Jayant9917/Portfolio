"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BriefcaseBusiness,
  FileText,
  FolderKanban,
  Github,
  Home,
  Mail,
  Search,
  Send,
  Share2,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

type CommandMenuItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  shortcut?: string;
};

type CommandMenuGroup = {
  heading: string;
  items: CommandMenuItem[];
};

const commandGroups: CommandMenuGroup[] = [
  {
    heading: "Pages",
    items: [
      { label: "Home", href: "/", icon: Home, shortcut: "H" },
      {
        label: "Projects",
        href: "/projects",
        icon: FolderKanban,
        shortcut: "P",
      },
      { label: "Blog", href: "/blog", icon: FileText, shortcut: "B" },
      { label: "Contact", href: "/contact", icon: Mail, shortcut: "C" },
    ],
  },
  {
    heading: "Sections",
    items: [
      { label: "Stack", href: "/#stack", icon: Wrench },
      { label: "Experience", href: "/#experience", icon: BriefcaseBusiness },
      { label: "Socials", href: "/#socials", icon: Share2 },
    ],
  },
  {
    heading: "External",
    items: [
      {
        label: "GitHub",
        href: "https://github.com/Jayant9917",
        icon: Github,
      },
      {
        label: "Resume",
        href: "https://drive.google.com/file/d/1flNfObtr9q55WtIA5DJRZLEkj_Trsw7-/view?usp=sharing",
        icon: Send,
      },
    ],
  },
];

type CommandMenuProps = {
  triggerClassName?: string;
  hideLabel?: boolean;
  hideShortcut?: boolean;
};

export function CommandMenu({
  triggerClassName,
  hideLabel = false,
  hideShortcut = false,
}: CommandMenuProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.key.toLowerCase() !== "k" ||
        (!event.metaKey && !event.ctrlKey)
      ) {
        return;
      }

      event.preventDefault();
      setOpen((current) => !current);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const runCommand = (href: string) => {
    setOpen(false);

    if (href.startsWith("http")) {
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }

    router.push(href);
  };

  return (
    <>
      <button
        type="button"
        className={`${triggerClassName ?? ""} whitespace-nowrap`}
        aria-label="Open command menu"
        onClick={() => setOpen(true)}
      >
        <Search className="size-4 shrink-0" aria-hidden />
        {hideLabel ? null : <span>Search</span>}
        {hideShortcut ? null : (
          <span aria-hidden className="site-kbd-group hidden xl:inline-flex">
          <span className="site-kbd">Ctrl</span>
          <span className="site-kbd">K</span>
          </span>
        )}
      </button>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Command menu"
        description="Search pages, sections, and external links."
        className="command-menu-dialog"
      >
        <CommandInput placeholder="Search Jayant Pratap Singh..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {commandGroups.map((group, groupIndex) => (
            <div key={group.heading}>
              {groupIndex > 0 ? <CommandSeparator /> : null}
              <CommandGroup heading={group.heading}>
                {group.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <CommandItem
                      key={item.href}
                      value={`${group.heading} ${item.label}`}
                      onSelect={() => runCommand(item.href)}
                    >
                      <Icon className="size-4" aria-hidden />
                      <span>{item.label}</span>
                      {item.shortcut ? (
                        <CommandShortcut>{item.shortcut}</CommandShortcut>
                      ) : null}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </div>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
