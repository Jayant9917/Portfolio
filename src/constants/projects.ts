import { Project, Technology } from "@/types/project";

const tech = (name: string, category: Technology["category"] = "other"): Technology => ({ name, category });

export const projects: Project[] = [
  {
    title: "NOVO",
    description: "A privacy-first personal AI operating system designed to give users control over their data, memory, tools, and automation.",
    src: "https://res.cloudinary.com/dl7zgwx4o/image/upload/v1750500530/Aman-Portfolio/yman8aa31r6dirfvnlww.png",
    link: "https://github.com/Jayant9917",
    githubUrl: "https://github.com/Jayant9917",
    technologies: [tech("Python", "backend"), tech("FastAPI", "backend"), tech("PostgreSQL", "database"), tech("Redis", "database"), tech("Docker", "devops"), tech("AI Systems")],
    overview: "A privacy-first personal AI operating system designed to give users control over their data, memory, tools, and automation.",
    features: ["Privacy-first data control", "Persistent memory and automation", "Tool orchestration", "Secure application architecture"],
    process: ["Understanding requirements and planning", "Designing the system architecture", "Implementing core features", "Testing and debugging", "Deployment and maintenance"],
    date: "2026-01-15",
  },
  {
    title: "NormaDB",
    description: "A PostgreSQL schema analyzer that detects database normalization issues through deterministic static analysis.",
    src: "https://res.cloudinary.com/dl7zgwx4o/image/upload/v1750500535/Aman-Portfolio/vwjvmduoxecchdui9m3j.png",
    link: "https://github.com/Jayant9917",
    githubUrl: "https://github.com/Jayant9917",
    technologies: [tech("TypeScript", "frontend"), tech("Node.js", "backend"), tech("PostgreSQL", "database"), tech("React", "frontend"), tech("AST Parsing"), tech("Database Design", "database")],
    overview: "A deterministic static analysis tool for understanding and improving PostgreSQL schema normalization.",
    features: ["Schema inspection", "Normalization issue detection", "Deterministic analysis", "Database design guidance"],
    process: ["Defining normalization rules", "Parsing database schemas", "Building analysis workflows", "Testing edge cases", "Documenting findings"],
    date: "2026-02-15",
  },
  {
    title: "Enterprise Ticket Management System",
    description: "A production-grade enterprise web application for managing workflows, tickets, users, and operational processes.",
    src: "https://res.cloudinary.com/dl7zgwx4o/image/upload/v1750500535/Aman-Portfolio/d3s3j3dkfoflv3c7jjoe.png",
    link: "https://github.com/Jayant9917",
    githubUrl: "https://github.com/Jayant9917",
    technologies: [tech("React", "frontend"), tech("TypeScript", "frontend"), tech("Node.js", "backend"), tech("PostgreSQL", "database"), tech("REST APIs"), tech("IIS", "devops"), tech("Security")],
    overview: "A production-grade enterprise application for managing workflows, tickets, users, and operational processes.",
    features: ["Ticket and workflow management", "User and role management", "REST API integration", "Production deployment and security"],
    process: ["Understanding operational workflows", "Designing the data model", "Implementing frontend and APIs", "Security testing", "Production deployment"],
    date: "2025-12-15",
  },
  {
    title: "Personal Developer Portfolio",
    description: "A personal portfolio designed to showcase my engineering experience, technical projects, writing, and continuous learning.",
    src: "https://res.cloudinary.com/dl7zgwx4o/image/upload/v1750500526/Aman-Portfolio/d7pcw8dxrt3x9mnbjqnk.png",
    link: "https://github.com/Jayant9917",
    githubUrl: "https://github.com/Jayant9917",
    technologies: [tech("React", "frontend"), tech("TypeScript", "frontend"), tech("Tailwind CSS", "frontend"), tech("Web Development", "frontend")],
    overview: "A personal portfolio designed to showcase engineering experience, technical projects, writing, and continuous learning.",
    features: ["Responsive portfolio experience", "Project and experience sections", "Technical writing archive", "Dark theme and motion details"],
    process: ["Organizing content", "Preserving the visual system", "Implementing responsive sections", "Testing interactions", "Continuous content updates"],
    date: "2026-03-15",
  },
];

export const enhancedProjects = projects.map((project) => ({
  ...project,
  slug: project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
}));