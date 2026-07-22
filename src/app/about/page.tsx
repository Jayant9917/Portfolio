import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "About",
  description: "About Jayant Pratap Singh, a Full Stack Developer focused on backend engineering and scalable web applications.",
};

export default function AboutPage() {
  return (
    <main className="page-shell">
      <section className="page-section">
        <PageHeader
          eyebrow="About"
          title="about."
          description="I build reliable and secure web applications with a strong focus on backend engineering."
          meta="Product-minded engineering"
        />

        <div className="relative left-1/2 w-screen -translate-x-1/2 border-t border-[#e7e7e7] dark:border-[#1c1c1c]" />

        <div className="px-4 py-6">
          <div className="hero-copy mx-auto w-full max-w-[680px]">
            <p>
              I&apos;m Jayant Pratap Singh, a Full Stack Developer from New Delhi, India focused on backend engineering,
              system design, databases, APIs, security, and product-minded full-stack delivery.
            </p>
            <p>
              The work I enjoy most sits between product and infrastructure: designing the
              data model, building secure APIs, making the data flow sane, and tightening the details
              until the whole system feels reliable.
            </p>
            <p>
              I am currently deepening my expertise in backend engineering, system design,
              distributed systems, and scalable architecture while continuing to build
              production-grade software.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
