import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { PortfolioProjectGrid } from "@/components/portfolio-project-grid";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected projects across backend engineering, databases, security, and full-stack development.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects | Jayant Pratap Singh",
    description: "Selected projects across backend engineering and full-stack development.",
    url: "/projects",
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Jayant Pratap Singh",
    description: "Selected projects across backend engineering and full-stack development.",
    images: ["/opengraph-image"],
  },
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <main className="page-shell">
      <section className="page-section">
        <PageHeader
          eyebrow="Projects"
          title="projects."
          description="Backend and full-stack engineering work arranged in the same bordered showcase system as the homepage."
          meta={`${projects.length} selected builds`}
        />
        <PortfolioProjectGrid projects={projects} className="screen-line-top" featuredCount={projects.length} />
      </section>
    </main>
  );
}
