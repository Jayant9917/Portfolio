import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page-shell min-h-[90vh] px-4 sm:px-6">
      <section className="page-section min-h-[90vh] justify-center py-0">
        <div className="grid gap-8 py-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-start md:gap-16 md:py-12 lg:py-16">
          <div className="flex flex-col gap-5">
            <p className="page-header-eyebrow">Missing</p>
            <h1 className="font-display text-[clamp(3.5rem,18vw,7.25rem)] leading-[0.9] font-semibold tracking-[-0.06em] text-foreground">
              404.
            </h1>
          </div>

          <div className="flex max-w-xl flex-col gap-5 pt-2 md:pt-6">
            <p className="max-w-lg text-[clamp(0.95rem,4vw,1.15rem)] leading-[1.7] text-muted-foreground">
              The page you&apos;re looking for doesn&apos;t exist or has moved.
            </p>
            <p className="max-w-lg text-[0.92rem] leading-6 text-muted-foreground/80">
              Use the button below to return to the homepage and keep exploring
              the site.
            </p>
            <div className="pt-2">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                Back home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
