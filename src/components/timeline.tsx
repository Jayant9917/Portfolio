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
      year: "2025 - Present",
      title: "Full Stack Developer",
      company: "Nirnaya",
      description: "Building secure internal platforms that digitize operational workflows, with role-based dashboards, REST APIs, and optimized database schemas.",
      date: "Oct 2025 - Present",
      location: "New Delhi",
      type: 'work'
    },
    {
      id: 2,
      year: "2025",
      title: "Full Stack Developer",
      company: "UPSALA DEFSOL",
      description: "Built modular full-stack applications, designed authenticated REST APIs, and improved reliability through production debugging and error handling.",
      date: "Aug 2025 - Oct 2025",
      location: "Indore, MP",
      type: 'work'
    },
    {
      id: 3,
      year: "2021 - 2025",
      title: "B.Tech in Information Technology",
      company: "College of Engineering Roorkee",
      description: "Bachelor of Technology in Information Technology.",
      date: "2021 - 2025",
      location: "Roorkee, India",
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
