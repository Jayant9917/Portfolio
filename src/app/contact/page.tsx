import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { TallyForm } from "@/components/tally-form";

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
          <TallyForm />
        </div>
      </section>
    </main>
  );
}
