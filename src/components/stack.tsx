type StackItem = {
  name: string;
  icon?: React.ReactNode;
};

type StackCategory = {
  label: string;
  items: StackItem[];
};

const stack: StackCategory[] = [
  {
    label: "Language",
    items: [
      { name: "TypeScript" },
      { name: "JavaScript" },
      { name: "Python" },
    ],
  },
  {
    label: "Frontend",
    items: [
      { name: "React" },
      { name: "Next.js" },
      { name: "Tailwind CSS" },
      { name: "shadcn/ui" },
      { name: "Radix UI" },
      { name: "Framer Motion" },
    ],
  },
  {
    label: "Backend & Database",
    items: [
      { name: "Node.js" },
      { name: "FastAPI" },
      { name: "PostgreSQL" },
      { name: "MongoDB" },
      { name: "Redis" },
      { name: "Prisma" },
    ],
  },
  {
    label: "AI & Infra",
    items: [
      { name: "OpenAI" },
      { name: "LangChain" },
      { name: "RAG" },
      { name: "Vector DBs" },
      { name: "Docker" },
      { name: "Vercel" },
    ],
  },
  {
    label: "Workflow",
    items: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "Cursor" },
      { name: "Claude" },
      { name: "ChatGPT" },
      { name: "Linux" },
    ],
  },
  {
    label: "Analytics",
    items: [
      { name: "Google Analytics" },
      { name: "PostHog" },
    ],
  },
];

function StackPill({ item }: { item: StackItem }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#2a2a2a] bg-[#161616] px-3 py-1 text-[13px] text-[#d8d8d8] transition-colors hover:border-[#3a3a3a] hover:bg-[#1a1a1a]">
      {item.icon ?? (
        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#2a2a2a] text-[9px] font-medium text-[#999]">
          {item.name[0]}
        </span>
      )}
      {item.name}
    </span>
  );
}

export function Stack() {
  return (
    <section className="mt-8">
      <h2 className="mb-6 text-[20px] font-medium text-black dark:text-white">
        Stack
      </h2>
      <div className="space-y-0">
        {stack.map((category, i) => (
          <div
            key={category.label}
            className="flex items-start gap-6 border-t border-[#e7e7e7] py-4 dark:border-[#1c1c1c]"
          >
            <span className="shrink-0 pt-0.5 text-[13px] tabular-nums text-[#6e6e6e] dark:text-[#555]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="shrink-0 pt-0.5 text-[13px] text-[#6e6e6e] dark:text-[#7a7a7a]">
              {category.label}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {category.items.map((item) => (
                <StackPill key={item.name} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
