"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Globe, Github, LayoutGrid, List } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import type { Project } from "@/types/project";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type PortfolioProjectGridProps = {
  projects: Project[];
  className?: string;
  featuredCount?: number;
};

export function PortfolioProjectGrid({
  projects,
  className,
  featuredCount = 4,
}: PortfolioProjectGridProps) {
  const [view, setView] = useState<"grid" | "list">("grid");
  const featuredProjects = projects.slice(0, featuredCount);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (
      e.key.toLowerCase() === "g" &&
      !e.ctrlKey &&
      !e.metaKey &&
      !e.altKey &&
      !(e.target instanceof HTMLInputElement) &&
      !(e.target instanceof HTMLTextAreaElement)
    ) {
      e.preventDefault();
      setView("grid");
    }
    if (
      e.key.toLowerCase() === "l" &&
      !e.ctrlKey &&
      !e.metaKey &&
      !e.altKey &&
      !(e.target instanceof HTMLInputElement) &&
      !(e.target instanceof HTMLTextAreaElement)
    ) {
      e.preventDefault();
      setView("list");
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className={cn(className)}>
      <div className="relative left-1/2 w-screen -translate-x-1/2 border-t border-[#e7e7e7] dark:border-[#1c1c1c]" />
      <div className="section-bar">
        <div className="mono-note">
          Selected work with product screenshots and deployment proof.
        </div>
        <div className="view-toggle-group" aria-label="Project view mode">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                aria-label="Grid view"
                onClick={() => setView("grid")}
                className={cn(
                  "view-toggle-button",
                  view === "grid" && "is-active",
                )}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
              </button>
            </TooltipTrigger>
            <TooltipContent
              side="bottom"
              sideOffset={12}
              className="bg-foreground text-background rounded-2xl px-3 py-2 shadow-none [&>svg]:hidden"
            >
              <div className="flex items-center gap-3 text-sm font-medium">
                <span>Grid View</span>
                <span className="border-background/15 bg-background/12 text-background inline-flex h-7 min-w-7 items-center justify-center rounded-xl border px-2 text-xs font-semibold">
                  G
                </span>
              </div>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                aria-label="List view"
                onClick={() => setView("list")}
                className={cn(
                  "view-toggle-button",
                  view === "list" && "is-active",
                )}
              >
                <List className="h-3.5 w-3.5" />
              </button>
            </TooltipTrigger>
            <TooltipContent
              side="bottom"
              sideOffset={12}
              className="bg-foreground text-background rounded-2xl px-3 py-2 shadow-none [&>svg]:hidden"
            >
              <div className="flex items-center gap-3 text-sm font-medium">
                <span>List View</span>
                <span className="border-background/15 bg-background/12 text-background inline-flex h-7 min-w-7 items-center justify-center rounded-xl border px-2 text-xs font-semibold">
                  L
                </span>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      {view === "grid" ? (
        <div className="portfolio-grid">
          <div className="portfolio-grid-guides" aria-hidden>
            <div />
            <div className="border-r-0" />
          </div>
          {featuredProjects.map((project) => (
            <article
              key={project.title}
              className="screen-line-bottom project-card"
            >
              <Link
                href={project.slug ? `/projects/${project.slug}` : project.link}
                target={project.slug ? undefined : "_blank"}
                className="project-frame spotlight-veil"
              >
                <Image
                  src={project.src}
                  alt={project.title}
                  fill
                  sizes="(min-width: 640px) 24rem, 100vw"
                  className="project-cover object-cover object-top"
                />
              </Link>

              <div className="flex flex-col gap-2 px-1">
                <div className="project-meta-row">
                  <div>
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-description text-sm">
                      {project.description}
                    </p>
                  </div>

                  <div className="link-icon-row">
                    <Link
                      href={project.link}
                      target="_blank"
                      className="icon-action"
                      aria-label={`${project.title} website`}
                    >
                      <Globe className="h-4 w-4" />
                    </Link>
                    {project.githubUrl ? (
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        className="icon-action"
                        aria-label={`${project.title} GitHub`}
                      >
                        <Github className="h-4 w-4" />
                      </Link>
                    ) : null}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={`${project.title}-${tech.name}`}
                      className="meta-pill"
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="list-grid">
          {projects.map((project) => {
            const liveUrl = project.deployment?.url ?? project.link;

            return (
            <article key={project.title} className="screen-line-bottom list-row">
              <div className="flex flex-col gap-2">
                <Link href={`/projects/${project.slug}`} className="list-row-title">
                  {project.title}
                </Link>
                <p className="text-muted-foreground text-sm leading-6">
                  {project.description}
                </p>
              </div>
              <div className="flex min-w-[4.75rem] flex-row items-center justify-end gap-3 self-end sm:flex-col sm:items-end sm:self-auto">
                <span className="list-row-meta">
                  {project.deployment?.platform ?? "Project"}
                </span>
                <div className="link-icon-row">
                  <Link
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="icon-action"
                    aria-label={`${project.title} live site`}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                  {project.githubUrl ? (
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="icon-action"
                      aria-label={`${project.title} GitHub repository`}
                    >
                      <Github className="h-4 w-4" />
                    </Link>
                  ) : null}
                </div>
              </div>
            </article>
          );
          })}
        </div>
      )}
    </div>
  );
}
