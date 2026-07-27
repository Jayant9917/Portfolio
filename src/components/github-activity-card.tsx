"use client";

import Link from "next/link";
import { ArrowUpRight, CalendarDays, Mail } from "lucide-react";

import type { Activity } from "@/components/contribution-graph";
import { GitHubContributions } from "@/components/github-contributions";

type GitHubActivityCardProps = {
  contributions: Promise<Activity[]>;
  profileUrl: string;
};

export function GitHubActivityCard({
  contributions,
  profileUrl,
}: GitHubActivityCardProps) {
  return (
    <div className="hero-cta-card">
      <div className="hero-cta-visual">
        <GitHubContributions
          contributions={contributions}
          githubProfileUrl={profileUrl}
          className="w-full max-w-full"
        />
      </div>

      <div className="hero-cta-footer">
        <p className="text-foreground text-sm font-medium">
          Interested in working together? Check out my{" "}
          <Link
            href={profileUrl}
            target="_blank"
            className="link-underline text-muted-foreground"
          >
            GitHub
          </Link>{" "}
          or Resume
          <ArrowUpRight className="ml-1 inline h-3.5 w-3.5" />
        </p>
        <div className="hero-cta-actions">
          <Link
            href="tel:7819016236"
            className="hero-cta-button hero-cta-button-primary"
          >
            <CalendarDays className="h-4 w-4" />
            Book an intro call
          </Link>
          <Link
            href="https://mail.google.com/mail/?view=cm&fs=1&to=ranajayant527@gmail.com"
            target="_blank"
            rel="noreferrer"
            className="hero-cta-button"
          >
            <Mail className="h-4 w-4" />
            Send an email
          </Link>
        </div>
      </div>
    </div>
  );
}
