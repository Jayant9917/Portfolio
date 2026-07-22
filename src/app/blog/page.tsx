import Link from "next/link";
import type { Metadata } from "next";
import { NotebookPen } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { getMDXFiles } from "@/lib/mdx-utils";

interface BlogPost {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    readTime?: string;
  };
}

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on backend engineering, AI systems, databases, and software development.",
};

export default async function BlogPage() {
  const posts = (await getMDXFiles("src/content/posts")) as unknown as BlogPost[];

  const grouped = posts.reduce<Record<string, BlogPost[]>>((acc, post) => {
    const year = new Date(post.frontmatter.date).getFullYear().toString();
    acc[year] ||= [];
    acc[year].push(post);
    return acc;
  }, {});

  return (
    <main className="page-shell">
      <section className="page-section">
        <PageHeader
          eyebrow="Blog"
          title="blog."
          description="Notes on backend engineering, AI systems, databases, and software development."
          meta={`${posts.length} posts`}
        />

        <div className="relative left-1/2 w-screen -translate-x-1/2 border-t border-[#e7e7e7] dark:border-[#1c1c1c]" />

        {Object.entries(grouped)
          .sort(([a], [b]) => Number(b) - Number(a))
          .map(([year, yearPosts]) => (
            <section key={year} className="page-section">
              <div className="section-bar screen-line-bottom">
                <h2 className="section-title">{year}.</h2>
                <span className="mono-note">{yearPosts.length} entries</span>
              </div>
              <div className="list-grid">
                {yearPosts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="screen-line-bottom list-row">
                    <div className="flex items-start gap-3">
                      <NotebookPen className="mt-1 h-4 w-4 text-muted-foreground" />
                      <span className="list-row-title">{post.frontmatter.title}</span>
                    </div>
                    <span className="list-row-meta">
                      {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "2-digit",
                      })}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
      </section>
    </main>
  );
}
