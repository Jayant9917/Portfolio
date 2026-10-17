import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Braces,
  BrainCircuit,
  Clock3,
  Cloud,
  Code2,
  CodeXml,
  Database,
  Github,
  KeyRound,
  LockKeyhole,
  Mail,
  MapPin,
  MessageSquareText,
  NotebookPen,
  ScanSearch,
  Server,
  ShieldCheck,
  Sparkles,
  Webhook,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import {
  IconBrandOpenai,
  type TablerIcon,
} from "@tabler/icons-react";
import {
  siBurpsuite,
  siClaude,
  siCss,
  siCursor,
  siDocker,
  siExpress,
  siGit,
  siGooglegemini,
  siGithub,
  siGrafana,
  siHtml5,
  siJavascript,
  siLetsencrypt,
  siMongodb,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siNginx,
  siNetlify,
  siOwasp,
  siPostgresql,
  siPostman,
  siPrisma,
  siPrometheus,
  siPython,
  siRabbitmq,
  siReact,
  siReactrouter,
  siRedis,
  siShadcnui,
  siSpringboot,
  siTailwindcss,
  siTypescript,
  siVercel,
  siZap,
  siApachekafka,
  type SimpleIcon,
} from "simple-icons";
import { GitHubActivityCard } from "@/components/github-activity-card";
import { GitHubContributionsFallback } from "@/components/github-contributions";
import { PortfolioProjectGrid } from "@/components/portfolio-project-grid";
import {
  WorkExperience,
  type ExperienceItemType,
} from "@/components/work-experience";
import { getCachedContributions } from "@/lib/get-cached-contributions";
import { getMDXFiles, type MDXFile } from "@/lib/mdx-utils";
import { getAllProjects } from "@/lib/projects";

type BlogPostFrontmatter = {
  title: string;
  date: string;
  readTime?: string;
  externalUrl?: string;
};

type BlogPost = Omit<MDXFile, "frontmatter"> & {
  frontmatter: BlogPostFrontmatter;
};

type StackIcon =
  | { type: "simple"; icon: SimpleIcon }
  | { type: "tabler"; icon: TablerIcon }
  | { type: "lucide"; icon: LucideIcon }
  | { type: "badge"; label: string };

type StackItem = {
  label: string;
  icon: StackIcon;
};

const simpleIcon = (icon: SimpleIcon): StackIcon => ({ type: "simple", icon });
const tablerIcon = (icon: TablerIcon): StackIcon => ({ type: "tabler", icon });
const lucideIcon = (icon: LucideIcon): StackIcon => ({ type: "lucide", icon });
const badgeIcon = (label: string): StackIcon => ({ type: "badge", label });

