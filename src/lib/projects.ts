import { Project, Technology } from "@/types/project";
import { projects as projectData } from "@/constants/projects";

// Helper function to clean GitHub image URLs
const cleanImageUrl = (url: string): string => {
  // Remove token from URL if present
  return url.split('?')[0];
};

// Default technologies for projects
const defaultTechnologies: Technology[] = [
  { name: "Next.js", icon: "nextjs", category: "frontend" },
  { name: "TypeScript", icon: "typescript", category: "frontend" },
  { name: "Tailwind CSS", icon: "tailwind", category: "frontend" },
  { name: "Node.js", icon: "nodejs", category: "backend" },
  { name: "MongoDB", icon: "mongodb", category: "database" },
  { name: "Vercel", icon: "vercel", category: "devops" },
  { name: "Figma", icon: "figma", category: "design" },
  { name: "GitHub", icon: "github", category: "devops" },
];

// Add slug and additional fields to projects
const projects: Project[] = projectData.map((project) => {
  const cleanSrc = cleanImageUrl(project.src);
  
  return {
    ...project,
    src: cleanSrc, // Use cleaned URL
    slug: project.title.toLowerCase().replace(/\s+/g, '-'),
    // Only use default technologies if project doesn't have its own technologies
    technologies: project.technologies?.length ? project.technologies : defaultTechnologies,
    overview: project.overview || project.description + " This project was built to showcase my skills in modern web development.",
    process: project.process || [
      "Planning and requirements gathering",
      "UI/UX design implementation",
      "Frontend development",
      "Testing and deployment"
    ],
    date: project.date || "2023-01-01"
  };
});

export function getAllProjects(): Project[] {
  return projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
