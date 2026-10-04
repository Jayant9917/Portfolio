import { Project, Technology } from "@/types/project";

const tech = (name: string, category: Technology["category"] = "other"): Technology => ({ name, category });

export const projects: Project[] = [
  {
    title: "DocEngine",
    description: "A distributed document-processing platform that turns header-based CSV uploads into PDFs through asynchronous jobs, with tenant isolation, object storage, and live operational monitoring.",
    src: "/images/projects/docengine.png",
    link: "https://docengine1.vercel.app/",
    githubUrl: "https://github.com/Jayant9917/DocEngine",
    deployment: {
      platform: "Production deployment",
      url: "https://docengine1.vercel.app/",
      details: [
        "Frontend: Vercel — docengine1.vercel.app",
        "Spring Boot API and CSV-to-PDF worker: AWS EC2 with Docker Compose",
        "RabbitMQ, Prometheus, and Grafana: AWS EC2 with Docker Compose",
        "PostgreSQL: Supabase",
        "Uploaded CSV files and generated PDFs: Amazon S3",
      ],
    },
    technologies: [tech("React", "frontend"), tech("Spring Boot", "backend"), tech("RabbitMQ", "devops"), tech("PostgreSQL", "database"), tech("AWS S3", "devops"), tech("Docker Compose", "devops"), tech("Prometheus", "devops"), tech("Grafana", "devops")],
    overview: "DocEngine accepts authenticated CSV uploads, stores source files in object storage, records tenant and job metadata in PostgreSQL, and hands work to RabbitMQ for asynchronous CSV-to-PDF processing. Clients can track job status and receive short-lived download links when results are ready. The deployed system includes a React frontend, Spring Boot API and worker, Supabase PostgreSQL, Amazon S3, and Prometheus/Grafana monitoring.",
    features: ["Header-based CSV uploads with flexible columns", "Asynchronous job processing through RabbitMQ", "Tenant API-key authentication and isolated job reads", "Idempotent submissions and atomic worker job claiming", "Lease and heartbeat recovery for processing jobs", "PDF result storage with short-lived download URLs", "Prometheus metrics and Grafana dashboards"],
    process: ["Designing API, queue, worker, database, and storage boundaries", "Implementing tenant-authenticated upload and job endpoints", "Building asynchronous CSV-to-PDF processing", "Adding idempotency, atomic claiming, and worker recovery", "Deploying the frontend and backend services with monitoring", "Smoke-testing the upload-to-download flow in production"],
    date: "2026-01-15",
  },
  {
    title: "Rabbit",
    description: "A full-stack e-commerce platform built with React, Node.js, Express, and MongoDB, featuring a modern shopping experience, admin management, secure authentication, PayPal integration, and automated email notifications.",
    src: "/images/projects/rabbit.png",
    link: "https://e-comm-rabbit.vercel.app/",
    githubUrl: "https://github.com/Jayant9917/E-comm",
    technologies: [tech("React", "frontend"), tech("Vite", "frontend"), tech("Tailwind CSS", "frontend"), tech("Node.js", "backend"), tech("Express.js", "backend"), tech("MongoDB", "database"), tech("Mongoose", "database"), tech("JWT", "backend"), tech("PayPal"), tech("Nodemailer")],
    overview: "Rabbit is a clothing-focused e-commerce application with product discovery, filtering, search, cart persistence and merging, admin operations, order and inventory management, role-based access, and branded email automation.",
    features: ["Responsive product catalog and detailed product pages", "Filtering by gender, category, and price", "Real-time product search", "Persistent guest and user shopping carts", "Admin product, user, order, and inventory management", "JWT authentication with role-based access", "PayPal integration and automated Brevo email notifications"],
    process: ["Designing the shopping and admin workflows", "Building the React storefront", "Implementing Express APIs and MongoDB models", "Adding authentication, payments, and email automation", "Testing and deploying the full-stack application"],
    date: "2026-02-15",
  },
  {
    title: "Shivay Finance and Services",
    description: "A high-performance, SEO-optimized financial services website for home loans, loan against property, balance transfers, top-up loans, mortgage loans, and banking partnerships.",
    src: "/images/projects/shivay-finance.png",
    link: "https://www.shivayfinanceandservices.com/",
    githubUrl: "https://github.com/Jayant9917/Financial-App",
    technologies: [tech("Next.js", "frontend"), tech("TypeScript", "frontend"), tech("Tailwind CSS", "frontend"), tech("shadcn/ui", "frontend"), tech("Framer Motion", "frontend"), tech("React Hook Form", "frontend"), tech("SEO")],
    overview: "A responsive financial services platform focused on conversion, local SEO, performance, and a clear presentation of home loan and related financial solutions across Indore, Burhanpur, and Khandwa.",
    features: ["100/100 Lighthouse performance, SEO, accessibility, and best-practices target", "Home loan, LAP, balance transfer, top-up, and mortgage services", "Responsive mobile-first design", "Animated UI with shadcn/ui and Framer Motion", "Dynamic metadata, sitemap, structured data, and SEO routes", "Bank partner showcase and contact conversion flows"],
    process: ["Understanding financial service and local SEO requirements", "Designing the conversion-focused landing experience", "Implementing services, bank partners, contact, and SEO routes", "Optimizing images, performance, and responsive behavior", "Preparing the site for production deployment"],
    date: "2026-03-15",
  },
  {
    title: "Coursify",
    description: "A role-based online learning platform that brings together course discovery, student learning tools, instructor publishing workflows, and admin platform oversight.",
    src: "/images/projects/coursify.png",
    link: "https://coursify-frontend-f90i.onrender.com/",
    githubUrl: "https://github.com/Jayant9917/coursify",
    technologies: [tech("React", "frontend"), tech("Node.js", "backend"), tech("Express.js", "backend"), tech("MongoDB", "database"), tech("Cloudinary", "devops"), tech("JWT", "backend"), tech("Role-Based Access")],
    overview: "Coursify is a structured learning platform for students, instructors, and admins, with the long-term goal of becoming a complete course marketplace and learning management system.",
    features: ["Public course marketplace and discovery", "Student enrollment, progress, wishlist, reviews, and orders", "Instructor course creation, lessons, publishing, and statistics", "Admin moderation for users, courses, categories, coupons, and orders", "Persistent refresh-token sessions and role-based access", "Cloudinary-backed uploads and secure profile media management", "Password recovery, checkout coupons, and enrollment workflows"],
    process: ["Defining role-aware learning and commerce workflows", "Designing backend business rules and account boundaries", "Building student, instructor, and admin dashboards", "Implementing uploads, authentication, checkout, and enrollment", "Preparing the LMS for production-ready phased development"],
    date: "2026-04-15",
  },
];

export const enhancedProjects = projects.map((project) => ({
  ...project,
  slug: project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
}));
