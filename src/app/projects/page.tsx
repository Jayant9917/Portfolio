import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { PortfolioProjectGrid } from "@/components/portfolio-project-grid";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected AI-native and full-stack projects across workflow automation, databases, and distributed systems.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects | Jayant Pratap Singh",
    description: "Selected AI-native and full-stack projects across workflow automation, databases, and distributed systems.",
    url: "/projects",
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Jayant Pratap Singh",
    description: "Selected AI-native and full-stack projects across workflow automation, databases, and distributed systems.",
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
          description="AI-native and full-stack applications, workflow automation, and distributed systems."
          meta={`${projects.length} selected builds`}
        />
        <PortfolioProjectGrid projects={projects} className="screen-line-top" featuredCount={projects.length} />
      </section>
    </main>
  );
}
