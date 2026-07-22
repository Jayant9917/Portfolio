"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

interface TimelineProps {
  data: TimelineEntry[];
  title?: string;
  description?: string;
  className?: string;
}

export const metadata = {
  title: "About Me",
  description: "A timeline of my professional and educational milestones",
};

export const Timeline = ({
  data,
  title = "My Journey",
  description = "A timeline of my professional and educational milestones",
  className,
}: TimelineProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div
      className={cn("w-full font-sans", className)}
    >
      <div className="mx-auto max-w-[680px] py-2">
        <h4 className="font-normal text-[#6e6e6e] dark:text-[#7a7a7a]">{title}</h4>
        <p className="pt-2 text-[#4a4a4a] dark:text-[#b0b0b0]">{description}</p>
      </div>

      <div className="mx-auto mt-8 max-w-[680px] border-t border-[#e7e7e7] dark:border-[#1c1c1c]">
        {data.map((item, index) => (
          <div
            key={index}
            className="timeline-item group grid gap-4 border-b border-[#e7e7e7] py-5 last:border-b-0 dark:border-[#1c1c1c] md:grid-cols-[120px_1fr]"
          >
            <div className="flex items-start gap-3 md:block">
              <div
                className={cn(
                  "mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border",
                  activeIndex === index
                    ? "border-black bg-black dark:border-white dark:bg-white"
                    : "border-[#d6d6d6] bg-white dark:border-[#242424] dark:bg-[#0d0d0d]"
                )}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
              >
                {activeIndex === index && (
                  <Check className="h-3 w-3 text-white dark:text-black" />
                )}
              </div>
              <h3 className="font-normal text-[#6e6e6e] dark:text-[#7a7a7a] md:mt-1">
                {item.title}
              </h3>
            </div>

            <div>{item.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
