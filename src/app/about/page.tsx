import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "About",
  description: "About Jayant Pratap Singh, an AI-Native Full Stack Developer building practical AI products and scalable web applications.",
};

export default function AboutPage() {
  return (
    <main className="page-shell">
      <section className="page-section">
        <PageHeader
          eyebrow="About"
          title="about."
          description="I build AI-assisted full-stack products, reliable APIs, and scalable web applications."
          meta="Product-minded engineering"
        />

        <div className="relative left-1/2 w-screen -translate-x-1/2 border-t border-[#e7e7e7] dark:border-[#1c1c1c]" />

        <div className="px-4 py-6">
          <div className="hero-copy mx-auto w-full max-w-[680px]">
            <p>
              I&apos;m Jayant Pratap Singh, an AI-native Full Stack Developer based in Delhi, India. I build REST APIs,
              database-driven applications, and event-driven systems, with a focus on backend architecture and reliable delivery.
            </p>
            <p>
              The work I enjoy most sits between product and infrastructure: designing the
              data model, building secure APIs, making the data flow sane, and tightening the details
              until the whole system feels reliable.
            </p>
            <p>
              My recent projects explore workflow automation, distributed document processing, asynchronous workers,
              messaging systems, and observability. I use AI assistants to move faster while reviewing generated code
              for correctness, quality, and security.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
