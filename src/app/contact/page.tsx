import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Jayant Pratap Singh for Full Stack Developer and backend engineering opportunities.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact | Jayant Pratap Singh",
    description:
      "Reach Jayant Pratap Singh for Full Stack Developer roles, backend engineering work, and collaboration.",
    url: "/contact",
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Jayant Pratap Singh",
    description:
      "Reach Jayant Pratap Singh for Full Stack Developer roles, backend engineering work, and collaboration.",
    images: ["/opengraph-image"],
  },
};

export default function ContactPage() {
  return (
    <main className="page-shell">
      <section className="page-section">
        <PageHeader
          eyebrow="Contact"
          title="contact."
          description="Interested in building something meaningful? Reach out about Full Stack Developer and backend engineering opportunities."
          meta="Open to thoughtful work"
        />
        <div className="relative left-1/2 w-screen -translate-x-1/2 border-t border-[#e7e7e7] dark:border-[#1c1c1c]" />
        <div className="p-4">
          <div className="social-grid">
            <Link
              href="tel:7819016236"
              className="screen-line-bottom social-link"
            >
              <span className="social-label">Phone</span>
              <span className="social-handle">7819016236</span>
              <ArrowUpRight className="text-muted-foreground ml-auto h-4 w-4" />
            </Link>
            <Link
              href="mailto:ranajayant527@gmail.com"
              className="screen-line-bottom social-link"
            >
              <span className="social-label">Email</span>
              <span className="social-handle">ranajayant527@gmail.com</span>
              <ArrowUpRight className="text-muted-foreground ml-auto h-4 w-4" />
            </Link>
            <Link
              href="https://github.com/Jayant9917"
              target="_blank"
              className="screen-line-bottom social-link"
            >
              <span className="social-label">GitHub</span>
              <span className="social-handle">@Jayant9917</span>
              <ArrowUpRight className="text-muted-foreground ml-auto h-4 w-4" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/jayant-pratap-singh/"
              target="_blank"
              className="screen-line-bottom social-link"
            >
              <span className="social-label">LinkedIn</span>
              <span className="social-handle">/in/jayant-pratap-singh</span>
              <ArrowUpRight className="text-muted-foreground ml-auto h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