const techStack: { label: string; items: StackItem[] }[] = [
  { label: "Languages", items: [
    { label: "JavaScript", icon: simpleIcon(siJavascript) }, { label: "TypeScript", icon: simpleIcon(siTypescript) },
    { label: "Python", icon: simpleIcon(siPython) }, { label: "Java", icon: lucideIcon(Code2) }, { label: "SQL", icon: lucideIcon(Database) },
  ] },
  { label: "Frontend", items: [
    { label: "React.js", icon: simpleIcon(siReact) }, { label: "Next.js", icon: simpleIcon(siNextdotjs) },
    { label: "Tailwind CSS", icon: simpleIcon(siTailwindcss) }, { label: "HTML5", icon: simpleIcon(siHtml5) }, { label: "CSS3", icon: simpleIcon(siCss) }, { label: "shadcn/ui", icon: simpleIcon(siShadcnui) }, { label: "React Router", icon: simpleIcon(siReactrouter) }, { label: "Context API", icon: lucideIcon(Workflow) },
  ] },
  { label: "Backend & Databases", items: [
    { label: "Node.js", icon: simpleIcon(siNodedotjs) }, { label: "Express.js", icon: simpleIcon(siExpress) }, { label: "Spring Boot", icon: simpleIcon(siSpringboot) },
    { label: "PostgreSQL", icon: simpleIcon(siPostgresql) }, { label: "MongoDB", icon: simpleIcon(siMongodb) },
    { label: "MySQL", icon: simpleIcon(siMysql) }, { label: "REST APIs", icon: lucideIcon(Braces) }, { label: "Webhooks", icon: lucideIcon(Webhook) }, { label: "Authentication & Authorization", icon: lucideIcon(ShieldCheck) }, { label: "Prisma", icon: simpleIcon(siPrisma) }, { label: "Kafka", icon: simpleIcon(siApachekafka) }, { label: "RabbitMQ", icon: simpleIcon(siRabbitmq) }, { label: "Redis", icon: simpleIcon(siRedis) }, { label: "nginx", icon: simpleIcon(siNginx) },
  ] },
  { label: "Infrastructure & Security", items: [
    { label: "Docker", icon: simpleIcon(siDocker) }, { label: "AWS", icon: lucideIcon(Cloud) }, { label: "Microsoft IIS", icon: lucideIcon(Server) }, { label: "Vercel", icon: simpleIcon(siVercel) }, { label: "Netlify", icon: simpleIcon(siNetlify) },
    { label: "HTTPS", icon: lucideIcon(LockKeyhole) }, { label: "TLS", icon: simpleIcon(siLetsencrypt) }, { label: "SSL/TLS", icon: simpleIcon(siLetsencrypt) },
    { label: "OWASP ZAP", icon: simpleIcon(siOwasp) }, { label: "Burp Suite", icon: simpleIcon(siBurpsuite) }, { label: "Nmap", icon: lucideIcon(ScanSearch) }, { label: "Prometheus", icon: simpleIcon(siPrometheus) }, { label: "Grafana", icon: simpleIcon(siGrafana) },
    { label: "Git", icon: simpleIcon(siGit) }, { label: "GitHub", icon: simpleIcon(siGithub) },
  ] },
  { label: "AI Engineering & Tools", items: [
    { label: "AI Agents", icon: lucideIcon(BrainCircuit) }, { label: "Generative AI", icon: simpleIcon(siGooglegemini) }, { label: "Prompt Engineering", icon: lucideIcon(MessageSquareText) }, { label: "AI Workflows", icon: lucideIcon(Workflow) }, { label: "Context Engineering", icon: lucideIcon(KeyRound) }, { label: "Postman", icon: simpleIcon(siPostman) }, { label: "VS Code", icon: lucideIcon(CodeXml) },
  ] },
  { label: "Workflow & AI", items: [
    { label: "Cursor", icon: simpleIcon(siCursor) }, { label: "Claude", icon: simpleIcon(siClaude) },
    { label: "Gemini", icon: simpleIcon(siGooglegemini) }, { label: "ChatGPT", icon: tablerIcon(IconBrandOpenai) },
    { label: "Vercel", icon: simpleIcon(siVercel) },
  ] },
];
const experiences: ExperienceItemType[] = [
  { id: "nirnaya", companyName: "Nirnaya", isCurrentEmployer: true, positions: [{
    id: "nirnaya-full-stack", title: "Full Stack Engineer", employmentType: "Full-time", employmentPeriod: { start: "10.2025" },
    description: "Building secure internal web platforms that digitize operational workflows, replacing manual processes with role-based dashboards for real-time visibility.\n\n- Designed and shipped REST APIs and normalized database schemas for secure data exchange between modules, with query optimization for fast dashboards.\n- Use AI coding assistants to accelerate delivery, explore codebases, and debug while reviewing outputs for correctness, quality, and security.",
    skills: ["React.js", "TypeScript", "Node.js", "Express.js", "PostgreSQL", "REST APIs", "Database Design", "Query Optimization", "RBAC", "AI Coding Assistants"],
  }] },
  { id: "upsala-defsol", companyName: "UPSALA DEFSOL", positions: [{
    id: "upsala-defsol-full-stack", title: "Full Stack Developer", employmentType: "Full-time", employmentPeriod: { start: "08.2025", end: "10.2025" },
    description: "Built modular full-stack web applications with reusable components and clean separation between frontend, API, and data layers.\n\n- Designed REST APIs with CRUD operations, authentication, authorization, and role-based access control.\n- Debugged production issues and improved reliability through better error handling.",
    skills: ["JavaScript", "React.js", "Node.js", "Express.js", "MongoDB", "REST APIs", "Authentication", "Authorization", "RBAC"],
  }] },
];
const socialLinks = [
  { label: "Email", handle: "ranajayant527@gmail.com", href: "mailto:ranajayant527@gmail.com" },
  {
    label: "GitHub", handle: "@Jayant9917", href: "https://github.com/Jayant9917",
  },
  {
    label: "LinkedIn",
    handle: "/in/jayant-pratap-singh", href: "https://www.linkedin.com/in/jayant-pratap-singh/",
  },
  {
    label: "Medium", handle: "@ranajayant527", href: "https://medium.com/@ranajayant527",
  },
];

