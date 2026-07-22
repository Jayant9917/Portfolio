"use client";

import { Timeline } from "@/components/ui/timeline-component";

type TimelineItem = {
  id: number;
  year: string;
  title: string;
  company: string;
  description: string;
  date: string;
  location: string;
  type: 'work' | 'education';
};

export default function TimelinePage() {
  const timelineItems: TimelineItem[] = [
    {
      id: 1,
      year: "2026",
      title: "Full Stack Developer",
      company: "Nirnaya",
      description: "Built secure internal web platforms and production dashboards for operational workflows.",
      date: "Oct 2025 - Present",
      location: "New Delhi",
      type: 'work'
    },
    {
      id: 2,
      year: "2025",
      title: "MERN Stack Developer",
      company: "UPSALA DEFSOL",
      description: "Built modular client-facing applications and worked across UI, APIs, and deployment flows.",
      date: "Aug 2025 - Oct 2025",
      location: "Indore, MP",
      type: 'work'
    },
    {
      id: 3,
      year: "2024",
      title: "Full Stack Developer",
      company: "UPSALA DEFSOL",
      description: "Shipped e-commerce and product features with a focus on performance, UX, and delivery.",
      date: "Oct 2024 - Mar 2025",
      location: "Remote",
      type: 'work'
    },
    {
      id: 4,
      year: "2020 - 2024",
      title: "B.Tech in Information Technology",
      company: "University Institute of Technology, RGPV Bhopal",
      description: "Built the foundations in data structures, algorithms, web development, and databases.",
      date: "2020 - 2024",
      location: "Bhopal, MP",
      type: 'education',
    },
    {
      id: 5,
      year: "2018 - 2020",
      title: "Higher Secondary (12th)",
      company: "Scholars Public Higher Secondary School - MP Board",
      description: "Science stream with Physics, Chemistry, and Mathematics.",
      date: "2018 - 2020",
      location: "Indore, MP",
      type: 'education',
    },
    {
      id: 6,
      year: "2017 - 2018",
      title: "High School (10th)",
      company: "Rani Laxmi Bai Public Academy High School - MP Board",
      description: "Built the base for everything that came later.",
      date: "2017 - 2018",
      location: "Indore, MP",
      type: 'education',
    }
  ];

  const timelineData = timelineItems.map(item => ({
    title: item.year,
    content: (
      <div className="space-y-2">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h4 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">{item.title}</h4>
          <span className="text-sm text-neutral-500 dark:text-neutral-400">{item.company}</span>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-neutral-500 dark:text-neutral-400">
          <span>{item.date}</span>
          <span>{item.location}</span>
        </div>
        <p className="max-w-2xl text-sm leading-7 text-neutral-600 dark:text-neutral-400">
          {item.description}
        </p>
        {item.type === 'education' && item.year === "2020 - 2024" ? (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">7.15 CGPA</p>
        ) : null}
        {item.type === 'education' && item.year === "2018 - 2020" ? (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">80%</p>
        ) : null}
        {item.type === 'education' && item.year === "2017 - 2018" ? (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">91.4%</p>
        ) : null}
      </div>
    )
  }));

  return (
    <div className="min-h-screen">
      <Timeline 
        data={timelineData}
        title="My Journey"
        description="A short view of the jobs and milestones that shaped my current focus."
      />
    </div>
  );
}
