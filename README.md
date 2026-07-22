# Jay Rana — Portfolio

A production-oriented personal portfolio for Jay Rana, a Full Stack Developer and Backend-Focused Engineer based in New Delhi, India.

The site presents engineering experience, technical projects, development practices, and external technical writing through a responsive dark interface. It is designed as a content-driven Next.js application rather than a static landing page: project data, experience, metadata, and MDX content are maintained in source-controlled modules.

## Features

- Responsive dark-theme portfolio with motion and interaction details
- Profile, stack, experience, projects, blog, socials, and contact sections
- Project grid and list views with local project imagery
- Dedicated project detail routes
- MDX-powered writing archive with support for external article links
- GitHub profile and contribution activity integration
- SEO metadata, Open Graph image generation, robots.txt, and sitemap generation
- Accessible desktop navigation, mobile dock, command menu, and theme switching
- Reusable UI primitives built with Radix UI, shadcn-style patterns, and Tailwind CSS

## Featured Projects

- [NOVO](https://github.com/Jayant9917/qaz) — Owner-controlled Personal AI Operating System with a backend-authoritative Control Center and desktop assistant direction.
- [Rabbit](https://github.com/Jayant9917/E-comm) — Full-stack e-commerce platform with catalog, cart, admin, authentication, payments, and email workflows.
- [Shivay Finance and Services](https://github.com/Jayant9917/Financial-App) — SEO-focused financial services website for home loans and related finance solutions. [Live website](https://www.shivayfinanceandservices.com/)
- [Coursify](https://github.com/Jayant9917/coursify) — Role-based learning platform for students, instructors, and administrators.

## Technology Stack

- Framework: Next.js 15, React 19, TypeScript
- Styling: Tailwind CSS, CSS variables, custom responsive styles
- Content: MDX, gray-matter, next-mdx-remote
- UI: Radix UI, shadcn-style components, Lucide React, Tabler Icons
- Motion: Motion and CSS transitions
- Data and integrations: GitHub REST API and GitHub contribution API
- Tooling: ESLint, Prettier, Jest, TypeScript

## Project Structure

```text
src/
├── app/                 Next.js routes, metadata, APIs, and global styles
├── components/          Shared UI, navigation, project, profile, and content components
├── constants/           Project and portfolio data
├── content/posts/       MDX articles and frontmatter
├── lib/                 GitHub, MDX, project, and utility helpers
└── types/               Shared TypeScript types

public/
├── images/projects/     Project screenshots and presentation assets
└── ...                  Favicon, avatar, and static assets
```

## Local Development

### Requirements

- Node.js 20 or newer
- npm

### Setup

```bash
git clone https://github.com/Jayant9917/Portfolio.git
cd Portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser.

### Available Commands

```bash
npm run dev       # Start the development server
npm run build     # Create a production build
npm run start     # Start the production server
npm run lint      # Run Next.js linting
```

## Configuration

Set `NEXT_PUBLIC_SITE_URL` in `.env.local` when deploying behind a custom domain. The application uses GitHub APIs for profile and contribution data. The contribution endpoint can be overridden with `GITHUB_CONTRIBUTIONS_API_URL`.


Do not commit `.env.local`, credentials, access tokens, or private user data.

## Updating Content

- Profile, stack, experience, and social links: `src/app/page.tsx`
- Project entries: `src/constants/projects.ts`
- Project images: `public/images/projects/`
- Blog posts: `src/content/posts/`
- Site-wide metadata: `src/app/layout.tsx`
- Shared visual system: `src/app/globals.css`

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

- GitHub: [Jayant9917](https://github.com/Jayant9917)
- LinkedIn: [Jayant Pratap Singh](https://www.linkedin.com/in/jayant-pratap-singh/)
- Medium: [@ranajayant527](https://medium.com/@ranajayant527)