const profileDetails = [
  { label: "Focus", value: "Backend Engineering", icon: Sparkles },
  { label: "Current", value: "Full Stack Engineer", icon: Code2 },
  { label: "Location", value: "New Delhi, India", icon: MapPin },
  { label: "Availability", value: "Open to opportunities", icon: Clock3 },
  { label: "GitHub", value: "Jayant9917", href: "https://github.com/Jayant9917", icon: Github },
  { label: "Email", value: "ranajayant527@gmail.com", href: "mailto:ranajayant527@gmail.com", icon: Mail },
];
const GITHUB_USERNAME = "Jayant9917";
const GITHUB_PROFILE_URL = "https://github.com/Jayant9917";

function formatReadMeta(post: BlogPost) {
  if (post.frontmatter.readTime)
    return post.frontmatter.readTime.replace("Read", "read");

  return new Date(post.frontmatter.date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export default async function Home() {
  const posts = (
    (await getMDXFiles("src/content/posts")) as unknown as BlogPost[]
  )
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime(),
    )
    .slice(0, 4);
  const projects = getAllProjects();
  const contributions = getCachedContributions(GITHUB_USERNAME);

  return (
    <main className="page-shell">
      <section id="about" className="page-section">
        <div className="hero-stage screen-line-bottom">
          <div className="hero-stage-grid" aria-hidden>
            <div className="hero-stage-block hero-stage-block-large" />
            <div className="hero-stage-block hero-stage-block-mid" />
            <div className="hero-stage-block hero-stage-block-small" />
          </div>
          <div className="hero-stage-profile">
            <div className="hero-stage-avatar">
              <div className="hero-stage-avatar-inner">
                <Image
                  src="/365293.jpg"
                  alt="Jayant Pratap Singh"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>
            <div className="hero-stage-title-wrap">
              <div className="hero-stage-title-row">
                <h1 className="hero-stage-name">Jayant Pratap Singh</h1>
              </div>
              <div className="hero-stage-subline">
                AI-Native Full Stack Developer.
              </div>
            </div>
          </div>
        </div>

        <div className="page-heading">
          <div className="hero-minimal">
            <div className="hero-minimal-head">
              <div className="hero-role-row hero-role-row-inline">
                <span className="hero-role-label">Full Stack Developer</span>
                <Link
                  href="https://github.com/Jayant9917"
                  target="_blank"
                  className="hero-role-link"
                >
                  @Jayant9917
                </Link>
              </div>
              <p className="text-muted-foreground max-w-2xl text-sm leading-6">
                I build full-stack applications with AI-assisted workflows,
                reliable APIs, and event-driven systems using Node.js,
                TypeScript, and PostgreSQL.
              </p>
            </div>

            <div className="profile-detail-grid">
              {profileDetails.map((item) => {
                const Icon = item.icon;
                const content = (
                  <>
                    <span className="profile-detail-icon" aria-hidden>
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="profile-detail-label">{item.label}</span>
                    <span className="profile-detail-value">{item.value}</span>
                    {item.href ? (
                      <ArrowUpRight className="text-muted-foreground ml-auto h-4 w-4" />
                    ) : null}
                  </>
                );

                return item.href ? (
                  <Link
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    className="profile-detail-row"
                  >
                    {content}
                  </Link>
                ) : (
                  <div key={item.label} className="profile-detail-row">
                    {content}
                  </div>
                );
              })}
            </div>

            <Suspense fallback={<GitHubContributionsFallback />}>
              <GitHubActivityCard
                contributions={contributions}
                profileUrl={GITHUB_PROFILE_URL}
              />
            </Suspense>
          </div>
        </div>
      </section>

      <div className="stripe-divider" />

      <section id="stack" className="page-section">
        <div className="section-bar screen-line-top screen-line-bottom">
          <h2 className="section-title">Stack</h2>
          <span className="mono-note">
            Technologies and engineering practices I use.
          </span>
        </div>
        <div className="stack-groups list-grid">
          {techStack.map((group, index) => (
            <div
              key={group.label}
              className="stack-group screen-line-bottom grid gap-4 p-4 sm:grid-cols-[12rem_1fr]"
            >
              <div className="text-muted-foreground flex items-center gap-3 transition-opacity duration-150">
                <span className="font-mono text-sm">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-lg">{group.label}</span>
              </div>
              <div className="stack-chip-grid">
                {group.items.map((item: StackItem) => {
                  return (
                    <span key={item.label} className="stack-chip">
                      <StackLogo icon={item.icon} className="stack-chip-icon" />
                      <span>{item.label}</span>
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="stripe-divider" />

      <section id="projects" className="page-section">
        <div className="section-bar screen-line-top screen-line-bottom">
          <h2 className="section-title">Projects</h2>
          <span className="mono-note">
            Selected projects across AI-native, full-stack, and event-driven development.
          </span>
        </div>
        <div className="section-copy">
          Building systems. Learning continuously.
        </div>
        <PortfolioProjectGrid projects={projects} featuredCount={4} />
        <div className="screen-line-top flex justify-center p-4">
          <Link
            href="/projects"
            className="bg-primary text-primary-foreground inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium"
          >
            View all projects
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <div className="stripe-divider" />

      <section id="writing" className="page-section">
        <div className="section-bar screen-line-top screen-line-bottom">
          <h2 className="section-title">Blog</h2>
          <span className="mono-note">
            Notes on AI systems, full-stack development, databases, and software engineering.
          </span>
        </div>
        <div className="list-grid">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={post.frontmatter.externalUrl ?? `/blog/${post.slug}`}
              target={post.frontmatter.externalUrl ? "_blank" : undefined}
              rel={post.frontmatter.externalUrl ? "noreferrer" : undefined}
              className="screen-line-bottom list-row blog-list-row"
            >
              <div className="blog-list-main flex items-start gap-3">
                <NotebookPen className="text-muted-foreground mt-1 size-4 shrink-0" />
                <div className="blog-list-copy">
                  <span className="list-row-title">{post.frontmatter.title}</span>
                  <span className="list-row-meta blog-list-meta">
                    {formatReadMeta(post)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="screen-line-top flex justify-center p-4">
          <Link
            href="/blog"
            className="bg-primary text-primary-foreground inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium"
          >
            All posts
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <div className="stripe-divider" />

      <section id="experience" className="page-section">
        <div className="section-bar screen-line-top screen-line-bottom">
          <h2 className="section-title">Experience</h2>
          <span className="mono-note">
            Full-stack development · 2025 — Present
          </span>
        </div>
        <div className="section-copy">
          I build full-stack applications, secure APIs, and data systems. At
          Nirnaya, I develop role-based platforms for operational workflows; at
          UPSALA DEFSOL, I built modular applications and authenticated APIs.
          My toolkit includes React, Node.js, TypeScript, PostgreSQL, MongoDB,
          and AI-assisted development.
        </div>
        <WorkExperience
          experiences={experiences}
          className="*:screen-line-bottom"
        />
      </section>

      <div className="stripe-divider" />

      <section id="socials" className="page-section">
        <div className="section-bar screen-line-top screen-line-bottom">
          <h2 className="section-title">Socials</h2>
          <span className="mono-note">
            Compact link rows aligned to the same monochrome system.
          </span>
        </div>
        <div className="social-grid">
          {socialLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              target="_blank"
              className="screen-line-bottom social-link"
            >
              <span className="social-label">{item.label}</span>
              <span className="social-handle">{item.handle}</span>
              <ArrowUpRight className="text-muted-foreground ml-auto h-4 w-4" />
            </Link>
          ))}
        </div>
      </section>

    </main>
  );
}

function StackLogo({
  icon,
  className,
}: {
  icon: StackIcon;
  className?: string;
}) {
  if (icon.type === "badge") {
    return (
      <span className={`${className ?? ""} stack-chip-badge`} aria-hidden>
        {icon.label}
      </span>
    );
  }

  if (icon.type === "tabler") {
    const Icon = icon.icon;

    return <Icon className={className} aria-hidden stroke={1.9} />;
  }

  if (icon.type === "lucide") {
    const Icon = icon.icon;

    return <Icon className={className} aria-hidden strokeWidth={1.9} />;
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      role="img"
      aria-hidden="true"
    >
      <path d={icon.icon.path} fill="currentColor" />
    </svg>
  );
}
