import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects, projectSlugs } from "@/data/projects";

export function WorkGrid() {
  return (
    <div className="mt-7 grid gap-4 sm:grid-cols-2">
      {projectSlugs.map((slug) => {
        const p = projects[slug];
        return (
          <Link
            key={slug}
            href={`/work/${slug}`}
            className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 transition-colors hover:bg-hover"
          >
            <div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs uppercase tracking-[0.18em] text-faint">
                  {p.category}
                </span>
                <ArrowUpRight className="h-4 w-4 text-faint transition-colors group-hover:text-foreground" />
              </div>
              <h3 className="mt-3 text-xl font-bold tracking-[-0.02em] text-foreground">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                {p.tagline}
              </p>
            </div>
            <span className="mt-5 text-xs text-faint">{p.year}</span>
          </Link>
        );
      })}
    </div>
  );
}
