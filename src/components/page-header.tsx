import { cn } from "@/lib/utils";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description: string;
  meta?: string;
  className?: string;
};

export function PageHeader({
  eyebrow,
  title,
  description,
  meta,
  className,
}: PageHeaderProps) {
  return (
    <header className={cn("page-header screen-line-bottom", className)}>
      <div>
        {eyebrow ? <p className="page-header-eyebrow">{eyebrow}</p> : null}
        <h1 className="page-header-title">{title}</h1>
      </div>
      <div className="page-header-copy">
        <p>{description}</p>
        {meta ? <span>{meta}</span> : null}
      </div>
    </header>
  );
}
