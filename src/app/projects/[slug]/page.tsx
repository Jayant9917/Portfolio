import Link from "next/link";
import { ArrowLeft, ExternalLink, Github, LayoutGrid, Zap, GitBranch, Lightbulb } from "lucide-react";
import { getProjectBySlug, getAllProjects } from "@/lib/projects";
import { Heading } from "@/components/heading";
import { TechStack } from "@/components/ui/tech-stack";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.description,
    alternates: {
      canonical: `/projects/${slug}`,
    },
    openGraph: {
      title: `${project.title} | Jayant Pratap Singh`,
      description: project.description,
      url: `/projects/${slug}`,
      type: "article",
      images: [project.src],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Jayant Pratap Singh`,
      description: project.description,
      images: [project.src],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) return null;

  return (
    <main className="page-shell min-h-screen px-4 py-12 md:px-8 md:py-14">
        <div className="mx-auto max-w-[46rem]">
          <div className="pt-4 pb-8">
          <Link
            href="/projects"
            className="group inline-flex items-center text-[13px] text-[#6e6e6e] transition-colors hover:text-black dark:text-[#7a7a7a] dark:hover:text-white"
          >
            <ArrowLeft className="mr-2 h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            Back to Projects
          </Link>
          </div>

          <div className="max-w-3xl">
            <p className="mb-2 font-mono text-[12px] text-[#6e6e6e] dark:text-[#7a7a7a]">
              Project
            </p>
            <Heading as="h1" className="mb-2 text-black dark:text-white">
              {project.title}
            </Heading>
            <p className="text-base leading-7 text-[#4a4a4a] dark:text-[#b0b0b0] md:text-lg">
              {project.description}
            </p>
          </div>
        </div>

        <div className="relative left-1/2 mt-8 w-screen -translate-x-1/2 border-t border-[#e7e7e7] dark:border-[#1c1c1c]" />

        {/*
        <div className="relative mb-8 mt-8 h-64 w-full overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 md:h-96">
          <Image
            src={project.src}
            alt={project.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 80vw"
          />
        </div>
        */}

        <div className="mx-auto mt-6 grid max-w-[46rem] grid-cols-2 gap-3">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center rounded-lg border border-neutral-200 bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800 dark:border-neutral-700 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-white"
            >
              Live
              <ExternalLink className="ml-2 h-3.5 w-3.5" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center rounded-lg border border-neutral-200 px-4 py-2 text-sm font-medium transition-colors hover:bg-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-800"
            >
              <Github className="mr-2 h-4 w-4" />
              Code
            </a>
          )}
        </div>

        <div className="mx-auto mt-6 grid max-w-[46rem] grid-cols-1 gap-4 md:grid-cols-6 lg:grid-cols-12">
          <div className="space-y-6 md:col-span-4 lg:col-span-8">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
              <div className="mb-4 flex items-center gap-2">
                <LayoutGrid className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Project Overview</h2>
              </div>
              <p className="leading-relaxed text-neutral-600 dark:text-neutral-400">
                {project.overview}
              </p>
            </div>

            {project.features && project.features.length > 0 && (
              <div className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
                <div className="mb-3 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-blue-500" />
                  <h3 className="font-medium">Key Features</h3>
                </div>
                <ul className="space-y-2">
                  {project.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start text-sm text-neutral-600 dark:text-neutral-400"
                    >
                      <span className="mr-2">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {project.challenges && project.challenges.length > 0 && (
                <div className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
                  <div className="mb-3 flex items-center gap-2">
                    <GitBranch className="h-4 w-4 text-yellow-500" />
                    <h3 className="font-medium">Challenges</h3>
                  </div>
                  <ul className="space-y-2">
                    {project.challenges.map((challenge, index) => (
                      <li
                        key={index}
                        className="flex items-start text-sm text-neutral-600 dark:text-neutral-400"
                      >
                        <span className="mr-2">•</span>
                        {challenge}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.learnings && project.learnings.length > 0 && (
                <div className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
                  <div className="mb-3 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-blue-500" />
                    <h3 className="font-medium">Key Learnings</h3>
                  </div>
                  <ul className="space-y-2">
                    {project.learnings.map((learning, index) => (
                      <li
                        key={index}
                        className="flex items-start text-sm text-neutral-600 dark:text-neutral-400"
                      >
                        <span className="mr-2">•</span>
                        {learning}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4 md:col-span-2 lg:col-span-4">
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
              <h3 className="mb-4 font-medium">Project Details</h3>
              <div className="space-y-4">
                {project.date && (
                  <div>
                    <p className="text-xs text-neutral-500">Date</p>
                    <p className="text-sm">
                      {new Date(project.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                      })}
                    </p>
                  </div>
                )}

                {project.deployment && (
                  <div>
                    <p className="text-xs text-neutral-500">Deployment</p>
                    <a
                      href={project.deployment.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm transition-colors hover:text-primary"
                    >
                      {project.deployment.platform}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
              <h3 className="font-medium">Technology Stack</h3>
              <TechStack
                technologies={project.technologies}
                developmentTools={project.developmentTools}
                designTools={project.designTools}
              />
            </div>
          </div>
        </div>
    </main>
  );
}
