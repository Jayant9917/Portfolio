import React, { ReactNode } from 'react';
import Link from "next/link";
import { Calendar, Dot } from "lucide-react";
import { getMDXFiles, type MDXFile } from "@/lib/mdx-utils";
import { MotionDiv } from "./motion-div";

interface BlogPostFrontmatter {
  title: string;
  date: string;
  description?: string;
  tags?: string[];
}

interface BlogPost extends Omit<MDXFile, 'frontmatter'> {
  frontmatter: BlogPostFrontmatter;
}

interface LandingBlogsProps {
  children?: ReactNode;
}

export const LandingBlogs: React.FC<LandingBlogsProps> = async () => {
  const posts = (await getMDXFiles("src/content/posts")) as unknown as BlogPost[];
  const recentPosts = posts.slice(0, 3); // Show 2 most recent posts
  
  const formatDate = (dateString?: string): string => {
    if (!dateString) return 'No date';
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  
  const formatLongDate = (dateString?: string): string => {
    if (!dateString) return 'No date';
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (recentPosts.length === 0) {
    return null;
  }

  return (
    <section className="mt-14">
      <div className="flex items-baseline justify-between gap-4 border-t border-neutral-200/70 pt-5 dark:border-neutral-800">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">Writing archive</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
            Writing archive
          </h2>
        </div>
        <Link
          href="/blog"
          className="text-sm font-medium text-neutral-500 underline decoration-dotted underline-offset-4 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
        >
          View archive →
        </Link>
      </div>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-neutral-600 dark:text-neutral-400">
        Notes on AI agents, context engineering, product thinking, and the systems I’m building.
      </p>

      <div className="mt-5 space-y-0">
        {recentPosts.map((post, idx) => (
          <MotionDiv
            key={`motion-${post.slug}`}
            initial={{ opacity: 0, y: 12, filter: "blur(2px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.3,
              delay: idx * 0.1,
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            <article key={post.slug} className="group border-b border-neutral-200/70 py-4 dark:border-neutral-800">
              <div className="relative">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                  <div>
                    <h3 className="text-base font-medium tracking-tight text-neutral-900 dark:text-neutral-100">
                      <Dot className="-ml-5.5 sm:hidden" />
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:text-neutral-600 dark:hover:text-neutral-300"
                      >
                        {post.frontmatter.title}
                      </Link>
                    </h3>
                    <div className="mt-1 flex items-center gap-1.5 text-[13px] text-neutral-500 dark:text-neutral-400 sm:hidden">
                      <Calendar className="h-3.5 w-3.5" />
                      <time
                        dateTime={post.frontmatter.date}
                      >
                        {formatDate(post.frontmatter.date)}
                      </time>
                    </div>
                  </div>
                  <time
                    dateTime={post.frontmatter.date}
                    className="mt-1 hidden whitespace-nowrap text-[13px] text-neutral-500 dark:text-neutral-400 sm:block"
                  >
                    {formatLongDate(post.frontmatter.date)}
                  </time>
                </div>

                {post.frontmatter.description && (
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                    {post.frontmatter.description}
                  </p>
                )}

                {Array.isArray(post.frontmatter.tags) && post.frontmatter.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {post.frontmatter.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full border border-neutral-200 px-2 py-0.5 text-[10px] font-medium text-neutral-500 dark:border-neutral-800 dark:text-neutral-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          </MotionDiv>
        ))}
      </div>

      <div className="mt-6 text-left">
        <Link
          href="/blog"
          className="inline-flex items-center text-sm font-medium text-neutral-500 underline decoration-dotted underline-offset-4 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
        >
          View all articles <span className="ml-1">→</span>
        </Link>
      </div>
    </section>
  );
}
