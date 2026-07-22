import { redirect } from "next/navigation";
import { Metadata } from "next";
import fs from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";
import matter from "gray-matter";
import { IconArrowLeft } from "@tabler/icons-react";
import { components as baseComponents } from "@/components/mdx-components";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ShareMenu } from "@/components/share-menu";
import { TOCMinimap } from "@/components/toc-minimap";

export interface BlogPostMetadata {
  title: string;
  description: string;
  date: string;
  author?: string;
  category?: string;
  readTime?: string;
  views?: number;
  image?: string;
  tags?: string[];
}

function isBlogPostMetadata(data: unknown): data is BlogPostMetadata {
  return (
    typeof data === "object" &&
    data !== null &&
    "title" in data &&
    "description" in data &&
    "date" in data &&
    typeof (data as { title: unknown }).title === "string" &&
    typeof (data as { description: unknown }).description === "string" &&
    typeof (data as { date: unknown }).date === "string"
  );
}

function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

function extractHeadings(content: string) {
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  const headings: { title: string; url: string; depth: number }[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const depth = match[1].length;
    const title = match[2].trim();
    const url = `#${title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")}`;
    headings.push({ title, url, depth });
  }

  return headings;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), `src/content/posts/${slug}.mdx`);

  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data: frontmatter } = matter(fileContent);

    if (!isBlogPostMetadata(frontmatter)) {
      throw new Error("Invalid blog post metadata");
    }

    const image = frontmatter.image || "/opengraph-image";

    return {
      title: frontmatter.title,
      description: frontmatter.description,
      alternates: {
        canonical: `/blog/${slug}`,
      },
      openGraph: {
        title: frontmatter.title,
        description: frontmatter.description,
        url: `/blog/${slug}`,
        type: "article",
        publishedTime: frontmatter.date,
        authors: [frontmatter.author || "Jayant Pratap Singh"],
        tags: frontmatter.tags,
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: frontmatter.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: frontmatter.title,
        description: frontmatter.description,
        images: [image],
      },
    };
  } catch {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), "src/content/posts", `${slug}.mdx`);

  try {
    await fs.promises.access(filePath);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const content = fileContent.replace(/^---[\s\S]*?---\s*/, "");
    const { data: frontmatter } = matter(fileContent);

    if (!isBlogPostMetadata(frontmatter)) {
      throw new Error("Invalid blog post metadata");
    }

    const readTime = frontmatter.readTime || calculateReadTime(content);
    const headings = extractHeadings(content);

    return (
      <main className="page-shell min-h-screen px-6 pb-16 pt-28 text-[14px] leading-[22px] text-[#0a0a0a] dark:text-[#d8d8d8] md:pt-32">
        <aside className="fixed right-8 top-1/2 z-40 hidden -translate-y-1/2 xl:block">
          <TOCMinimap items={headings} />
        </aside>

        <article className="mx-auto w-full max-w-[680px]">
          <div className="pt-4 pb-8">
            <Link
              href="/blog"
              className="group inline-flex items-center text-[13px] text-[#6e6e6e] transition-colors hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/70 dark:text-[#7a7a7a] dark:hover:text-white dark:focus-visible:ring-white/70"
            >
              <IconArrowLeft className="mr-2 h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
              Back to Blog
            </Link>
          </div>

          <div>
            <header className="pb-8 pt-2">
              <p className="mb-5 text-[#6e6e6e] dark:text-[#7a7a7a]">Blog</p>
              <h1 className="max-w-[620px] text-[24px] font-medium leading-8 text-black dark:text-white md:text-[28px] md:leading-9">
                {frontmatter.title}
              </h1>
              {frontmatter.description ? (
                <p className="mt-4 max-w-[620px] text-[#4a4a4a] dark:text-[#b0b0b0]">
                  {frontmatter.description}
                </p>
              ) : null}
              <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[#6e6e6e] dark:text-[#7a7a7a]">
                <span>{frontmatter.author || "Jayant Pratap Singh"}</span>
                <span>
                  {new Date(frontmatter.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </span>
                <span>{readTime}</span>
                <ShareMenu title={frontmatter.title} url={`/blog/${slug}`} />
              </div>

              {frontmatter.image ? (
                <div className="relative mt-8 h-64 w-full overflow-hidden rounded-lg border border-[#e7e7e7] dark:border-[#1c1c1c] md:h-80">
                  <Image
                    src={frontmatter.image}
                    alt={frontmatter.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              ) : null}
            </header>

            <div className="relative left-1/2 w-screen -translate-x-1/2 border-t border-[#e7e7e7] dark:border-[#1c1c1c]" />
          </div>

          <div className="article-body pt-10">
            <MDXRemote source={content} components={baseComponents} />
          </div>
        </article>
      </main>
    );
  } catch (error) {
    console.error("Error rendering post:", error);
    redirect("/blog");
  }
}

export async function generateStaticParams() {
  const postsDir = path.join(process.cwd(), "src/content/posts");

  try {
    const files = fs.readdirSync(postsDir);

    return files
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => ({
        slug: file.replace(/\.mdx$/, ""),
      }));
  } catch (error) {
    console.error("Error reading posts directory:", error);
    return [];
  }
}
